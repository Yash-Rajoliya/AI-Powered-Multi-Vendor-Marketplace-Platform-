const twilio = require("twilio");
const logger = require("../utils/logger");

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

class SMSService {

  async sendSMS(to, message) {

    try {

      const result = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE,
        to
      });

      logger.info("SMS sent successfully");

      return result;

    } catch (error) {

      logger.error("SMS sending failed", error);
      throw error;

    }

  }

}

module.exports = new SMSService();