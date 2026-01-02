const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
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
