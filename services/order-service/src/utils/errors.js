class NotFoundError extends Error{

constructor(message){
super(message);
this.statusCode = 404;
}

}

class ValidationError extends Error{

constructor(message){
super(message);
this.statusCode = 400;
}

}

class UnauthorizedError extends Error{

constructor(message){
super(message);
this.statusCode = 401;
}

}

class PaymentError extends Error{

constructor(message){
super(message);
this.statusCode = 402;
}

}

module.exports = {
NotFoundError,
ValidationError,
UnauthorizedError,
PaymentError
};