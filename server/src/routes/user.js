const { Router } = require('express');
const router = Router();
const { getUser } = require('../controllers')

router.get('/', (req, res)=>{
    try {
        res.send('Funcionando!!!')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;