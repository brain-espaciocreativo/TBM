const {Users, Works, News, Progress, Categories} = require('../models');
const nodemailer =  require('nodemailer');
const jwt = require('jsonwebtoken');
const hash = require('object-hash');
const Work = require('../models/Work');
const axios = require('axios');

const getAllUser = async(req, res)=>{
    try {

        const data = await Users.findAll({
            include: {
              model: Works,
              include: {
                model: News
              }
            }
          });
        res.status(201).send({status: "OK", data: data});
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data: "No hay ningun usuarios"}));
    }
}
const getOneUser = async(req, res)=>{
    const { id } = req.params;
    try {
        const data = await Users.findByPk(id);
        res.status(201).send({data: data });
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data: "No se encontró usuario con ese ID"}));
    }
}
const createOneUser = async (req, res) => {
    try {
        const {name, surname, email,password ,phone, role} = req.body; 
        const hashPass = hash.MD5(password);
        if(!name || !surname || !email || !password || !role || !phone) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const data = await Users.create({
            name:name,
            surname:surname,
            email:email,
            password: hashPass,
            phone:phone,
            role:role
        });
        res.status(201).send({status: "OK", data: data });
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data:"No se creo usuario, verifique los datos"}));
    }
}
const updateOneUser =  async(req, res)=>{
    const { id } = req.params;
    const {name, surname, role, phone, email, password} = req.body;
    try {
        if(!name || !surname || !email || !password || !role || !phone) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const data = await Users.update({
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            password: password,
            role: role
        }, {
        where: {
            id: id
        }});
        res.status(201).send({status: "OK", data });
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data: "No se puede actualizar usuario, revisar datos"}));
    }
}
const deleteOneUser = async(req, res)=>{
    const { id } = req.params;
    try {
        await Users.destroy({ where: { id: id }});
        res.status(204).send("Se elimino correctamente");
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data: "No se eliminó correctamente"}));
    }
}
 const forgotPass = async(req, res) =>{
     if(req.body.email === ""){
         res.status(400).send({message:"el email es requerido"})
     }
     try {
         const user = await Users.findOne({
             where:{
                 email: req.body.email
             }
         })
         if(!user){
             return res.status(403).send({message:"no existe ese email"})
         }

         const token = jwt.sign({id: user.id}, 'ejemplodeprueba', {expiresIn:"5h"})
         const setusertoken = await user.update({
            token,
         })

         const transporter = nodemailer.createTransport({
             service:'gmail',
             auth:{
                 user:'brayann.fave@gmail.com',
                 pass:'whpzxxvkzejrdicb',
             }
         })
         const link =  `http://localhost:5173/reset/?${token}`
        if(setusertoken){
            const mailOptions = {
                from: 'brayann.fave@gmail.com',
                to:`${user.email}`,
                subject: 'enlace para recuperar su cuenta', 
                html:`<p> solicitaste un link para el cambio de contraseña, si fue asi  hacé click Para cambiar la contraseña: <a target="_" href="${link}">cambiar contraseña</a> <br>de lo contrario desestima este correo</p>`
            };
           console.log('este es el mailoptions',mailOptions);
           transporter.sendMail(mailOptions, (err, response) =>{
               if(err){
                   res.status(200).json('No se envio el email')
                }else{
                    res.status(201).json('el email para la recuperacion ha sido enviado')
                }
            })
        }
     } catch (error) {
         res.status(500).send({
             message:'ha ocurrido un error',
             error
         })
     }
 }
 const reset = async(req, res) =>{
     const { token }= req.params
     console.log(token);

     try {
         const validuser = await Users.findOne({
             token
         })
         const verifytoken = jwt.verify(token, 'ejemplodeprueba')

         if (validuser && verifytoken.id){
             res.status(201).json({status:201, message:'link valido'})
             res.send('varificado')
         }else{
             res.status(401).json({status:401, message:"link no existe"})
             res.send('no varificado')
         }
     } catch (error) {
     }

  
 }
  const updatePass = async(req, res) =>{

      const { token } = req.params;
      console.log( req.body , req.params);
           if(req.body.password === ""){
               res.status(400).send({
                   message: 'ingrese password'
               });
               return;
           }
    try {
        const pass = req.body.password
        const verifytoken = jwt.verify(token, 'ejemplodeprueba');
        const validuser = await Users.findOne({
            where:{
                id: verifytoken.id
            }
        })
        if(validuser && validuser.id){
            const newpassword = hash.MD5(pass)
            const resetPassword = await Users.update({password:newpassword},{
                where: {
                    id:validuser.id
                }
            })
            res.status(201).send({
                status:(201),
                message:"se cambio la contraseña exitosamente"
            })
            console.log('toda info updateada',resetPassword);
        }
    } catch (error) {
        res.status(500).send({
            message: 'este error',
            error
        })
    }
  }

  const createDataBase = async(req, res) =>{

    const dbUser = [
        {
            name : "juan",
            surname: "carlos",
            email: "juan@gmail.com",
            password: "4f1ff3fa42c8182ddfb792e8d48e498d",
            role: "admin",
            phone: "123456789",
          },
          {
            name : "brian",
            surname: "perez",
            email: "brian@gmail.com",
            password: "4f1ff3fa42c8182ddfb792e8d48e498d",
            role: "admin",
            phone: "123456789",
          },
          {
            name : "jose",
            surname: "benavidez",
            email: "jose@gmail.com",
            password: "4f1ff3fa42c8182ddfb792e8d48e498d",
            role: "admin",
            phone: "123456789",
          },
          {
            name : "luis",
            surname: "benavidez",
            email: "luis@gmail.com",
            password: "4f1ff3fa42c8182ddfb792e8d48e498d",
            role: "admin",
            phone: "123456789",
          }
    ];
    const dbWorks = [
        {name: "Obra numero 1",  description:"descripcion de la obra", userId: 1},
        {name: "Obra numero 2",  description:"descripcion de la obra", userId: 2},
        {name: "Obra numero 3",  description:"descripcion de la obra", userId: 3}
    ];
    const dbNews = [
        {name: "novedadad 1",date: "12-12-2012", description: "descripcion del video", video: "", workId: 1},
        {name: "novedadad 2",date: "12-12-2012", description: "descripcion del video", video: "", workId: 1},
        {name: "novedadad 3",date: "12-12-2012", description: "descripcion del video", video: "", workId: 2},
        {name: "novedadad 4",date: "12-12-2012", description: "descripcion del video", video: "", workId: 2},
        {name: "novedadad 5",date: "12-12-2012", description: "descripcion del video", video: "", workId: 3},
        {name: "novedadad 6",date: "12-12-2012", description: "descripcion del video", video: "", workId: 3}
    ];
    const dbProgress = [
        {value: 50, height_value: 70, newsId: 1, work_progress: 1, newsId: 1, categoryId: 1},
        {value: 20, height_value: 30, newsId: 1, work_progress: 1, newsId: 1, categoryId: 2},
        {value: 40, height_value: 40, newsId: 2, work_progress: 1, newsId: 1, categoryId: 3},
        {value: 70, height_value: 70, newsId: 2, work_progress: 1, newsId: 1, categoryId: 4},
        {value: 80, height_value: 100, newsId: 3, work_progress: 2, newsId: 2, categoryId: 5},
        {value: 90, height_value: 60, newsId: 3, work_progress: 2, newsId: 2, categoryId: 6},
        {value: 50, height_value: 80, newsId: 4, work_progress: 2, newsId: 2, categoryId: 7},
        {value: 20, height_value: 60, newsId: 4, work_progress: 2, newsId: 2, categoryId: 8},
        {value: 40, height_value: 70, newsId: 5, work_progress: 3, newsId: 3, categoryId: 9},
        {value: 70, height_value: 10, newsId: 5, work_progress: 3, newsId: 3, categoryId: 10},
        {value: 80, height_value: 70, newsId: 6, work_progress: 3, newsId: 3, categoryId: 11},
        {value: 90, height_value: 20, newsId: 6, work_progress: 3, newsId: 3, categoryId: 12}
    ];
    const dbCategories = [
        {name: 'categoria 1'},
        {name: 'categoria 2'},
        {name: 'categoria 3'},
        {name: 'categoria 4'},
        {name: 'categoria 5'},
        {name: 'categoria 6'},
        {name: 'categoria 7'},
        {name: 'categoria 8'},
        {name: 'categoria 9'},
        {name: 'categoria 10'},
        {name: 'categoria 11'},
        {name: 'categoria 12'},
    ];

    try {
        await Users.bulkCreate(dbUser);
        await Works.bulkCreate(dbWorks);
        await News.bulkCreate(dbNews);
        await Categories.bulkCreate(dbCategories);
        await Progress.bulkCreate(dbProgress);
        
        res.send('Base de datos creada')
    } catch (error) {
        console.log(error)
    }
  }

  const getUserData = async (req, res) => {
    const { email } = req.body;
    try {
        
        const user = await Users.findOne({
            where:{
                email: email
            },
            include: {
                model: Works,
                include: [{
                  model: News
                },
                {
                    model: Progress,
                    include: {
                        model: Categories
                    }
                }]
            }
        });

        res.status(200).send(user)
    } catch (error) {
        
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
    getUserData
}