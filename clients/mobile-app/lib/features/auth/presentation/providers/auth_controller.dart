import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/di/providers.dart';
import '../../data/auth_repository.dart';
import '../../data/datasources/auth_remote_datasource.dart';
import '../../data/models/auth_user.dart';

final authControllerProvider =
    AsyncNotifierProvider<AuthController, AuthUser?>(
  AuthController.new,
);

class AuthController extends AsyncNotifier<AuthUser?> {
  late final AuthRepository _repo;

  @override
  Future<AuthUser?> build() async {
    final api = ref.read(apiClientProvider);
    final storage = ref.read(storageProvider);

    _repo = AuthRepository(
      AuthRemoteDataSource(api),
      storage,
    );

    return null;
  }

  Future<void> login(String email, String password) async {
    state = const AsyncLoading();

    state = await AsyncValue.guard(() async {
      return await _repo.login(email, password);
    });
  }

  Future<void> logout() async {
    await _repo.logout();
    state = const AsyncData(null);
  }
}