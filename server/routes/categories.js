const { Router } = require('express');
const router = Router();
const categoriasControllers = require('../controllers/categories')

router.get('/', categoriasControllers.all);
router.get('/:id', categoriasControllers.showId);
router.post('/',categoriasControllers.create);
router.put('/:id', categoriasControllers.edit);
router.delete("/:id", categoriasControllers.delete);

module.exports= router;