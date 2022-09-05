import 'package:a2sv_portal_mobile/app/topics/screens/topic_details_page.dart';
import 'package:flutter/material.dart';

import '../app/topics/screens/topics_tab.dart';
import 'tab_navigator.dart';

class TopicsNavigatorRoutes {
  static const String root = "/";
  static const String topicDetail = "topicDetail";
}

class TopicsNavigator extends TabNavigator {
  final GlobalKey<NavigatorState> navigatorKey;
  final BuildContext globalNavigator;

  const TopicsNavigator(
      {Key? key, required this.navigatorKey, required this.globalNavigator})
      : super(key: key);

  Map<String, WidgetBuilder> _routeBuilder(BuildContext context) {
    return {
      TopicsNavigatorRoutes.root: (ctx) =>
          TopicsTab(navigationCtx: navigatorKey.currentContext!),
      TopicsNavigatorRoutes.topicDetail: (ctx) => TopicDetailsPage(),
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
