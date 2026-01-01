const express = require("express");
const { Signup, Login, verifyOtp , ForgetPassword ,ResetPassword} = require("../controllers/authcontroller");

const router = express.Router();

router.post("/Signup", Signup);
router.post("/Login",Login);
router.post("/otpverify", verifyOtp);
router.post("/ForgetPassword", ForgetPassword) ;
router.post("/ResetPassword/:token", ResetPassword);

module.exports = router;
    