const router = require('express').Router();
const controller = require('../controllers/auth');

router.post('/login', controller.login);
router.post('/registr', controller.registr);

module.exports = router;
