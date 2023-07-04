const { Router } = require('express');
const router = Router();
const { uploads } = require('../utils/create_multer_disk');
const { getAll, get, create, destroy, update } = require('../controllers/news');

router.get('/', getAll);
router.get('/:id', get);
router.post('/', uploads.single('video'), create);
router.put('/:id', update);
router.delete("/:id", destroy);

module.exports = router;