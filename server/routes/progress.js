const { Router } = require('express');
const router = Router();
const progressControllers = require('../controllers/progress')

router.get('/', progressControllers.all);
router.get('/:id', progressControllers.showId);
router.post('/',progressControllers.create);
router.put('/:id', progressControllers.edit);
router.delete("/:id", progressControllers.delete);


module.exports = router;