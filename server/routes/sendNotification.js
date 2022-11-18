const { Router } = require('express');
const router = Router();
const axios = require("axios");

router.post('/', async (req, res) => {
    const { title, message, id } = req.body;
    
        try {
            const result = axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                subID: id,
                appId: 4288,
                appToken: 'G3UUXb9RiGbpDyN2Ltvh9X',
                title: title,
                message: message
           });

            res.status(200).send({status: 200, data:'Se envio correctamente'});
            
        } catch (error) {
            console.log(error)
        }
})

module.exports = router;