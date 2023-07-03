const { Router } = require('express');
const router = Router();
const {getAll, get, create, destroy, update} = require('../controllers/news');

router.get('/', getAll);
router.get('/:id', get);
router.post('/', create);
router.put('/:id', update);
router.delete("/:id", destroy);

module.exports = router;