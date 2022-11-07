const { Router } = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');


router.get('/' , (req, res) =>{

    const { video } = req.query

    const pathFile = path.resolve(__dirname, `../uploads/${video}`)
    const stat = fs.statSync(pathFile)
    const fileSize = stat.size
    const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(pathFile).pipe(res)
})


module.exports = router;