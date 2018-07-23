// import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user';

module.exports = (passport) => {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy.Strategy({
        usernameField: `email`,
        passwordField: `password`,
        passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({email}).select(`+password`).exec((err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, req.flash(`loginMessage`, `User does not exist.`));
            }

            if (!user.validPassword(password)) {
                return done(null, false, req.flash(`loginMessage`, `Incorrect password.`));
            }

            return done(null, user);
        });
    }));
};
