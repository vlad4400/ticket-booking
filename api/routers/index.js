const router = require('express').Router();
const authRouter = require('./auth');
const orderRouter = require('./order');
const passport = require('passport');

router.use('/auth', authRouter);
router.use('/order', passport.authenticate('jwt', {session: false}), orderRouter);
router.use('/', (req, res, next) => {
  res.status(404).json({
    msg: "Error api uri"
  })
});

module.exports = router;
