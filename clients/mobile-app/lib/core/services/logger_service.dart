import 'dart:developer';

class LoggerService {
  void log(String message, {Object? error}) {
    log(message, error: error);
  }
}