const nodemailer = require('nodemailer');
const getTemplate = require('./emailTemplate');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = ({ to, idSesion, token, producto, valor }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Purchase ${producto}`,
    html: getTemplate(token, idSesion, valor)
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  })
}

module.exports = sendEmail;
