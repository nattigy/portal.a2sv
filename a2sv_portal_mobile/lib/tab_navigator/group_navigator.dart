import 'package:flutter/material.dart';

import '../app/groups/group_tab.dart';
import 'tab_navigator.dart';

class GroupNavigatorRoutes {
  static const String root = "/";
}

class GroupNavigator extends TabNavigator {
  final GlobalKey<NavigatorState> navigatorKey;
  final BuildContext globalNavigator;

  const GroupNavigator({Key? key, required this.navigatorKey, required this.globalNavigator}) : super(key: key);

  Map<String, WidgetBuilder> _routeBuilder(BuildContext context) {
    return {
      GroupNavigatorRoutes.root: (ctx) => GroupTab(),
    };
  }

  @override
  Widget build(BuildContext context) {
    final routeBuilders = _routeBuilder(context);
    return Navigator(
      key: navigatorKey,
      initialRoute: GroupNavigatorRoutes.root,
      onGenerateRoute: (routeSettings) {
        return MaterialPageRoute(
          builder: (ctx) => routeBuilders[routeSettings.name]!(ctx),
        );
      },
    );
  }
}