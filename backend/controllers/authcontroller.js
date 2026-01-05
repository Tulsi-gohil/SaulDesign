const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendEmail = require("../utils/emailserver");
const fs = require("fs");
const path = require("path");
const mjml = require("mjml"); 
const otpStore = {};
exports.Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    };

    try {
      await sendEmail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification OTP",
        html: `<h2>Your OTP is ${otp}</h2>`
      });
    } catch (mailError) {
      console.log("Email failed but user created");
    }

    res.status(201).json({
      success: true,
      message: "Signup successful. OTP sent to email.",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
};
 
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const record = otpStore[email];
    if (!record) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    if (Date.now() > record.expires) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (Number(otp) !== record.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    delete otpStore[email];

    try {
      await sendEmail({
        to: email,
        subject: "Welcome to Our App 🎉",
        html: `
          <h2>Hello ${user.name}</h2>
          <p>Your email has been verified successfully.</p>
          <p>You can now login to your account.</p>
        `,
      });
    } catch (err) {
      console.log("Verification email failed");
    }

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

/* ================= FORGOT PASSWORD ================= */
exports.ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `https://saul-design.vercel.app/reset-password/${token}`;

    const templatePath = path.join(
      __dirname,
      "../utils/emailTemplates/Email.mjml"
    );

    const mjmlTemplate = fs.readFileSync(templatePath, "utf8");
    const { html } = mjml(
      mjmlTemplate.replace("{{RESET_LINK}}", resetLink)
    );

    await sendEmail({
      to: email,
      subject: "Reset Your Password",
      html,
    });

    res.json({ message: "Reset link sent to email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Email sending failed" });
  }
};

/* ================= RESET PASSWORD ================= */
exports.ResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword)
      return res.status(400).json({ message: "All fields required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user)
      return res.status(400).json({ message: "Invalid token" });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Token expired or invalid" });
  }
};
/* ================= LOGIN ================= */
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(401).json({ message: "Please verify email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};
