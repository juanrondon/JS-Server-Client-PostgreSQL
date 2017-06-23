const passport = require('passport');
const userController = require('./controllers/user');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ message: 'You have been logged in.' });
  });
  app.post('/register', userController.register);
  app.post('/login', requireLogin, userController.login);  
};