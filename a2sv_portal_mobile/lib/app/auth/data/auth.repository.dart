import 'dart:async';

import '../../users/data/users.repository.dart';
import '../../users/entity/users.entity.dart';
import '../dto/login.input.dart';

enum AuthenticationStatus { unknown, authenticated, unauthenticated, firstUse }

class AuthenticationRepository {
  final _controller = StreamController<AuthenticationStatus>();
  final UserRepository userRepository;

  AuthenticationRepository({required this.userRepository});

  Stream<AuthenticationStatus> get status async* {
    bool token = await userRepository.hasToken();
    if (token) {
      yield AuthenticationStatus.authenticated;
    } else {
      bool onBoardScreenViewed =
          await userRepository.checkOnboardScreenViewed();
      if (onBoardScreenViewed) {
        yield AuthenticationStatus.unauthenticated;
      } else {
        yield AuthenticationStatus.firstUse;
      }
    }
    yield* _controller.stream;
  }

  Future<void> registerFirstTry() async {
    _controller.add(AuthenticationStatus.unauthenticated);
    await userRepository.setOnboardScreenToViewed();
  }

  Future<void> logIn({
    required String username,
    required String password,
  }) async {
    LoginInput loginInput =
        LoginInput(phoneNumber: username, password: password);
    User? user = await userRepository.login(loginInput);
    if (user != null) {
      _controller.add(AuthenticationStatus.authenticated);
    }
  }

  Future<User?> getUser() async {
    return await userRepository.getLocalUser();
  }

  void logOut() {
    _controller.add(AuthenticationStatus.unauthenticated);
    userRepository.logout();
  }

  void dispose() => _controller.close();
}
