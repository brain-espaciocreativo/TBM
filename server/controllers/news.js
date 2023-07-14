const { News, Progress, Categories, Works } = require('../models/index')
const {
    destroyWithNewId,
    createWithNewsId,
} = require('../controllers/progress')
const BusinessError = require('../utils/BusinessError')

const getAll = async (req, res, next) => {
    try {
        const data = await News.findAll({
            include: [
                {
                    model: Progress,
                    include: {
                        model: Categories,
                    },
                },
                {
                    model: Works,
                },
            ],
        })

        res.status(201).send({ status: 'OK', data })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    const { id } = req.params
    try {
        const data = await News.findByPk(id)

        res.status(201).send({ data })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    const { file } = req
    const { name, description, workId, progresses } = req.body
    const procesos = JSON.parse(progresses)

    try {
        if (!name || !description || !workId)
            throw new BusinessError('Datos obligatorios', 401)

        const video = file ? `videos?video=${file.filename}` : undefined

        const data = await News.create({
            name,
            description,
            video,
            workId,
        })

        if (progresses && progresses.length > 0) {
            let createdProgress = await Promise.all(
                procesos.map((progress) =>
                    createWithNewsId(progress, workId, data.dataValues.id)
                )
            )

            data.progresses = createdProgress
            res.status(201).send({ status: 'OK', data: data })
        } else {
            res.status(201).send({ status: 'OK', data: data })
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const update = async (req, res, next) => {
    const { id } = req.params
    const { name, description } = req.body
    if (!name || (!description && id))
        throw new BusinessError('Datos obligatorios', 402)

    try {
        const data = await News.update(
            {
                name,
                description,
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

const destroy = async (req, res, next) => {
    const { id } = req.params
    try {
        if (!id) throw new BusinessError('Seleccione un ID', 401)
        const NewsData = await News.findOne({ where: { id: id } })
        if (NewsData) {
            await destroyWithNewId(id)
            await News.destroy({ where: { id: id } })
        }

        const NewsList = await News.findAll({
            include: {
                model: Progress,
            },
        })
        res.status(200).send({ status: 200, data: NewsList })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    destroy,
}
