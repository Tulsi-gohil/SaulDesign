const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // MUST be false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = async ({ to, subject, html }) => {
  
    await transporter.sendMail({
      from: `"Saul Design" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
  
};

module.exports = sendEmail;
