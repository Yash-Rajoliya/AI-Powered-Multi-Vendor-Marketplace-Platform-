const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

function authenticate(req,res,next){

const header = req.headers.authorization;

if(!header){
return res.status(401).json({
success:false,
message:"Authorization header missing"
});
}

const token = header.split(" ")[1];

try{

const decoded = jwt.verify(
token,
process.env.JWT_SECRET
);

req.user = decoded;

next();

}catch(err){

logger.error("JWT verification failed",err);

return res.status(401).json({
success:false,
message:"Invalid token"
});

}

}

module.exports = { authenticate };