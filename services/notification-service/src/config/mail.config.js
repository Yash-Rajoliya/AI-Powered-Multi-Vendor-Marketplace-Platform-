const nodemailer = require("nodemailer");
const logger = require("../utils/logger");

let transporter;

function createMailTransport() {

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  transporter.verify((err) => {
    if (err) {
      logger.error("SMTP connection failed", err);
    } else {
      logger.info("SMTP mail server ready");
    }
  });

  return transporter;
}

module.exports = createMailTransport();