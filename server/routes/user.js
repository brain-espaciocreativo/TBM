const { Router } = require('express');
const router = Router();
const User = require('../models/User');

router.get('/', (req, res)=>{
    try {
        res.send('Funcionando!!!')
    } catch (error) {
        console.log(error)
    }
})

router.post('/', (req, res) => {
    const {name, lastName, password, email, phone, role} = req.body; 

    try {
        const result = User.create({
            name, lastName, password, email, phone, role
        });
        console.log('este es el body', req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;