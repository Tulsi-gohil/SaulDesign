const express = require("express");
const { Signup, Login, verifyOtp , ForgetPassword ,ResetPassword} = require("../controllers/authcontroller");

const router = express.Router();

router.post("/signup",Signup);
router.post("/login",Login);
router.post("/otpverify",verifyOtp);
router.post("/forgetPassword",ForgetPassword) ;
router.post("/resetPassword/:token",ResetPassword);

module.exports = router;
    