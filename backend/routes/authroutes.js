const express = require("express");
const { Signup,verifyEmail,} = require("../controllers/authcontroller");
 
const router = express.Router();

router.post("/Signup", Signup);
router.get("/verify/:token", verifyEmail);

module.exports = router;
