const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user');

router.get('/', userController.all);
router.get('/:id', userController.showId)
router.post('/', userController.create);
router.put('/:id', userController.edit);
router.delete("/:id", userController.delete);

module.exports = router;