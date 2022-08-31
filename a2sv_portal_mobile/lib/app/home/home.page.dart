import 'package:a2sv_portal_mobile/app/contest_tab/contest_tabs.dart';
import 'package:a2sv_portal_mobile/app/topics_tab/topics_tab.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../auth/bloc/auth/auth.bloc.dart';
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
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(20)),
          boxShadow: [
            BoxShadow(
                color: Colors.black12,
                spreadRadius: 0,
                blurRadius: 6,
                offset: Offset(1, 2)),
          ],
        ),
        child: ClipRRect(
          borderRadius: const BorderRadius.all(Radius.circular(15)),
          child: BottomNavigationBar(
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
        ),
      ),
    );
  }
}
