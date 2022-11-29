const { Router } = require('express');
const router = Router();
const axios = require("axios");

router.post('/', async (req, res) => {
    const { title, message, id } = req.body;

        try {
            const result = await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
            subID: id,
            appId: 4286,
            appToken: 'aXYeglLuQBXrczxaW5H8wf',
            title: title,
            message: message
            });

            res.status(200).send({status: 200, data:'Se envio correctamente'});
            
        } catch (error) {
            console.log(error)
        }
})

module.exports = router;