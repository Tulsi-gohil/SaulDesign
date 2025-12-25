// server.js
require("dotenv").config(); // MUST be first

const express = require("express");
const cors = require("cors");
const path = require("path");
const sgMail = require("@sendgrid/mail");

const dbcon = require("./libs/db");
const authRouters=require("./routes/authroutes");
const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

/* ===== DATABASE CONNECT ===== */
dbcon();
app.use("/api/auth",authRouters);
/* ===== SENDGRID SETUP ===== */
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn("⚠️ SendGrid API key missing");
}

/* ===== TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ===== CV DOWNLOAD ===== */
app.get("/download-cv", (req, res) => {
  const filePath = path.join(__dirname, "files", "Tulsi_CV.pdf");
  res.download(filePath);
});

/* ===== CONTACT FORM ===== */
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Missing name, email, or message",
    });
  }

  if (!process.env.SENDGRID_API_KEY) {
    return res.status(500).json({
      success: false,
      message: "Email service not configured",
    });
  }

  try {
    const msg = {
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL_FROM, // must be verified in SendGrid
      replyTo: email,
      subject: "New Portfolio Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await sgMail.send(msg);

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error);
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
});


/* ===== START SERVER ===== */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
