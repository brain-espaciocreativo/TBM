const { Router } = require('express');
const router = Router();
const newsControllers = require('../controllers/news')
const multer = require('multer')
const fs = require('fs');
const path = require('path')




const diskStorage =  multer.diskStorage({
    
    destination: (req , file , cb) =>{
        const filePath = path.resolve(__dirname,'../public/uploads')
        cb(null , filePath)
    },  
    filename: (req, file, cb) =>{   
        const extencion = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${extencion}`)
    }
}) 

const uploads = multer({ 
    storage: diskStorage
})


router.get('/', newsControllers.getAllNews);
router.get('/:id', newsControllers.getOneNews);
router.post('/', uploads.single('video') ,newsControllers.createOneNews);
router.put('/:id', newsControllers.updateOneNews);
router.delete("/:id", newsControllers.deleteOneNews);


module.exports = router;