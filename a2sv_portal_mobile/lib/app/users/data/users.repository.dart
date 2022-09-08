import 'dart:convert';

import 'package:a2sv_portal_mobile/app/auth/dto/login.input.dart';
import 'package:a2sv_portal_mobile/app/users/data/graphql/get_user.gql.dart';
import 'package:a2sv_portal_mobile/app/users/data/graphql/login.gql.dart';
import 'package:a2sv_portal_mobile/app/users/entity/users.entity.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:graphql/client.dart';

class UserRepository {
  final GraphQLClient client;
  final FlutterSecureStorage storage;

  UserRepository({required this.storage, required this.client});

  Future<User> getUser(int id) async {
    final result = await client.query(
      QueryOptions(
        document: gql(GET_USER),
        variables: {
          "userId": 1,
        },
        fetchPolicy: FetchPolicy.noCache,
      ),
    );
    if (result.hasException) {
      print(result.exception);
      throw Exception(result.exception);
    }
    final data = result.data?['getMe']['userProfile'];
    User user = User.fromJson(data);
    await persistUser(user);
    return user;
  }

  Future<User?> login(LoginInput loginInput) async {
    final QueryOptions options = QueryOptions(
      document: gql(LOGIN),
      variables: <String, dynamic>{
        "loginInput": {
          'email': loginInput.email,
          'password': loginInput.password,
        }
      },
    );
    final QueryResult result = await client.query(options);
    if (result.hasException) {
      throw Exception(result.exception);
    }
    // User user = User.fromJson(result.data?['login']['userId']);

    await persistToken(result.data?['login']['accessToken']);

    User user = await getUser(result.data?['login']['userId']);

    // await persistUser(user);
    // const user = User(
    //   email: "abe@gmail.com",
    //   firstName: "Abe",
    //   id: "001",
    //   lastName: "Kebe",
    //   middleName: "beke",
    //   password: "123561",
    //   phoneNumber: "11212",
    // );
    // await persistUser(user);
    return user;
  }

  Future<void> persistToken(String token) async {
    try{
      await storage.write(key: "jwt", value: token);
    } catch(e){
      throw Exception(e);
    }
  }

  Future<void> persistUser(User user) async {
    try{
      await storage.write(key: "user", value: jsonEncode(user.toJson()));
    } catch(e){
      throw Exception(e);
    }
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
