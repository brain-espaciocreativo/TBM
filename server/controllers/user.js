const {Users, Works, News, Progress, Categories} = require('../models');
const nodemailer =  require('nodemailer');
const jwt = require('jsonwebtoken');
const hash = require('object-hash');

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

         const token = jwt.sign({id: user.id}, 'ejemplodeprueba', {expiresIn:"5m"})
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

        if(setusertoken){
            const mailOptions = {
                from: 'brayann.fave@gmail.com',
                to:`${user.email}`,
                subject: 'enlace para recuperar su cuenta',
                text: `http://localhost:3000/forgotpassword/${token}`
            };
           console.log(mailOptions);
            transporter.sendMail(mailOptions, (err, response) =>{
                if(err){
                    res.status(200).json('No se envio el email')
                }else{
                    res.status(200).json('el email para la recuperacion ha sido enviado')
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

    try {
        const validuser = await Users.findOne({
            token
        })
        const verifytoken = jwt.verify(token, 'ejemplodeprueba',{expiresIn:"5m"})

        if (validuser && verifytoken.id){
            res.status(201).json({status:201, validuser})
        }else{
            res.status(401).json({status:401, message:"link no existe"})
        }
    } catch (error) {
    }

  
}
  const updatePass = async(req, res) =>{

    const { token } = req.params;
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


module.exports = {
    getAllUser,
    getOneUser,
    createOneUser,
    updateOneUser,
    deleteOneUser,
    forgotPass,
    updatePass,
    reset
}