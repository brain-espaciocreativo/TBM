const { Router } = require('express');
const router = Router();
const newsControllers = require('../controllers/news')
const multer = require('multer')
const fs = require('fs');
const path = require('path')
const {News, Works, Users} = require('../models/index');
const errorHandling = require('../utils/errorHandling');
const axios = require('axios');
const BusinessError = require('../utils/BusinessError');

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

router.get('/', newsControllers.getAllNews);
router.get('/:id', newsControllers.getOneNews);
router.post('/', uploads.single('video') , async (req, res, next) =>{

    const { name, description, workId} = req.query;
    
    try {

        if( !name || !description ) throw new BusinessError("Datos obligatorios", 401);

        if(!req.file){
            if(workId && workId !== ''){
                const dataWork = await Works.findOne({
                    where: {
                        name: workId
                    },
                    include: {
                        model: Users
                    }
                });
     
                const data = await News.create({
                    name,
                    description,
                    workId: dataWork.id
                });

                const users = dataWork.get({ plain: true });

                sendNotification(users.users, data.dataValues);

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
                    },
                    includes: {
                        model: Users
                    }
                });
     
                const data = await News.create({
                    name,
                    description,
                    video: `videos?video=${req.file.filename}`, 
                    workId: dataWork.id
                });
                
                const users = dataWork.get({ plain: true });

                sendNotification(users.users, data.dataValues);

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
        next(error)
    }
});

const sendNotification = async (users, news)=>{

      try {
        users.map(async(e)=>{
            const message = {
                title: news.name, 
                message: news.description, 
                id: e.id.toString()
              }
              console.log(message)
            await axios.post('http://localhost:3000/send-notification', message)
            .then(res=>console.log(res))
            .catch(error=> console.log(error))
        })
        } catch (error) {
        console.log(error)
    }
}

module.exports = router;