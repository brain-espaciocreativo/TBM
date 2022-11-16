const { Router } = require('express');
const router = Router();
const newsControllers = require('../controllers/news')
const multer = require('multer')
const fs = require('fs');
const path = require('path')
const {News, Works} = require('../models/index');
const errorHandling = require('../utils/errorHandling');

router.get('/', newsControllers.getAllNews);
router.get('/:id', newsControllers.getOneNews);
router.put('/:id', newsControllers.updateOneNews);
router.delete("/:id", newsControllers.deleteOneNews);

const diskStorage =  multer.diskStorage({
    
    destination: (req , file , cb) =>{
        const filePath = path.resolve(__dirname,'../uploads')
        cb(null , filePath)
    },  
    filename: (req, file, cb) =>{
        const extencion = path.extname(file.originalname)
       
        cb(null,  `${Date.now()}${extencion}`)
    }
}) 

const uploads = multer({ 
    storage: diskStorage
})
router.post('/', uploads.single('video') , async (req, res) =>{

    const { name, description, workId} = req.query;
    
    try {

        if( !name || !description ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));

        if(!req.file){

            if(workId && workId !== ''){

                const dataWork = await Works.findOne({
                    where: {
                        name: workId
                    }
                })
     
                const data = await News.create({
                    name,
                    description,
                    workId: dataWork.id
                });
                res.status(201).send({status: "OK", data: data });
            }
            if(!workId && workId === ''){
                const data = await News.create({
                    name,
                    description
                });
                res.status(201).send({status: "OK", data: data });
            }
        }

        if(req.file){

            if(workId && workId !== ''){
                const dataWork = await Works.findOne({
                    where: {
                        name: workId
                    }
                })
     
                const data = await News.create({
                    name,
                    description,
                    video: `videos?video=${req.file.filename}`, 
                    workId: dataWork.id
                });
                res.status(201).send({status: "OK", data: data });
            }
            if(!workId && workId === ''){
                const data = await News.create({
                    name,
                    description,
                    video : `videos?video=${req.file.filename}`
                });
                res.status(201).send({status: "OK", data: data });
            }
        }
        
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;