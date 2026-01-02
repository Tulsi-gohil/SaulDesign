const express = require("express");
const { Signup, Login, verifyOtp , ForgetPassword ,ResetPassword} = require("../controllers/authcontroller");

const router = express.Router();

router.get("/Signup",Signup);
router.get("/Login",Login);
router.get("/otpverify",verifyOtp);
router.get("/ForgetPassword",ForgetPassword) ;
router.get("/ResetPassword/:token",ResetPassword);

module.exports = router;
    