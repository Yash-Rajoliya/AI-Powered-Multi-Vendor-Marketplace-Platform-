import 'package:dio/dio.dart';

class RetryInterceptor extends Interceptor {
  final Dio dio;
  final int maxRetries;
  final Duration initialDelay;

  RetryInterceptor(
    this.dio, {
    this.maxRetries = 3,
    this.initialDelay = const Duration(milliseconds: 800),
  });

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    final extra = Map<String, dynamic>.from(err.requestOptions.extra);
    final retryCount = (extra['retry_count'] as int?) ?? 0;

    if (_shouldRetry(err) && retryCount < maxRetries) {
      extra['retry_count'] = retryCount + 1;
      err.requestOptions.extra = extra;

      final delay = initialDelay * (1 << retryCount);
      await Future.delayed(delay);

      try {
        final response = await dio.fetch(err.requestOptions);
        return handler.resolve(response);
      } on DioException catch (retryErr) {
        return handler.next(retryErr);
      } catch (e) {
        return handler.next(err);
      }
    }

    return handler.next(err);
  }

  bool _shouldRetry(DioException err) {
    return err.type == DioExceptionType.connectionError ||
        err.type == DioExceptionType.connectionTimeout ||
        err.type == DioExceptionType.sendTimeout ||
        err.type == DioExceptionType.receiveTimeout;
  }
}