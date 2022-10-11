const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user');

router.get('/', userController.getAllUser);
router.get('/:id', userController.getOneUser);
router.post('/', userController.createOneUser);
router.put('/:id', userController.updateOneUser);
router.delete("/:id", userController.deleteOneUser);

router.post('/sendpasswordlink', userController.forgotPass);
router.get('/reset/:id/:token', userController.reset);
router.put('/updatepassword/:id/:token', userController.updatePass);
router.post("/create", userController.createDataBase);
router.get("/data/get", userController.getUserData);


router.post('/sendpasswordlink', userController.forgotPass)
// router.get('/reset/:token', userController.reset)
router.put('/updatepassword/:token', userController.updatePass)

module.exports = router;