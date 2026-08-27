import '../../../../core/network/safe_api_call.dart';
import '../datasources/auth_remote_datasource.dart';
import '../models/auth_user.dart';

class AuthRepository {
  final AuthRemoteDataSource remote;

  AuthRepository(this.remote);

  Future<AuthUser> login(String email, String password) async {
    return safeApiCall(() => remote.login(email, password));
  }

  Future<AuthUser> register(String email, String password) async {
    return safeApiCall(() => remote.register(email, password));
  }

  Future<void> logout() async {
    return safeApiCall(() => remote.logout());
  }
}