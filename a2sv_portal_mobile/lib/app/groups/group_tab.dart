import 'package:a2sv_portal_mobile/widgets/cards/margin_container.dart';
import 'package:flutter/material.dart';

import 'widgets/group_info_card.dart';

class GroupTab extends StatelessWidget {
  const GroupTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              MarginContainer(child: GroupInfoCard()),
            ],
          ),
        ),
      ),
    );
  }
}
