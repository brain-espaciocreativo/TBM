const { Router } = require('express');
const router = Router();
const progressControllers = require('../controllers/progress')

router.get('/', progressControllers.getAllProgress);
router.get('/:id', progressControllers.getOnePorgress);
router.post('/',progressControllers.createOneProgress);
router.put('/:id', progressControllers.updateOneProgress);
router.delete("/:id", progressControllers.deleteOneProgress);


module.exports = router;