import 'package:flutter/material.dart';

import '../app/auth/screens/login.page.dart';
import '../app/onboarding/screens/onboard_screen.dart';
import '../app/root/splash.page.dart';
import '../constants/app_routes.dart';

class RouterGenerator {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case AppRoutes.splashRoute:
        return PageRouteBuilder(
            pageBuilder: (context, animation1, animation2) =>
                const SplashPage(),
            transitionDuration: const Duration(seconds: 5));

      case AppRoutes.onboardingRoute:
        return MaterialPageRoute(builder: (context) => OnBoardingPage());

      case AppRoutes.loginRoute:
        return PageRouteBuilder(
            pageBuilder: (context, animation1, animation2) => const LoginPage(),
            transitionDuration: const Duration(seconds: 0));

      default:
        return _errorRoute();
    }
  }

  static Route<dynamic> _errorRoute() {
    return MaterialPageRoute(
      builder: (_) {
        return const Scaffold(body: Center(child: Text('ERROR')));
      },
    );
  }
}
