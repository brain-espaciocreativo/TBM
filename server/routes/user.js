const { Router } = require('express');
const router = Router();

router.get('/', (req, res)=>{
    try {
        res.send('Funcionando!!!')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;