const { Router } = require('express');
const router = Router();
const newsControllers = require('../controllers/news')
const multer = require('multer')
const fs = require('fs');
const path = require('path')
const {News} = require('../models/index'); 


const diskStorage =  multer.diskStorage({
    
    destination: (req , file , cb) =>{
        const filePath = path.resolve(__dirname,'../uploads')
        cb(null , filePath)
    },  
    filename: (req, file, cb) =>{
        const extencion = path.extname(file.originalname)
       
        cb(null,  `video-${Date.now()}${extencion}`)
    }
}) 

const uploads = multer({ 
    storage: diskStorage
})


router.get('/', newsControllers.getAllNews);
router.get('/:id', newsControllers.getOneNews);
router.post('/', uploads.single('video') , async (req, res) =>{
    const { name, description, video, workId} = req.query; 


    console.log('---> esto es el body', req.query)
    console.log('-------------------------------');
    console.log('---> esto es el file', req.file)

    try {

        if( !name || !description ) res.status(402).send({status:402, data: "Datos obligatorios"});

        if(req.file === null) res.status(402).send({status:402, data: "No existe archivo para subir"})

        if(workId){
            const data = await News.create({
                name,
                description,
                video: '/uploads/' + req.file.fieldname, 
                workId
            });
            res.status(201).send({status: "OK", data: data });
        }else{
            const data = await News.create({
                name,
                description,
                video : '/uploads/' + req.file.fieldname
            });
            res.status(201).send({status: "OK", data: data });
        }
        
    } catch (error) {
        console.log(error)
    }
});
router.put('/:id', newsControllers.updateOneNews);
router.delete("/:id", newsControllers.deleteOneNews);


module.exports = router;