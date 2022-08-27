const { Router } = require('express');
const router = Router();
const categoriasControllers = require('../controllers/categories')

router.get('/', categoriasControllers.getAllCategories);
router.get('/:id', categoriasControllers.getOneCategories);
router.post('/',categoriasControllers.createOneCategories);
router.put('/:id', categoriasControllers.updateOneCategories);
router.delete("/:id", categoriasControllers.deleteOneCategories);

module.exports= router;