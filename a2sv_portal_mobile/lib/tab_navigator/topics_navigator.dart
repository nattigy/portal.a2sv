import 'package:flutter/material.dart';

import '../app/topics/topics_tab.dart';
import 'tab_navigator.dart';

class TopicsNavigatorRoutes {
  static const String root = "/";
}

class TopicsNavigator extends TabNavigator {
  final GlobalKey<NavigatorState> navigatorKey;
  final BuildContext globalNavigator;

  const TopicsNavigator({Key? key, required this.navigatorKey, required this.globalNavigator}) : super(key: key);

  Map<String, WidgetBuilder> _routeBuilder(BuildContext context) {
    return {
      TopicsNavigatorRoutes.root: (ctx) => TopicsTab(navigationCtx: navigatorKey.currentContext!),
    };
  }

  @override
  Widget build(BuildContext context) {
    final routeBuilders = _routeBuilder(context);
    return Navigator(
      key: navigatorKey,
      initialRoute: TopicsNavigatorRoutes.root,
      onGenerateRoute: (routeSettings) {
        return MaterialPageRoute(
          builder: (ctx) => routeBuilders[routeSettings.name]!(ctx),
        );
      },
    );
  }
}