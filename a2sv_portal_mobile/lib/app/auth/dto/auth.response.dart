import '../../users/entity/users.entity.dart';

class AuthResponse {
  final String accessToken;
  final User user;

  AuthResponse({required this.accessToken, required this.user});

  factory AuthResponse.fromJson(Map<String, dynamic> data) {
    return AuthResponse(
      accessToken: data['access_token'],
      user: User.fromJson(data['user'])
    );
  }
}
