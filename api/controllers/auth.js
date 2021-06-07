const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

exports.login = async (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  const candidate = await User.findOne({ email })

  if (candidate) {
    const passwordResult = bcrypt.compareSync(password, candidate.password);
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwtSecret, { expiresIn: 60 * 60 });
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        msg: 'Złe hasło. Spróbuj ponownie.'
      });
    }
  } else {
    res.status(404).json({
      msg: 'Użytkownik z tym adresem e-mail nie został znaleziony'
    });
  }
}

exports.registr = async (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  const candidate = await User.findOne({ email });

  if (candidate) {
    res.status(409).json({
      msg: 'Użytkownik z tym adresem email już istnieje'
    });
  } else {
    const salt = bcrypt.genSaltSync(3);
    const user = new User({
      email,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      await user.save();
      res.status(201).json({
        msg: 'Utworzono nowego użytkownika'
      });
    } catch(err) {
      errorHandler(err);
    }
  }
}
