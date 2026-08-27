import 'package:dio/dio.dart';
import 'app_exception.dart';

class ErrorMapper {
  static AppException map(dynamic error) {
    if (error is DioException) {
      final message =
          error.response?.data?['message'] ??
          error.message ??
          "Network error occurred";

      return AppException(
        message,
        code: error.response?.statusCode,
      );
    }

    return AppException("Unexpected error occurred");
  }
}