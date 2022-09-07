import 'package:a2sv_portal_mobile/constants/app_images.dart' as CustomImageUrl;
import 'package:flutter/material.dart';
import 'package:a2sv_portal_mobile/widgets/cards/shadow_card.dart';
import 'package:a2sv_portal_mobile/widgets/topics/topic_card_row.dart';

class TopicsCoveredCard extends StatelessWidget {
  const TopicsCoveredCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ShadowCard(
      child: SingleChildScrollView(
        child: Column(
          children: [
            TopicCardRow(
              image: Image.asset(CustomImageUrl.linkedListImg),
              numOfProblems: 12,
              percent: 46,
              progressValue: 10,
              time: "23 minutes ago",
              title: "Linked List",
            ),
            SizedBox(height: 18),
            TopicCardRow(
              image: Image.asset(CustomImageUrl.arrayImg),
              numOfProblems: 18,
              percent: 91,
              progressValue: 10,
              time: "14 hours ago",
              title: "Array",
            ),
            SizedBox(height: 18),
            TopicCardRow(
              image: Image.asset(CustomImageUrl.dpImg),
              numOfProblems: 4,
              percent: 23,
              progressValue: 10,
              time: "2 days ago",
              title: "Dynamic Programming",
            ),
            SizedBox(height: 18),
            TopicCardRow(
              image: Image.asset(CustomImageUrl.stackImg),
              numOfProblems: 22,
              percent: 10,
              progressValue: 10,
              time: "22 hours ago",
              title: "Stack",
            ),
          ],
        ),
      ),
    );
  }
}
