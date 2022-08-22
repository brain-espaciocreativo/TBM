const {Router} = require('express');
const authTokenRouter =  Router();
const DDBB = require('./DDBB');

authRouter.post('/login', (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password) return res.sendStatus(400);

    const user = DDBB.find(e=> e.email === email);
    if(!user) return res.sendStatus(401);

    if(user.password !== password) return res.sendStatus(401);

    res.send(`Usuario ${user.name} autenticado`);

});
