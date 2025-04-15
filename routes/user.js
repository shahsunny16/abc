const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userControler = require("../controlers/users.js")

router.get('/signup',userControler.renderSignupForm)

router.post('/signup',wrapAsync(userControler.signUp))

router.get('/login',userControler.renderLoginForm)

router.post(
    '/login',
    saveRedirectUrl,
    passport.authenticate("local",
        {failureRedirect:'/login',
        failureFlash:true,
    }),
    userControler.login
)

router.get('/logout',userControler.logout);

module.exports = router;