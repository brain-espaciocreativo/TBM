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

    // const { video } = req.query

    // const range = req.headers.range
    // if(!range){
    //     res.status(400).send("falló")
    // }
    // const videoPath = path.resolve(__dirname, `../uploads/${video}`)
    // const videoSize = fs.statSync(__dirname, `../uploads/${video}`).size

    //  console.log(videoSize, 'ESTO ES EL LARGO')
    
    // const CHUNK_SIZE = 10 ** 6;
    // const start = Number(range.replace(/\D/g, ""))
    // const end = Math.min( start + CHUNK_SIZE, videoSize - 1 )

    // const contentLength = end - start + 1;
    // const headers = {
    //     "content-Range": `bytes ${start}-${end}/${videoSize}`,
    //     "Accept-Ranges": "bytes",
    //     "Content-Length": contentLength,
    //     "Content-Type": "video/mp4",
    // }
    // res.writeHead(206, headers);
    // const videoStream = fs.createReadStream(videoPath, { start, end });
    
    // videoStream.pipe(res);
})


module.exports = router;