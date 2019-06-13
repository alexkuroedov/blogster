const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {ensureAuth} = require('../helpers/auth.js')
const mongoose = require('mongoose')

//Load User Model
require("../models/User");
const User = mongoose.model("users");

//User Login Route
router.get("/login", (req, res) => {
    res.render("auth/login");
});

//User Register Route
router.get("/register", (req, res) => {
    res.render("auth/register");
});


//Login Form POST
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login",
        failureFlash: true
    })(req, res, next);
});

//Register Form POST
router.post("/register", (req, res) => {
    let errors = [];

    if (req.body.password != req.body.password2) {
        errors.push({ text: "Passwords do not match" });
    }

    if (req.body.password.length < 4) {
        errors.push({ text: "Password must be at least 4 characters" });
    }

    if (errors.length > 0) {
        res.render("auth/register", {
            errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                req.flash("error_msg", "Email already registered");
                res.redirect("/auth/register");
            } else {

                console.log(req.body)
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    "success_msg",
                                    "You are now registered and can log in"
                                );
                                res.redirect("/auth/login");
                            })
                            .catch(err => {
                                console.log(err);
                                return;
                            });
                    });
                }); //bcrypt
            } //else
        });
    }
});

//Logout User
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/auth/login");
});


module.exports = router