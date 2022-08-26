import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

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
    final AuthenticationRepository authenticationRepository = AuthenticationRepository(userRepository: widget.userRepository);

    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider.value(value: authenticationRepository),
      ],
      child: MultiBlocProvider(
        providers: [
          BlocProvider<AuthenticationBloc>(
            create: (context) => AuthenticationBloc(
              authenticationRepository: authenticationRepository
            ),
            lazy: false,
          ),
        ],
        child: const AppView(),
      ),
    );
  }
}
