const emailService = require("./email.service");
const smsService = require("./sms.service");
const template = require("../templates/orderConfirmation.template");
const redisCache = require("../cache/redis.cache");

class NotificationService {

  async sendOrderConfirmation(data) {
    const { orderId, email, phone } = data;
    const emailHtml = template.generateEmail(data);
    const smsText = template.generateSMS(data);

    // 1. Send Email (if provided and not previously sent)
    if (email) {
      const emailKey = `notification:email:${orderId}`;
      const emailAlreadySent = await redisCache.get(emailKey);

      if (!emailAlreadySent) {
        await emailService.sendEmail(
          email,
          "Order Confirmation",
          emailHtml
        );
        // Record successful dispatch (TTL: 24 hours)
        await redisCache.set(emailKey, "SENT", 86400);
      }
    }

    // 2. Send SMS (if provided and not previously sent)
    if (phone) {
      const smsKey = `notification:sms:${orderId}`;
      const smsAlreadySent = await redisCache.get(smsKey);

      if (!smsAlreadySent) {
        await smsService.sendSMS(
          phone,
          smsText
        );
        // Record successful dispatch (TTL: 24 hours)
        await redisCache.set(smsKey, "SENT", 86400);
      }
    }
  }

}

module.exports = new NotificationService();