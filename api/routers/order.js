const router = require('express').Router();
const controller = require('../controllers/order');

router.get('/getAll', controller.getAll);
router.post('/makeOne', controller.makeOne);
router.delete('/delete', controller.makeOne);

module.exports = router;
