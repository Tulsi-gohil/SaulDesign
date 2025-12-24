// server.js
const express = require("express");
const cors = require("cors");
 
const sgMail = require('@sendgrid/mail');
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

/* ===== TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ===== CV DOWNLOAD ===== */
app.get("/download-cv", (req, res) => {
  const filePath = path.join(__dirname, "files", "Tulsi_CV.pdf");
  res.download(filePath);
});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form data:", name, email, message);

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing name, email, or message' });
  }

  try {
    const msg = {
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL_FROM || 'no-reply@example.com',
      replyTo: email,
      subject: "New Portfolio Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`
    };

    await sgMail.send(msg);

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error('SendGrid error:', error);
    if (error.response && error.response.body) {
      console.error(error.response.body);
    }
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
