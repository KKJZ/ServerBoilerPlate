'use strict';
const express = require("express");
const passport = require("passport");

const router = express.Router();

const {User} = require("../models/userModel");

router.get('/', (req, res) => {
    res.sendStatus(403);
});

router.post('/register_login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(400).json({errors: err});
        }
        if (!user) {
            return res.status(400).json({errors: "No user found!"});
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({errors: err});
            }
            return res.status(200).json({success: `Logged in ${user.id}`});
        });
    })(req, res, next)
});

router.post('/register_user', (req, res, next) => {
    return res.status(200),json({message: "TODO"})
});

module.exports = router;
