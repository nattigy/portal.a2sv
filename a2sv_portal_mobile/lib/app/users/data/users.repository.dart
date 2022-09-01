import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:graphql/client.dart';

import '../../auth/data/graphql/login.gql.dart';
import '../../auth/dto/login.input.dart';
import '../entity/users.entity.dart';
import 'graphql/get_user.gql.dart';

class UserRepository {
  final GraphQLClient client;
  final FlutterSecureStorage storage;

  UserRepository({required this.storage, required this.client});

  Future<User> getUser() async {
    final result = await client.query(
      QueryOptions(
        document: gql(GET_USER),
        fetchPolicy: FetchPolicy.noCache,
      ),
    );
    if (result.hasException) {
      throw Exception(result.exception);
    }
    final data = result.data?['getUser'];
    return User.fromJson(data);
  }

  Future<User?> login(LoginInput loginInput) async {
    final QueryOptions options = QueryOptions(
      document: gql(LOGIN),
      variables: <String, dynamic>{
        "loginInput": {
          'phoneNumber': loginInput.phoneNumber,
          'password': loginInput.password,
        }
      },
    );
    final QueryResult result = await client.query(options);
    if (result.hasException) {
      throw Exception(result.exception);
    }
    await persistToken(result.data?['login']['access_token']);
    User user = User.fromJson(result.data?['login']['user']);
    await persistUser(user);
    return user;
  }

  Future<void> persistToken(String token) async {
    await storage.write(key: "jwt", value: token);
  }

  Future<void> persistUser(User user) async {
    await storage.write(key: "user", value: jsonEncode(user.toJson()));
  }

  Future<User?> getLocalUser() async {
    String? user = await storage.read(key: "user");
    if (user != null) {
      return User.fromJson(jsonDecode(user));
    }
    return null;
  }

  Future<bool> hasToken() async {
    var jwt = await storage.read(key: "jwt");
    if (jwt == null) return false;
    return true;
  }

  Future<void> logout() async {
    await storage.delete(key: "jwt");
    await storage.delete(key: "user");
  }

  Future<bool> checkOnboardScreenViewed() async {
    var checkOnboardViewed = await storage.read(key: "onboardViewed");
    return checkOnboardViewed != null;
  }

  Future<bool> setOnboardScreenToViewed() async {
    await storage.write(key: "onboardViewed", value: "seen");
    return true;
  }
}
