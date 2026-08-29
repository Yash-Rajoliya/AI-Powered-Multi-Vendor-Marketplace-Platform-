const logger = require("../utils/logger");

function errorMiddleware(err,req,res,next){

logger.error(err.message);

const status = err.status || 500;

res.status(status).json({

success:false,
message:err.message || "Internal Server Error"

});

}

module.exports = errorMiddleware;