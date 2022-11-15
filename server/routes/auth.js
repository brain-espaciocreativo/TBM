const { Router } = require('express');
const BusinessError = require('../utils/BusinessError');
// import { Router } from 'express';
// import server from '../config/config';

const authRouter = Router();
const DDBB = require('./DDBB');

// endpoint public (No autenticado y no autorizado)

authRouter.get('/public', (req, res) => {
    res.send("publico");
});

// endoint autenticado

authRouter.post('/authenticated', (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) next(new BusinessError('Falta informacion del email o usaurio', 400));

    const user = DDBB.find(e => e.email === email);
    if (!user) next(new BusinessError('Usuario no encontrado', 404));

    if (user.password !== password) next(new BusinessError('La contraña incorrecta', 400));

    res.send(`Usuario ${user.name} autenticado`);

});

// endpoint autorizado para administradores

authRouter.post('/authorized', (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) next(new BusinessError('Falta informacion del email o usaurio', 400));

    const user = DDBB.find(e => e.email === email);
    if (!user) next(new BusinessError('Usuario no encontrado', 404));

    if (user.password !== password) next(new BusinessError('La contraña incorrecta', 400));

    if (user.role !== 'admin') next(new BusinessError('Usario no encotrado', 403));;

    res.send(`Usuario administrador ${user.name}`);

});


module.exports = authRouter;