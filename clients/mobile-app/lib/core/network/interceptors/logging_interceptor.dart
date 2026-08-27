import 'dart:math';
import 'package:dio/dio.dart';

class LoggingInterceptor extends Interceptor {
  String _generateRequestId() {
    return Random().nextInt(999999).toString();
  }

  @override
  void onRequest(
      RequestOptions options, RequestInterceptorHandler handler) {
    final requestId = _generateRequestId();

    options.headers['X-Request-ID'] = requestId;

    print(
        "[$requestId] → ${options.method} ${options.baseUrl}${options.path}");

    handler.next(options);
  }

  @override
  void onResponse(
      Response response, ResponseInterceptorHandler handler) {
    print(
        "← ${response.statusCode} ${response.requestOptions.path}");

    handler.next(response);
  }

  @override
  void onError(
      DioException err, ErrorInterceptorHandler handler) {
    print("ERR → ${err.message}");
    handler.next(err);
  }
}