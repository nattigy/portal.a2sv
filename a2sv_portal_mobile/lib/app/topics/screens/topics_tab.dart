import 'package:a2sv_portal_mobile/app/topics/screens/topics_page.dart';
import 'package:a2sv_portal_mobile/app/topics/widgets/topic_info_card.dart';
import 'package:a2sv_portal_mobile/widgets/cards/margin_container.dart';
import 'package:flutter/material.dart';

class TopicsTab extends StatelessWidget {
  const TopicsTab({Key? key, required this.navigationCtx}) : super(key: key);

  final BuildContext navigationCtx;

  @override
  Widget build(BuildContext context) {
    return TopicsPage();

    Scaffold(
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
