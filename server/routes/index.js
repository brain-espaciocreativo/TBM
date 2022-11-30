const { Router } = require('express');
const router = Router();

const user = require('./user');
const categories = require('./categories');
const news = require('./news');
const work = require('./work');
const progress = require('./progress');
const authSesion = require('./authSession');
const sendMail = require('./sendMail');
const uploadFiles = require('./uploadFiles');
const videos =  require('./videos');
const sendNotification = require('./sendNotification');

router.use('/user', user);
router.use('/categories', categories);
router.use('/news', news);
router.use('/work', work);
router.use('/progress', progress);
router.use('/auth', authSesion);
router.use('/send-email', sendMail);
router.use('/videos', videos)
router.use('/send-notification', sendNotification);

module.exports = router