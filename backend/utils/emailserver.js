const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,      // your email
    pass: process.env.EMAIL_PASS   // app password
  }
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Saul Design" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html
  });
};

module.exports = sendEmail;
