const multer = require('multer');
const path = require('path');

const diskStorage =  multer.diskStorage({
    destination: (req , file , cb) =>{
        const filePath = path.resolve(__dirname,'../uploads')
        cb(null , filePath)
    },  
    filename: (req, file, cb) =>{
        const extencion = path.extname(file.originalname)

        cb(null,  `${Date.now()}${extencion}`)
    }
});

const uploads = multer({ 
    storage: diskStorage
});

module.exports = {
    uploads
};