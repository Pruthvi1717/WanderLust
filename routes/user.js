const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// Signup
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(userController.createUser);

// Login
router.route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.userLogIn
    );

// Logout
router.get("/logout", userController.userLogOut);

module.exports = router;
