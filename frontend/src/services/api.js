
exports.ResetPassword = async (req, res) => {
  try {
    const { token } = req.params; // get token from URL
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword)
      return res.status(400).json({ message: "All fields required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token or user not found" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password.toString().trim(), 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful ✅" });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token expired or invalid ❌" });
  }
};