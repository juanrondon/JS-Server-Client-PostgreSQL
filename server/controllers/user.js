const jwt = require('jwt-simple');
const models = require('../models/index');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  console.log(">>>>>", user);
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
}

exports.login = (req, res) => {
  res.send({ token: tokenForUser(req.user) });
};

exports.register = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

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
  catch (e) {
    return next(error);
  }

  const user = models.User.build({
    username: username,
    password: password,
    email: email
  });

  try {
    await user.save();
    res.json({ token: tokenForUser(user) });
  }
  catch (error) {
    return next(error);
  }
};