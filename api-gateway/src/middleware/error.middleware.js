function errorMiddleware(err, req, res, next){

  res.status(err.status || 500).json({
    success:false,
    message: err.message || "Gateway Error"
  });

}

module.exports = errorMiddleware;