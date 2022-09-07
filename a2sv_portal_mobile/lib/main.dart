import 'package:a2sv_portal_mobile/app/groups/data/group_repository.dart';
import 'package:a2sv_portal_mobile/app/home/data/home.repository.dart';
import 'package:a2sv_portal_mobile/app/topics/data/season_repository.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'app/app.dart';
import 'app/users/data/users.repository.dart';
import 'config/gql.client.dart';
import 'config/local_storage.dart';

Future<void> main() async {
  await initHiveForFlutter();

  UserRepository userRepository = UserRepository(
    client: Client().connect,
    storage: LocalStorage().storage,
  );

  HomeRepository homeRepository = HomeRepository(
    storage: LocalStorage().storage,
    client: Client().connect,
  );

  final GroupRepository groupRepository = GroupRepository(
    client: Client().connect,
  );
  final SeasonRepository seasonRepository = SeasonRepository(
    client: Client().connect,
  );

  runApp(App(
    userRepository: userRepository,
    seasonRepository: seasonRepository,
    homeRepository: homeRepository,
    groupRepository: groupRepository,
  ));
}
