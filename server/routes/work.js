const { Router } = require('express');
const router = Router();
const {get, getAll, getByName, update, destroy, create} = require('../controllers/work');

router.get('/', getAll);
router.get('/:id', get);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);
router.get('/name/:name', getByName);

module.exports = router;

