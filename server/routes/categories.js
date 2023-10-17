const { Router } = require('express');
const router = Router();
const { getAll, get, create } = require('../controllers/categories');

router.get('/', getAll);
router.get('/:id', get);
router.post('/', create);

module.exports = router;