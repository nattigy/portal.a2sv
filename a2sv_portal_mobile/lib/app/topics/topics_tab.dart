import 'package:a2sv_portal_mobile/widgets/cards/margin_container.dart';
import 'package:flutter/material.dart';

import 'widgets/topic_info_card.dart';

class TopicsTab extends StatelessWidget {
  const TopicsTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            MarginContainer(child: TopicInfoCard()),
          ],
        ),
      ),
    );
  }
}
