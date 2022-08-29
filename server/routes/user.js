const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user');

router.get('/', userController.getAllUser);
router.get('/:id', userController.getOneUser)
router.post('/', userController.createOneUser);
router.put('/:id', userController.updateOneUser);
router.delete("/:id", userController.deleteOneUser);

module.exports = router;