const bcrypt = require("bcryptjs");
const User = require("../models/user");
const sendEmail = require("../utils/emailserver");

// ================= SIGNUP =================
exports.Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check if email already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ Send welcome email immediately
    await sendEmail({
      to: email,
      subject: "Welcome to Our App 🎉",
      html: `
        <h2>Hello ${name}</h2>
        <p>Your account has been created successfully.</p>
        <p>You can now login and start using the app.</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful.",
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
};
// ================= LOGIN =================
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
   res.status(201).json({
      success: true,
      message: "Login successful.",
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};
