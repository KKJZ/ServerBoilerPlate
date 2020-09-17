const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local Strat
passport.use(
    new LocalStrategy(
        { usenameField: "username" },
        (username, password, done) => {
            User.findOne({ username: username }).then(user => {
                // Create new user
                if (!user) {
                    const newUser = new User({ username, password });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    return done(null, false, { message: err });
                                });
                        });
                    });
                // Other User
                } else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong Password" });
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err })
            });
        })
);

module.exports = passport;
