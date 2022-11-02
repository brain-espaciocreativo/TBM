 const { Router } = require('express');
 const router = Router();
 const multer  = require('multer');
 const upload = multer({ dest: 'uploads/' });
 const fs = require('fs');

 
 router.post('/', upload.single('imagen') ,(req, res) => {


     try {
         if(req.file && req.file === null)throw Error(res.status(402).send({status:402, data: "No existe archivo para subir"}))
         fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
         res.status(201).send({status: "Se subio correctamente", data: req.file });
     } catch (error) {
         console.log(error)
         throw Error(res.status(500).send({status:500, data:"No se subio el archivo"}));
     }
 });
 module.exports = router;
