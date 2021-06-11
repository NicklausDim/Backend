const router = require('express').Router();
const contactsC = require('../controller/contacts');
const testMid = require('../middleware/test');
const logMid = require('../middleware/log');
const auth = require('../middleware/auth');

router.post('/new', logMid.logger, testMid.test, contactsC.newContact);
router.get('/all', logMid.logger, contactsC.getAll);
router.delete('/:contactId', logMid.logger, contactsC.deleteContact);
router.post('/update', logMid.logger, contactsC.updateContact);

module.exports = router;