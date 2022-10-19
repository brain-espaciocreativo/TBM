const { Router } = require('express');
const router = Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

router.post('/', upload.single('imagen') ,(req, res) => {
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
    res.send('subido');
});

module.exports = router;
