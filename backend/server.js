require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const sgMail = require("@sendgrid/mail");

const dbcon = require("./libs/db");
const authRouters = require("../routes/authroutes");

const app = express();

 
/* ===== MIDDLEWARE ===== */
app.use(cors({
  origin:"https://saul-design.vercel.app", // or your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data

/* ===== DATABASE ===== */
dbcon();
app.use("/api/auth", authRouters);

/* ===== SENDGRID ===== */
if (!process.env.SENDGRID_API_KEY) {
  console.warn("⚠️ SendGrid API key missing");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/* ===== TEST ===== */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ===== CV DOWNLOAD ===== */
app.get("/download-cv", (req, res) => {
  const filePath = path.join(__dirname, "files", "Tulsi_CV.pdf");
  res.download(filePath);
});

/* ===== CONTACT + OTP ===== */
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Missing name, email, or message",
    });
  }

  try {
    /* ===== SEND CONTACT EMAIL ===== */
    const adminMsg = {
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL_FROM,
      replyTo: email,
      subject: "New Portfolio Message",
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    };

    await sgMail.send(adminMsg);

  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error);
    res.status(500).json({
      success: false,
      message: "Email failed to send",
    });
  }
});
/* ===== START SERVER ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
