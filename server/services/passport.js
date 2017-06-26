const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local');
var models = require('../models/index');

const localLogin = new LocalStrategy(async (username, password, done) => {

  const user = await models.User.findOne({ where: { username } });
  if (!user) {
    return done(null, false);
  }
  try {    
    const result = await user.comparePassword(password);
    return done(null, user);
  }
  catch (err) {
    console.log(err);
  }
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorisation'),
  secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  const user = await models.User.findOne({ where: { id: payload.sub } });
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);