import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'app/app.dart';
import 'app/users/data/users.repository.dart';
import 'config/gql.client.dart';
import 'config/local_storage.dart';

Future<void> main() async {
  await initHiveForFlutter();

  UserRepository userRepository =
      UserRepository(client: Client().connect, storage: LocalStorage().storage);

  runApp(App(userRepository: userRepository));
}
