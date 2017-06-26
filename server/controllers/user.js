const jwt = require('jwt-simple');
const models = require('../models/index');

// POST
exports.login = (req, res) => {
  res.send({ token: models.User.getTokenForUser(req.user) });
};

// POST
exports.register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  // Validation
  if (!username) {
    return res.status(422).send({ error: 'A username is required.' });
  }
  if (!password) {
    return res.status(422).send({ error: 'A password is required.' });
  }
  if (!email) {
    return res.status(422).send({ error: 'An email is required.' });
  }
  try {
    const existingUser = await models.User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(422).send({ error: 'That username is already in use.' });
    }
  }
  catch (err) {
    console.log(err);
  }

  try {
    const token = await models.User.registerUser(username, email, password);
    res.status(200).send({ token });
  }
  catch (err) {
    console.log(err);
  }
};