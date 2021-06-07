const express = require("express");
const path = require("path");
const passport = require('passport');
require("colors");
const apiRouter = require('./api/routers');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./api/config/keys');


const port = process.env.PORT || 8080;
const distDir = path.join(__dirname, "/dist/ticket-booking/");

const app = express();

app.use(require('morgan')('dev'));
app.use(require('cors')());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected.');

    app.use(express.static(distDir));

    app.use(passport.initialize());
    require('./api/middlewares/passport')(passport);
    app.use('/api', apiRouter);

    app.get("*", (req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  })
  .catch(error => console.log(error));

const server = app.listen(port, () => {
  const isLocal = process.env.PORT ? false : true;

  isLocal
    ? console.log('Server running at', `http://localhost:${port}/`.blue)
    : console.log(`Server running on port ${port}`);
});
