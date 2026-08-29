function success(res,data,message="Success"){

return res.json({

success:true,
message,
data

});

}

function failure(res,message,status=400){

return res.status(status).json({

success:false,
message

});

}

module.exports = {
success,
failure
};