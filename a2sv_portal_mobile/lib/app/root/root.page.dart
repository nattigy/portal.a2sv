import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../tab_navigator/tab_navigator.dart';

class RootPage extends StatefulWidget {
  const RootPage({Key? key}) : super(key: key);

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const RootPage());
  }

  @override
  State<RootPage> createState() => _RootPageState();
}

class _RootPageState extends State<RootPage> {
  TabItem _currentTab = TabItem.home;
  int touchCounter = 0;

  final tabNavigatorKeys = [
    GlobalKey<NavigatorState>(),
    GlobalKey<NavigatorState>(),
    GlobalKey<NavigatorState>(),
    GlobalKey<NavigatorState>(),
  ];

  late List<TabNavigator> tabNavigators;
  late BuildContext _globalNavigatorContext;

  @override
  void initState() {
    _globalNavigatorContext = context;
    tabNavigators = [
      HomeNavigator(
        navigatorKey: tabNavigatorKeys[TabItem.home.index],
        globalNavigator: _globalNavigatorContext,
      ),
      TopicsNavigator(
        navigatorKey: tabNavigatorKeys[TabItem.topics.index],
        globalNavigator: _globalNavigatorContext,
      ),
      GroupNavigator(
        navigatorKey: tabNavigatorKeys[TabItem.group.index],
        globalNavigator: _globalNavigatorContext,
      ),
      ContestNavigator(
        navigatorKey: tabNavigatorKeys[TabItem.contest.index],
        globalNavigator: _globalNavigatorContext,
      ),
    ];
    super.initState();
  }

  touchCounterIncrease() {
    setState(() {
      touchCounter++;
    });
  }

  touchCounterToZero() {
    setState(() {
      touchCounter = 0;
    });
  }

  setCurrentIndex(TabItem item) {
    setState(() {
      _currentTab = item;
    });
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        final mayPop =
            await tabNavigatorKeys[_currentTab.index].currentState?.maybePop();
        if (mayPop!) {
          tabNavigatorKeys[_currentTab.index].currentState?.pop();
          return false;
        } else if (!mayPop && _currentTab != TabItem.home) {
          setCurrentIndex(TabItem.home);
          return false;
        }
        return true;
      },
      child: Scaffold(
        body: IndexedStack(
          index: _currentTab.index,
          children: [
            _buildOffstageNavigator(TabItem.home, true),
            _buildOffstageNavigator(TabItem.topics, true),
            _buildOffstageNavigator(TabItem.group, false),
            _buildOffstageNavigator(TabItem.contest, true),
          ],
        ),
        bottomNavigationBar: BottomNavigationBar(
            backgroundColor: Colors.white,
            selectedItemColor: CustomColors.primaryColor,
            type: BottomNavigationBarType.fixed,
            currentIndex: _currentTab.index,
            onTap: (idx) {
              setCurrentIndex(TabItem.values[idx]);
              // touchCounterIncrease();
              // if (touchCounter > 1) {
              //   Navigator.pushNamedAndRemoveUntil(
              //       _globalNavigatorContext, "/", (route) => false);
              //   touchCounterToZero();
              // }
            },
            items: const [
              BottomNavigationBarItem(
                  label: 'Home', icon: Icon(CupertinoIcons.home)),
              BottomNavigationBarItem(
                  icon: Icon(Icons.ads_click_outlined), label: 'Topics'),
              BottomNavigationBarItem(
                  icon: Icon(Icons.groups_outlined), label: 'Group'),
              BottomNavigationBarItem(
                  icon: Icon(Icons.content_paste_outlined), label: 'Contest'),
            ]),
      ),
    );
  }

  Widget _buildOffstageNavigator(TabItem item, bool maintainState) {
    return Visibility(
      visible: _currentTab == item,
      maintainState: maintainState,
      child: tabNavigators[item.index],
    );
  }
}

enum TabItem { home, topics, group, contest }
