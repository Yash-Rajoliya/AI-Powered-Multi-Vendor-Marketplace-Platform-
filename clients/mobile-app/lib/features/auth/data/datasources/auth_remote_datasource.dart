import '../../../../core/network/api_client.dart';
import '../../../../core/network/endpoints.dart';
import '../models/auth_user.dart';

class AuthRemoteDataSource {
  final ApiClient api;

  AuthRemoteDataSource(this.api);

  Future<AuthUser> login(String email, String password) async {
    final res = await api.dio.post(
      Endpoints.login,
      data: {
        "email": email,
        "password": password,
      },
    );

    return AuthUser.fromJson(res.data['data']);
  }

  Future<AuthUser> register(String email, String password) async {
    final res = await api.dio.post(
      Endpoints.register,
      data: {
        "email": email,
        "password": password,
      },
    );

    return AuthUser.fromJson(res.data['data']);
  }

  Future<void> logout() async {
    await api.dio.post("/auth/logout");
  }
}