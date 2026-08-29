const { createProxyMiddleware } = require("http-proxy-middleware");

const services = require("../config/services.config");
const authMiddleware = require("../middleware/auth.middleware");

module.exports = function(app){

  app.use("/api/auth",
    createProxyMiddleware({
      target: services.AUTH,
      changeOrigin: true
    })
  );

  app.use("/api/products",
    createProxyMiddleware({
      target: services.PRODUCT,
      changeOrigin: true
    })
  );

  app.use("/api/vendors",
    createProxyMiddleware({
      target: services.VENDOR,
      changeOrigin: true
    })
  );

  app.use("/api/orders",
    authMiddleware,
    createProxyMiddleware({
      target: services.ORDER,
      changeOrigin: true
    })
  );

  app.use("/api/inventory",
    createProxyMiddleware({
      target: services.INVENTORY,
      changeOrigin: true
    })
  );

  app.use("/api/recommendations",
    createProxyMiddleware({
      target: services.RECOMMENDATION,
      changeOrigin: true
    })
  );

  app.use("/api/notifications",
    createProxyMiddleware({
      target: services.NOTIFICATION,
      changeOrigin: true
    })
  );

};