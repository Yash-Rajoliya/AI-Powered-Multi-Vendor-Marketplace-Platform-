module.exports = {
  AUTH: process.env.AUTH_SERVICE_URL || "http://localhost:4001",
  PRODUCT: process.env.PRODUCT_SERVICE_URL || "http://localhost:4002",
  ORDER: process.env.ORDER_SERVICE_URL || "http://localhost:4003",
  VENDOR: process.env.VENDOR_SERVICE_URL || "http://localhost:4004",
  INVENTORY: process.env.INVENTORY_SERVICE_URL || "http://localhost:4005",
  RECOMMENDATION: process.env.RECOMMENDATION_SERVICE_URL || "http://localhost:4006",
  NOTIFICATION: process.env.NOTIFICATION_SERVICE_URL || "http://localhost:4007",

  // Proxy network timeout settings (in milliseconds)
  TIMEOUT: parseInt(process.env.PROXY_TIMEOUT, 10) || 10000,
};