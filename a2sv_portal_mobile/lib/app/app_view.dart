import 'package:a2sv_portal_mobile/app/users/screens/widgets/single-user.component.dart';
import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../utils/router_generator.dart';
import 'auth/bloc/auth/auth.bloc.dart';
import 'auth/data/auth.repository.dart';
import 'home/home.page.dart';
import 'onboarding/screens/onboard_screen.dart';
import 'students/screens/stats_detail_page.dart';

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
        //   return TopicDetailsPage();
        // return StatsDetailPage();
        // return SingleUser();
        // return OnBoardingPage();
        return BlocListener<AuthenticationBloc, AuthenticationState>(
          listener: (context, state) {
            switch (state.status) {
              case AuthenticationStatus.unauthenticated:
                _navigator.pushAndRemoveUntil<void>(
                 StatsDetailPage.route(),
                  (route) => false,
                );
                // _navigator.pushAndRemoveUntil<void>(
                //   HomePage.route(),
                //   (route) => false,
                // );
                break;
              // case AuthenticationStatus.unauthenticated:
              //   _navigator.pushAndRemoveUntil<void>(
              //     LoginPage.route(),
              //     (route) => false,
              //   );
              //   break;
              case AuthenticationStatus.firstUse:
                _navigator.pushAndRemoveUntil<void>(
                  StatsDetailPage.route(),
                      (route) => false,
                );
                // _navigator.pushAndRemoveUntil<void>(
                //   OnBoardingPage.route(),
                //   (route) => false,
                // );
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
