const e = require('express');
const { Router } = require('express');
const USERS_BBDD = require('./DDBB');
const authSessionRouter =  Router();
// const nanoid = require('nanoid');
const DDBB = require('./DDBB');

const sessions = [];

authSessionRouter.post('/login', (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password) return res.sendStatus(400);

    const user = DDBB.find(e=> e.email === email);
    if(!user) return res.sendStatus(401);

    if(user.password !== password) return res.sendStatus(401);

    // const sessionId = nanoid();
    const { guid } = user;

    const sessionId = '1233456789';
    sessions.push({sessionId, guid});

    res.cookie('sessionId', sessionId, {
        httpOnly: true
    });
    res.send(`Usuario ${user.name} autenticado`);
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