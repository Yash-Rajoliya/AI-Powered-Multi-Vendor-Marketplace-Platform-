import 'dart:async';
import '../errors/error_mapper.dart';
import '../errors/app_exception.dart';

Future<T> safeApiCall<T>(
  Future<T> Function() request, {
  Duration timeout = const Duration(seconds: 15),
}) async {
  try {
    return await request().timeout(
      timeout,
      onTimeout: () {
        throw TimeoutException("The request timed out. Please try again.");
      },
    );
  } catch (e) {
    if (e is AppException) {
      rethrow;
    }
    throw ErrorMapper.map(e);
  }
}