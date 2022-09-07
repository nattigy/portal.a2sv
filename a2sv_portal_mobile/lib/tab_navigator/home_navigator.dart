import 'package:flutter/material.dart';

import '../app/home/home_tab.dart';
import 'tab_navigator.dart';

class HomeNavigatorRoutes {
  static const String root = "/";
}

class HomeNavigator extends TabNavigator {
  final GlobalKey<NavigatorState> navigatorKey;
  final BuildContext globalNavigator;

  const HomeNavigator(
      {Key? key, required this.navigatorKey, required this.globalNavigator})
      : super(key: key);

  Map<String, WidgetBuilder> _routeBuilder(BuildContext context) {
    return {
      HomeNavigatorRoutes.root: (ctx) => HomeTab(
            navigationCtx: navigatorKey.currentContext!,
          ),
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
