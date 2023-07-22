const { Users, Works, News, Progress, Categories } = require('../models')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const hash = require('object-hash')
const BusinessError = require('../utils/BusinessError')

const getAllUser = async (req, res, next) => {
    try {
        const data = await Users.findAll({
            attributes: [
                'id',
                'name',
                'email',
                'surname',
                'phone',
                'role',
                'password',
            ],
        })
        res.status(201).send({ status: 'OK', data: data })
    } catch (error) {
        // console.log(error);
        next(error)
    }
}
const getOneUser = async (req, res, next) => {
    const { id } = req.params
    try {
        if (!id) {
            throw new BusinessError('Datos obligatorios', 401)
        }
        const data = await Users.findByPk(id)

        if (!data || data == null) {
            throw new BusinessError('Usuario no encontrado!', 404)
        }

        res.status(201).send({ data: data })
    } catch (e) {
        next(e)
    }
}
const createOneUser = async (req, res, next) => {
    try {
        const { name, surname, email, password, phone, role } = req.body
        const hashPass = hash.MD5(password)
        if (!name || !surname || !email || !password || !role || !phone)
            throw new BusinessError('Datos obligatorios', 401)

        const users = await Users.findAll({ where: { email: email } })

        if (users && users.length > 0) {
            throw new BusinessError('Email ya ocupado en otro usuario', 402)
        }

        const data = await Users.create(
            {
                name: name,
                surname: surname,
                email: email,
                password: hashPass,
                phone: phone,
                role: role,
            },
            {
                include: Works,
            }
        )
        res.status(201).send({ status: 'OK', data: data })
    } catch (error) {
        next(error)
    }
}

const updateOneUser = async (req, res, next) => {
    const { id } = req.params
    const { name, surname, role, phone, password } = req.body
    try {
        if (!name || !surname || !role || !phone)
            throw new BusinessError('Datos obligatorios', 402)

        const data = await Users.update(
            {
                name: name,
                surname: surname,
                //email: email,
                phone: phone,
                password: password,
                role: role,
            },
            {
                where: {
                    id: id,
                },
            }
        )
        res.status(201).send({ status: 'OK', data })
    } catch (error) {
        next(error)
    }
}
const deleteOneUser = async (req, res, error) => {
    const { id } = req.params
    try {
        const data = await Users.findOne({ where: { id: id } })
        await Users.destroy({ where: { id: id } })
        res.status(200).send({ status: 200, data: data })
    } catch (error) {
        next(error)
    }
}
const forgotPass = async (req, res, next) => {
    if (req.body.email === '') {
        res.status(400).send({ message: 'el email es requerido' })
    }
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email,
            },
        })
        if (!user) {
            throw new BusinessError('No existe ese email', 403)
        }

        const token = jwt.sign({ id: user.id }, 'ejemplodeprueba', {
            expiresIn: '5h',
        })
        const setusertoken = await user.update({
            token,
        })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'brayann.fave@gmail.com',
                pass: 'whpzxxvkzejrdicb',
            },
        })
        const link = `http://localhost:5174/reset/?${token}`
        if (setusertoken) {
            const mailOptions = {
                from: 'brayann.fave@gmail.com',
                to: `${user.email}`,
                subject: 'enlace para recuperar su cuenta',
                html: `<p> solicitaste un link para el cambio de contraseña, si fue asi  hacé click Para cambiar la contraseña: <a target="_" href="${link}">cambiar contraseña</a> <br>de lo contrario desestima este correo</p>`,
            }

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    throw err
                } else {
                    res.status(201).json(
                        'el email para la recuperacion ha sido enviado'
                    )
                }
            })
        }
    } catch (error) {
        next(error)
    }
}
const reset = async (req, res, next) => {
    const { token } = req.params

    try {
        const validuser = await Users.findOne({
            token,
        })
        const verifytoken = jwt.verify(token, 'ejemplodeprueba')

        if (validuser && verifytoken.id) {
            res.status(201).json({ status: 201, message: 'link valido' })
            res.send('varificado')
        } else {
            res.status(403).json({ status: 401, message: 'Usuarion no valido' })
        }
    } catch (error) {
        next(error)
    }
}
const updatePassForToken = async (req, res, next) => {
    const { token } = req.params

    if (req.body.password === '') {
        throw new BusinessError('Contrasena incorrect', 403)
    }
    try {
        const pass = req.body.password
        const verifytoken = jwt.verify(token, 'ejemplodeprueba')
        const validuser = await Users.findOne({
            where: {
                id: verifytoken.id,
            },
        })
        if (validuser && validuser.id) {
            const newpassword = hash.MD5(pass)
            const resetPassword = await Users.update(
                { password: newpassword },
                {
                    where: {
                        id: validuser.id,
                    },
                }
            )
            res.status(201).send({
                status: 201,
                message: 'se cambio la contraseña exitosamente',
            })
        }
    } catch (error) {
        next(error)
    }
}

const updatePass = async (req, res, next) => {
    const { email, pass } = req.body

    if (pass === '') {
        throw new BusinessError('Contrasena incorrect', 403)
    }
    try {
        //const pass = req.body.password
        // const verifytoken = jwt.verify(token, 'ejemplodeprueba')
        const validuser = await Users.findOne({
            where: {
                email: email,
            },
        })
        if (validuser && validuser.id) {
            const newpassword = hash.MD5(pass)
            await Users.update(
                { password: newpassword },
                {
                    where: {
                        email: email,
                    },
                }
            )
            res.status(201).send({
                status: 201,
                message: 'se cambio la contraseña exitosamente',
            })
        }
    } catch (error) {
        next(error)
    }
}

