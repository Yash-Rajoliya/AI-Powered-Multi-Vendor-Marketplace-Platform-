const { createProxyMiddleware } = require("http-proxy-middleware");
const services = require("../config/services.config");
const authMiddleware = require("../middleware/auth.middleware");

const createServiceProxy = (target) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    onError: (err, req, res) => {
      console.error(`Proxy Error [${req.method} ${req.originalUrl}]:`, err.message);
      if (!res.headersSent) {
        res.status(503).json({ error: "Service unavailable" });
      }
    },
  });

module.exports = function (app) {
  app.use("/api/auth", createServiceProxy(services.AUTH));

  app.use("/api/products", createServiceProxy(services.PRODUCT));

  app.use("/api/vendors", createServiceProxy(services.VENDOR));

  app.use(
    "/api/orders",
    authMiddleware,
    createServiceProxy(services.ORDER)
  );

  app.use("/api/inventory", createServiceProxy(services.INVENTORY));

  app.use("/api/recommendations", createServiceProxy(services.RECOMMENDATION));

  app.use("/api/notifications", createServiceProxy(services.NOTIFICATION));
};