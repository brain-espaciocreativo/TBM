const e = require('express');
const { Router } = require('express');
const USERS_BBDD = require('./DDBB');
const authSessionRouter =  Router();
const hash = require('object-hash');
// const nanoid = require('nanoid');
const { Users} = require('../models/index');

const sessions = [];

authSessionRouter.post('/login', async (req, res)=>{

    const {email, password} = req.body;
    if(!email || !password) return res.status(400);

    const user = await Users.findOne({
        where:{
            email:email
        }
    })

    const pass = hash.MD5(password)
    if(!user) return res.status(401).send('datos incorrectos'); 
    if(user.password !== pass) return res.status(401);

    // const sessionId = nanoid();
    const { guid } = user;

    const sessionId = '1233456789';
    sessions.push({sessionId, guid});

    res.cookie('sessionId', sessionId, {
        httpOnly: true
    });
    res.status(201).send({data:`Usuario ${user} autenticado`, user: user});
});

authSessionRouter.get('/profile', (req, res)=>{
    const { cookies } = req;

    if(!cookies.sessionId) return res.sendStatus(401);
    const userSession = sessions.find(e => e.sessionId === cookies.sessionId);

    if(!userSession) return res.sendStatus(401);

    const user = USERS_BBDD.find(e => e.guid === userSession.guid);

    if(!user) return res.sendStatus(401);

    delete user.password;

    res.send(user);
});

module.exports = authSessionRouter;