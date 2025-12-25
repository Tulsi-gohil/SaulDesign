const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendEmail = require("../utils/emailserver");

exports.Signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const user = await User.create({ name, email, password });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  const verifyLink = `${process.env.CLIENT_URL}/verify/${token}`;

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: `
      <h3>Hello ${name}</h3>
      <p>Click below to verify your email:</p>
      <a href="${verifyLink}">Verify Email</a>
    `,
  });

  res.status(201).json({
    success: true,
    message: "Verification email sent",
  });
};

exports.verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.isVerified) {
      return res.send("Email already verified");
    }

    user.isVerified = true;
    await user.save();

    // Welcome email
    await sendEmail({
      to: user.email,
      subject: "Welcome 🎉",
      html: `<h2>Welcome ${user.name}</h2><p>Your account is now active.</p>`,
    });

    res.send("Email verified successfully 🎉");
exports.verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.redirect(
        `${process.env.CLIENT_URL}/verify-failed`
      );
    }

    if (!user.isVerified) {
      user.isVerified = true;
      await user.save();

      // Send welcome email
      await sendEmail({
        to: user.email,
        subject: "Welcome 🎉",
        html: `
          <h1>Welcome ${user.name}</h1>
          <p>Your email is verified successfully.</p>
        `,
      });
    }

    // ✅ Redirect to frontend success page
    res.redirect(
      `${process.env.CLIENT_URL}/verify-success`
    );

  } catch (error) {
    res.redirect(
      `${process.env.CLIENT_URL}/verify-failed`
    );
  }
};

  } catch (error) {
    res.status(400).send("Invalid or expired token");
  }
};
