import 'package:flutter/material.dart';

import '../app/contests/contest_tabs.dart';
import 'tab_navigator.dart';

class ContestNavigatorRoutes {
  static const String root = "/";
}

class ContestNavigator extends TabNavigator {
  final GlobalKey<NavigatorState> navigatorKey;
  final BuildContext globalNavigator;

  const ContestNavigator({Key? key, required this.navigatorKey, required this.globalNavigator}) : super(key: key);

  Map<String, WidgetBuilder> _routeBuilder(BuildContext context) {
    return {
      ContestNavigatorRoutes.root: (ctx) => ContestTab(),
    };
  }

  @override
  Widget build(BuildContext context) {
    final routeBuilders = _routeBuilder(context);
    return Navigator(
      key: navigatorKey,
      initialRoute: ContestNavigatorRoutes.root,
      onGenerateRoute: (routeSettings) {
        return MaterialPageRoute(
          builder: (ctx) => routeBuilders[routeSettings.name]!(ctx),
        );
      },
    );
  }
}