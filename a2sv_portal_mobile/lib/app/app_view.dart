import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../utils/custom_colors.dart';
import '../utils/router_generator.dart';
import 'auth/bloc/auth/auth.bloc.dart';
import 'auth/data/auth.repository.dart';
import 'auth/screens/login.page.dart';
import 'onboarding/screens/onboard_screen.dart';
import 'root/root.page.dart';

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
      theme: ThemeData(
          fontFamily: "Urbanist Regular",
        scaffoldBackgroundColor: CustomColors.scaffoldBackGroundColor,
      ),
      builder: (context, child) {
        //  return PlatformsPage();
        //  return TopicDetailsPage();
        // return SingleUser();
        // return OnBoardingPage();
        return BlocListener<AuthenticationBloc, AuthenticationState>(
          listener: (context, state) {
            switch (state.status) {
              case AuthenticationStatus.authenticated:
                _navigator.pushAndRemoveUntil<void>(
                  RootPage.route(),
                  (route) => false,
                );
                break;
              case AuthenticationStatus.unauthenticated:
                _navigator.pushAndRemoveUntil<void>(
                  LoginPage.route(),
                  (route) => false,
                );
                break;
              case AuthenticationStatus.firstUse:
                _navigator.pushAndRemoveUntil<void>(
                  OnBoardingPage.route(),
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
