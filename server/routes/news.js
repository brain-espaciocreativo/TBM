const { Router } = require('express');
const router = Router();
const newsControllers = require('../controllers/news')

router.get('/', newsControllers.all);
router.get('/:id', newsControllers.showId);
router.post('/',newsControllers.create);
router.put('/:id', newsControllers.edit);
router.delete("/:id", newsControllers.delete);


module.exports = router;