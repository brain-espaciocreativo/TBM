const { Router } = require('express');
const router = Router();
const workController = require('../controllers/work');

router.get('/', workController.all);
router.get('/:id', workController.showId);
router.post('/', workController.create);
router.put('/:id', workController.edit);
router.delete('/:id', workController.delete);

module.exports = router;

