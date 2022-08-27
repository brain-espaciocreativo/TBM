const { Router } = require('express');
const router = Router();
const newsControllers = require('../controllers/news')

router.get('/', newsControllers.getAllNews);
router.get('/:id', newsControllers.getOneNews);
router.post('/',newsControllers.createOneNews);
router.put('/:id', newsControllers.updateOneNews);
router.delete("/:id", newsControllers.deleteOneNews);


module.exports = router;