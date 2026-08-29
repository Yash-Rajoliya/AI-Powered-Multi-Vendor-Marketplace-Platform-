const transporter = require("../config/mail.config");
const logger = require("../utils/logger");

class EmailService {

  async sendEmail(to, subject, html) {

    try {

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html
      };

      const result = await transporter.sendMail(mailOptions);

      logger.info("Email sent successfully");

      return result;

    } catch (error) {

      logger.error("Email sending failed", error);
      throw error;

    }

  }

}

module.exports = new EmailService();