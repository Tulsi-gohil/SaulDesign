const express = require("express");
const { Signup,Login } = require("../controllers/authcontroller");

const router = express.Router();

router.post("/Signup", Signup);
router.post("/Login",Login);
 
module.exports = router;
