const {Router} = require('express');
// import { Router } from 'express';
// import server from '../config/config';

const authRouter =  Router();
const DDBB = require('./DDBB');

// endpoint public (No autenticado y no autorizado)

authRouter.get('/public', (req, res)=>{
    res.send("publico");
});

// endoint autenticado

authRouter.post('/authenticated', (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password) return res.sendStatus(400);

    const user = DDBB.find(e=> e.email === email);
    if(!user) return res.sendStatus(401);

    if(user.password !== password) return res.sendStatus(401);

    res.send(`Usuario ${user.name} autenticado`);

});

// endpoint autorizado para administradores

authRouter.post('/authorized', (req, res)=>{
    const {email, password} = req.body;
    
    if(!email || !password) return res.sendStatus(400);

    const user = DDBB.find(e=> e.email === email);
    if(!user) return res.sendStatus(401).send('El usuario no existe');

    if(user.password !== password) return res.sendStatus(401).send('Contraseña incorrecta');

    if(user.role !== 'admin') return res.sendStatus(403);

    res.send(`Usuario administrador ${user.name}`);

});


module.exports = authRouter;