const createDataBase = async (req, res) => {
    const dbUser = [
        {
            name: 'juan',
            surname: 'carlos',
            email: 'stuverona@gmail.com',
            password: '4f1ff3fa42c8182ddfb792e8d48e498d',
            role: 'admin',
            phone: '123456789',
        },
        {
            name: 'brian',
            surname: 'perez',
            email: 'brian@gmail.com',
            password: '4f1ff3fa42c8182ddfb792e8d48e498d',
            role: 'admin',
            phone: '123456789',
        },
        {
            name: 'jose',
            surname: 'benavidez',
            email: 'jose@gmail.com',
            password: '4f1ff3fa42c8182ddfb792e8d48e498d',
            role: 'admin',
            phone: '123456789',
        },
        {
            name: 'luis',
            surname: 'benavidez',
            email: 'luis@gmail.com',
            password: '4f1ff3fa42c8182ddfb792e8d48e498d',
            role: 'admin',
            phone: '123456789',
        },
    ]
    const dbWorks = [
        {
            name: 'Obra numero 1',
            description: 'descripcion de la obra',
            userId: 1,
        },
        {
            name: 'Obra numero 2',
            description: 'descripcion de la obra',
            userId: 2,
        },
        {
            name: 'Obra numero 3',
            description: 'descripcion de la obra',
            userId: 3,
        },
    ]
    const dbNews = [
        {
            name: 'novedadad 1',
            date: '12-12-2012',
            description: 'descripcion del video',
            video: '',
            workId: 1,
        },
        {
            name: 'novedadad 2',
            date: '12-12-2012',
            description: 'descripcion del video',
            video: '',
            workId: 1,
        },
        {
            name: 'novedadad 3',
            date: '12-12-2012',
            description: 'descripcion del video',
            video: '',
            workId: 2,
        },
        {
            name: 'novedadad 4',
            date: '12-12-2012',
            description: 'descripcion del video',
            video: '',
            workId: 2,
        },
        {
            name: 'novedadad 5',
            date: '12-12-2012',
            description: 'descripcion del video',
            video: '',
            workId: 3,
        },
        {
            name: 'novedadad 6',
            date: '12-12-2012',
            description: 'descripcion del video',
            video: '',
            workId: 3,
        },
    ]
    const dbProgress = [
        {
            value: 50,
            height_value: 70,
            newsId: 1,
            work_progress: 1,
            newsId: 1,
            categoryId: 1,
        },
        {
            value: 20,
            height_value: 30,
            newsId: 1,
            work_progress: 1,
            newsId: 1,
            categoryId: 2,
        },
        {
            value: 40,
            height_value: 40,
            newsId: 2,
            work_progress: 1,
            newsId: 1,
            categoryId: 3,
        },
        {
            value: 70,
            height_value: 70,
            newsId: 2,
            work_progress: 1,
            newsId: 1,
            categoryId: 4,
        },
        {
            value: 80,
            height_value: 100,
            newsId: 3,
            work_progress: 2,
            newsId: 2,
            categoryId: 5,
        },
        {
            value: 90,
            height_value: 60,
            newsId: 3,
            work_progress: 2,
            newsId: 2,
            categoryId: 6,
        },
        {
            value: 50,
            height_value: 80,
            newsId: 4,
            work_progress: 2,
            newsId: 2,
            categoryId: 7,
        },
        {
            value: 20,
            height_value: 60,
            newsId: 4,
            work_progress: 2,
            newsId: 2,
            categoryId: 8,
        },
        {
            value: 40,
            height_value: 70,
            newsId: 5,
            work_progress: 3,
            newsId: 3,
            categoryId: 9,
        },
        {
            value: 70,
            height_value: 10,
            newsId: 5,
            work_progress: 3,
            newsId: 3,
            categoryId: 10,
        },
        {
            value: 80,
            height_value: 70,
            newsId: 6,
            work_progress: 3,
            newsId: 3,
            categoryId: 11,
        },
        {
            value: 90,
            height_value: 20,
            newsId: 6,
            work_progress: 3,
            newsId: 3,
            categoryId: 12,
        },
    ]
    const dbCategories = [
        { name: 'categoria 1' },
        { name: 'categoria 2' },
        { name: 'categoria 3' },
        { name: 'categoria 4' },
        { name: 'categoria 5' },
        { name: 'categoria 6' },
        { name: 'categoria 7' },
        { name: 'categoria 8' },
        { name: 'categoria 9' },
        { name: 'categoria 10' },
        { name: 'categoria 11' },
        { name: 'categoria 12' },
    ]

    try {
        await Users.bulkCreate(dbUser)
        await Works.bulkCreate(dbWorks)
        await News.bulkCreate(dbNews)
        await Categories.bulkCreate(dbCategories)
        await Progress.bulkCreate(dbProgress)

        res.send('Base de datos creada')
    } catch (error) {
        next(error)
    }
}

const getUserData = async (req, res) => {
    const { email } = req.body

    try {
        if (!email) {
            throw new BusinessError('Es necesario el email', 401)
        }
        const user = await Users.findOne({
            where: {
                email: email,
            },
            include: {
                model: Works,
                include: [
                    {
                        model: News,
                    },
                    {
                        model: Progress,
                        include: {
                            model: Categories,
                        },
                    },
                ],
            },
        })

        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {
    getAllUser,
    getOneUser,
    createOneUser,
    updateOneUser,
    deleteOneUser,
    forgotPass,
    updatePass,
    reset,
    createDataBase,
    getUserData,
}
