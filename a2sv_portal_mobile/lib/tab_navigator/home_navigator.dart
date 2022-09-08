import 'package:a2sv_portal_mobile/app/users/screens/profile.page.dart';
import 'package:flutter/material.dart';

import '../app/home/home_tab.dart';
import 'tab_navigator.dart';

class HomeNavigatorRoutes {
  static const String root = "/";
  static const String profile = "profile";
}

class HomeNavigator extends TabNavigator {
  final GlobalKey<NavigatorState> navigatorKey;
  final BuildContext globalNavigator;

  const HomeNavigator(
      {Key? key, required this.navigatorKey, required this.globalNavigator,})
      : super(key: key);

  Map<String, WidgetBuilder> _routeBuilder(BuildContext context) {
    return {
      HomeNavigatorRoutes.root: (ctx) => HomeTab(),
      HomeNavigatorRoutes.profile: (ctx) => ProfilePage(),
    };
  }

  @override
  Widget build(BuildContext context) {
    final routeBuilders = _routeBuilder(context);
    return Navigator(
      key: navigatorKey,
      initialRoute: HomeNavigatorRoutes.root,
      onGenerateRoute: (routeSettings) {
        return MaterialPageRoute(
          builder: (context) => routeBuilders[routeSettings.name]!(context),
        );
      },
    );
  }
}
