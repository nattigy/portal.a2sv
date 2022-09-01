import 'package:a2sv_portal_mobile/app/contest_tab/contest_tabs.dart';
import 'package:a2sv_portal_mobile/app/topics_tab/topics_tab.dart';
import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../group_tab/group_tab.dart';
import '../home_tab/home_tab.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const HomePage());
  }

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  var _selectedIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  final _widgets = [
    const HomeTab(),
    const TopicsTab(),
    const GroupTab(),
    const ContestTab(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _widgets[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
          backgroundColor: Colors.white,
          // selectedIconTheme: IconThemeData(
          //   color: CustomColors.primaryColor,
          // ),
          selectedItemColor: CustomColors.primaryColor,
          type: BottomNavigationBarType.fixed,
          currentIndex: _selectedIndex,
          onTap: _onItemTapped,
          items: const [
            BottomNavigationBarItem(
              label: 'Home',
              icon: Icon(CupertinoIcons.home),
            ),
            BottomNavigationBarItem(
                icon: Icon(Icons.ads_click_outlined), label: 'Topics'),
            BottomNavigationBarItem(
                icon: Icon(Icons.groups_outlined), label: 'Group'),
            BottomNavigationBarItem(
                icon: Icon(Icons.content_paste_outlined), label: 'Contest'),
          ]),
    );
  }
}
