const { Router } = require('express');
const router = Router();
const workController = require('../controllers/work');

router.get('/', workController.getAllWork);
router.get('/:id', workController.getOneWork);
router.post('/', workController.createOneWork);
router.put('/:id', workController.updateOneWork);
router.delete('/:id', workController.deleteOneWork);

module.exports = router;

