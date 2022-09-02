import 'package:flutter/material.dart';

export 'home_navigator.dart';
export 'topics_navigator.dart';
export 'group_navigator.dart';
export 'contest_navigator.dart';

abstract class TabNavigator extends StatelessWidget {
  const TabNavigator({Key? key}) : super(key: key);
}

typedef CustomWidgetBuilder = Widget Function(
  BuildContext context,
  RouteSettings routeSettings,
);
