const e = require('express');
const { Router } = require('express');
const authSessionRouter =  Router();
const hash = require('object-hash');
// const nanoid = require('nanoid');
const { Users, Works, News, Progress, Categories} = require('../models/index');

const sessions = [];

authSessionRouter.post('/login', async (req, res)=>{

    const {email, password} = req.body;
    const result = [];

    if(!email || !password) return res.status(400);

    const data = await Users.findOne({
        where:{
            email:email
        },
        include: {
            model: Works
        }
    })

    const pass = hash.MD5(password)
    if(!data) return res.status(401).send('datos incorrectos');

    if(data.password !== pass) return res.status(401).send('constraseña invalida');

    const user = data.get({ plain: true });

    const works = user.works;
    delete user.works;
    const userData = user;



        result.push(userData);
        result.push(works);

    res.status(201).send({data:`Usuario ${user} autenticado`, data: result});
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