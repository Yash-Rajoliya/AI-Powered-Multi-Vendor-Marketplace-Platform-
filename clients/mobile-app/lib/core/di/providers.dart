import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../storage/secure_storage.dart';
import '../network/api_client.dart';

final storageProvider = Provider((ref) => SecureStorage());

final apiClientProvider = Provider((ref) {
  return ApiClient(ref.read(storageProvider));
});