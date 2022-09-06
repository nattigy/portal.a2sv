import 'package:a2sv_portal_mobile/app/groups/bloc/group.bloc.dart';

import 'package:a2sv_portal_mobile/app/groups/data/group_repository.dart';
import 'package:a2sv_portal_mobile/config/gql.client.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:graphql/client.dart';

import 'app_view.dart';
import 'auth/bloc/auth/auth.bloc.dart';
import 'auth/data/auth.repository.dart';
import 'users/data/users.repository.dart';

class App extends StatefulWidget {
  const App({Key? key, required this.userRepository}) : super(key: key);

  final UserRepository userRepository;
  

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    final AuthenticationRepository authenticationRepository =
        AuthenticationRepository(userRepository: widget.userRepository);
     final GroupRepository groupRepository = GroupRepository(client:Client().connect);
    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider.value(value: authenticationRepository),
        RepositoryProvider.value(value: groupRepository)
      ],
      child: MultiBlocProvider(
        providers: [
          BlocProvider<AuthenticationBloc>(
            create: (context) => AuthenticationBloc(
                authenticationRepository: authenticationRepository),
            lazy: false,
          ),
          BlocProvider<GroupBloc>(
            create: (context) => GroupBloc(
                groupRepository: groupRepository),
            lazy: false,
          ),
        ],
        child: const AppView(),
      ),
    );
  }
}
