import 'package:a2sv_portal_mobile/app/auth/bloc/auth/auth.bloc.dart';
import 'package:a2sv_portal_mobile/app/auth/data/auth.repository.dart';
import 'package:a2sv_portal_mobile/app/auth/screens/login.page.dart';
import 'package:a2sv_portal_mobile/app/onboarding/screens/onboard_screen.dart';
import 'package:a2sv_portal_mobile/app/root/root.page.dart';
import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:a2sv_portal_mobile/utils/no_scroll_effect.dart';
import 'package:a2sv_portal_mobile/utils/router_generator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

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
        fontFamily: "Poppins",
        scaffoldBackgroundColor: CustomColors.scaffoldBackGroundColor,
      ),
      builder: (context, child) {
        return ScrollConfiguration(
          behavior: NoScrollEffect(),
          child: BlocListener<AuthenticationBloc, AuthenticationState>(
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
          ),
        );
      },
      initialRoute: 'splash',
      onGenerateRoute: RouterGenerator.generateRoute,
    );
  }
}
