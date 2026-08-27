class AuthUser {
  final String id;
  final String email;
  final String token;

  AuthUser({
    required this.id,
    required this.email,
    required this.token,
  });

  factory AuthUser.fromJson(Map<String, dynamic> json) {
    return AuthUser(
      id: json['_id'],
      email: json['email'],
      token: json['token'],
    );
  }
}