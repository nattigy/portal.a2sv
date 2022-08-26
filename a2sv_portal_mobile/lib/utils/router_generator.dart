import 'package:flutter/material.dart';

import '../app/auth/screens/login.page.dart';
import '../app/home/splash.page.dart';
import '../constants/app_routes.dart';


class RouterGenerator{

  static Route<dynamic> generateRoute(RouteSettings settings) {
  switch (settings.name) {
    // case AppRoutes.welcomeRoute:
    //   return MaterialPageRoute(builder: (context) => OnboardingPage());

  case AppRoutes.splashRoute:
    return MaterialPageRoute(builder: (context) => const SplashPage());

    case AppRoutes.loginRoute:
      return PageRouteBuilder(
        pageBuilder: (context, animation1, animation2) => const LoginPage(),
        transitionDuration: const Duration(seconds: 0));
    
    default:
      return PageRouteBuilder(
        pageBuilder: (context, animation1, animation2) => const LoginPage(),
        transitionDuration: const Duration(seconds: 0));

  }

}}