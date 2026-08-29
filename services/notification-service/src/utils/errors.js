class AppError extends Error {

  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }

}

class ValidationError extends AppError {

  constructor(message = "Validation Error") {
    super(message, 400);
  }

}

class NotFoundError extends AppError {

  constructor(message = "Resource Not Found") {
    super(message, 404);
  }

}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError
};