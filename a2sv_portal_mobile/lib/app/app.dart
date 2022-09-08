import 'package:a2sv_portal_mobile/app/groups/bloc/group.bloc.dart';
import 'package:a2sv_portal_mobile/app/groups/data/group_repository.dart';
import 'package:a2sv_portal_mobile/app/topics/data/problem_repository.dart';
import 'package:a2sv_portal_mobile/app/home/bloc/home.bloc.dart';
import 'package:a2sv_portal_mobile/app/topics/data/topic_detail_repository.dart';
import 'package:a2sv_portal_mobile/app/topics/problems_bloc/problems_bloc_cubit.dart';
import 'package:a2sv_portal_mobile/app/home/data/home.repository.dart';
import 'package:a2sv_portal_mobile/app/topics/data/season_repository.dart';
import 'package:a2sv_portal_mobile/app/topics/season_bloc/season.bloc.dart';
import 'package:a2sv_portal_mobile/app/topics/topic_detail_bloc/topic_detail.bloc.dart';
import 'package:a2sv_portal_mobile/config/gql.client.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'app_view.dart';
import 'auth/bloc/auth/auth.bloc.dart';
import 'auth/data/auth.repository.dart';
import 'users/data/users.repository.dart';

class App extends StatefulWidget {
  const App({
    Key? key,
    required this.userRepository,
    required this.homeRepository,
    required this.groupRepository,
    required this.seasonRepository,
  }) : super(key: key);

  final UserRepository userRepository;
  final HomeRepository homeRepository;
  final GroupRepository groupRepository;
  final SeasonRepository seasonRepository;

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    final AuthenticationRepository authenticationRepository =
        AuthenticationRepository(userRepository: widget.userRepository);
      final TopicDetailRepository topicDetailRepository = TopicDetailRepository(client:Client().connect);
     final ProblemsRepository problemsRepository = ProblemsRepository(client: Client().connect);
    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider.value(value: authenticationRepository),
        RepositoryProvider.value(value: widget.groupRepository),
        RepositoryProvider.value(value: widget.seasonRepository),
        RepositoryProvider.value(value: widget.homeRepository),
        RepositoryProvider.value(value: topicDetailRepository),
        RepositoryProvider.value(value: problemsRepository),
      ],
      child: MultiBlocProvider(
        providers: [
          BlocProvider<AuthenticationBloc>(
            create: (context) => AuthenticationBloc(
                authenticationRepository: authenticationRepository),
            lazy: false,
          ),
          BlocProvider<GroupBloc>(
            create: (context) =>
                GroupBloc(groupRepository: widget.groupRepository),
            // lazy: false,
          ),
          BlocProvider<SeasonBloc>(
            create: (context) =>
                SeasonBloc(seasonRepository: widget.seasonRepository),
            // lazy: false,
          ),
          BlocProvider<HomeBloc>(
            create: (context) => HomeBloc(
              usersRepository: widget.userRepository,
              homeRepository: widget.homeRepository,
            ),
            lazy: false,
          ),  
           BlocProvider<ProblemsBloc>(
            create: (context) => ProblemsBloc(
                problemsRepository:problemsRepository),
            // lazy: false,
          ),
           BlocProvider<TopicDetailBloc>(
            create: (context) => TopicDetailBloc(
                topicDetailRepository: topicDetailRepository),
            // lazy: false,
          ),  
        ],
        child: const AppView(),
      ),
    );
  }
}
