const { Router } = require('express');
const router = Router();

const user = require('./user');
const categories = require('./categories');
const news = require('./news');
const work = require('./work');
const progress = require('./progress');
const authSesion = require('./authSession');

router.use('/user', user);
router.use('/categories', categories);
router.use('/news', news);
router.use('/work', work);
router.use('/progress', progress);
router.use('/auth', authSesion)

module.exports = router