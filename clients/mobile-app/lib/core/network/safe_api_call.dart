import '../errors/error_mapper.dart';
import '../errors/app_exception.dart';

Future<T> safeApiCall<T>(Future<T> Function() request) async {
  try {
    return await request();
  } catch (e) {
    throw ErrorMapper.map(e);
  }
}