const {Router} = require('express');
const { Users } = require('../models');
const authTokenRouter =  Router();
const jwt = require('jsonwebtoken');
const hash = require('object-hash');

authTokenRouter.post('/login', async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password) return res.sendStatus(400);

    const user = await Users.findOne({
        where:{
            email: email
        }
    })
    if(!user) return res.status(401).send('datos incorrectos');

    const pass = hash.MD5(password)
    if(user.password !== pass) return res.status(401);

    const token = jwt.sign({id: user.id, email: user.email, role: user.role}, 'ejemplodeprueba', {expiresIn:"5m"})
    

    res.send(token);

});

const meddlewareToken = async(req, res, next)=>{
    const { authorization } = req.headers;

    const validuser = await Users.findOne();
    const verifytoken = jwt.verify(authorization, 'ejemplodeprueba',{expiresIn:"5m"})

    if (validuser && verifytoken.id){
        res.status(201).json({status:201, verifytoken})
        next()
    }else{
        res.status(401).json({status:401, message:"link no existe"})
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {authTokenRouter, meddlewareToken}