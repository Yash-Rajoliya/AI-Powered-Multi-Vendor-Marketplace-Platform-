import 'package:dio/dio.dart';
import '../config/env/env.dart';
import '../storage/secure_storage.dart';
import 'interceptors/auth_interceptor.dart';
import 'interceptors/logging_interceptor.dart';
import 'interceptors/retry_interceptor.dart';

class ApiClient {
  final Dio dio;

  ApiClient(SecureStorage storage)
      : dio = Dio(
          BaseOptions(
            baseUrl: AppEnv.baseUrl,
            connectTimeout: const Duration(seconds: 15),
            receiveTimeout: const Duration(seconds: 15),
            headers: {
              "Content-Type": "application/json",
            },
          ),
        ) {
    dio.interceptors.addAll([
      AuthInterceptor(storage),
      LoggingInterceptor(),
      RetryInterceptor(dio),
    ]);
  }
}

