class AppError extends Error {

  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }

}

class NotFoundError extends AppError {

  constructor(message = "Resource not found") {
    super(message, 404);
  }

}

class ValidationError extends AppError {

  constructor(message = "Validation failed") {
    super(message, 400);
  }

}

module.exports = {
  AppError,
  NotFoundError,
  ValidationError
};