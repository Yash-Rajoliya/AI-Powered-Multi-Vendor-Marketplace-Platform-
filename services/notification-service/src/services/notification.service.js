const emailService = require("./email.service");
const smsService = require("./sms.service");
const template = require("../templates/orderConfirmation.template");

class NotificationService {

  async sendOrderConfirmation(data) {

    const emailHtml = template.generateEmail(data);

    const smsText = template.generateSMS(data);

    if (data.email) {
      await emailService.sendEmail(
        data.email,
        "Order Confirmation",
        emailHtml
      );
    }

    if (data.phone) {
      await smsService.sendSMS(
        data.phone,
        smsText
      );
    }

  }

}

module.exports = new NotificationService();