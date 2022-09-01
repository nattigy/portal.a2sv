import 'package:a2sv_portal_mobile/app/students/screens/platforms.page.dart';
import 'package:a2sv_portal_mobile/app/users/screens/widgets/single-user.component.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../utils/router_generator.dart';
import 'auth/bloc/auth/auth.bloc.dart';
import 'auth/data/auth.repository.dart';
import 'auth/screens/login.page.dart';
import 'home/home.page.dart';
import 'onboarding/screens/onboard_screen.dart';

class AppView extends StatefulWidget {
  const AppView({super.key});

  @override
  State<AppView> createState() => _AppViewState();
}

class _AppViewState extends State<AppView> {
  final _navigatorKey = GlobalKey<NavigatorState>();

  NavigatorState get _navigator => _navigatorKey.currentState!;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      navigatorKey: _navigatorKey,
      theme: ThemeData(fontFamily: "Urbanist Regular"),
      builder: (context, child) {
       return PlatformsPage();
        return BlocListener<AuthenticationBloc, AuthenticationState>(
          listener: (context, state) {
            switch (state.status) {
              case AuthenticationStatus.authenticated:
                _navigator.pushAndRemoveUntil<void>(
                  HomePage.route(),
                  (route) => false,
                );
                break;
              case AuthenticationStatus.unauthenticated:
                _navigator.pushAndRemoveUntil<void>(
                  SingleUser.route(),
                  (route) => false,
                );
                break;
              case AuthenticationStatus.firstUse:
                _navigator.pushAndRemoveUntil<void>(
                   SingleUser.route(),
                  (route) => false,
                );
                break;
              case AuthenticationStatus.unknown:
                break;
            }
          },
          child: child,
        );
      },
      initialRoute: 'splash',
      onGenerateRoute: RouterGenerator.generateRoute,
    );
  }
}
