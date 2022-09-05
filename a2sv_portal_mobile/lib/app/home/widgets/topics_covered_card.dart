import 'package:a2sv_portal_mobile/constants/app_images.dart';
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
              image: Image.asset(codeForcesImg),
              numOfProblems: 5,
              percent: 50,
              progressValue: 10,
              time: "20",
              title: "titlle",
            ),
            SizedBox(height: 18),
            TopicCardRow(
              image: Image.asset(codeForcesImg),
              numOfProblems: 5,
              percent: 75,
              progressValue: 10,
              time: "20",
              title: "Titlle",
            ),
            SizedBox(height: 18),
            TopicCardRow(
              image: Image.asset(codeForcesImg),
              numOfProblems: 5,
              percent: 10,
              progressValue: 10,
              time: "20",
              title: "Titlle",
            ),
            SizedBox(height: 18),
            TopicCardRow(
              image: Image.asset(codeForcesImg),
              numOfProblems: 5,
              percent: 10,
              progressValue: 10,
              time: "20",
              title: "Titlle",
            ),
          ],
        ),
      ),
    );
  }
}
