const router = require('express').Router();
const controller = require('../controller/public');

router.get('/about', controller.about);

module.exports = router;