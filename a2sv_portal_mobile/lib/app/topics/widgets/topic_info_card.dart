import 'package:flutter/material.dart';

import '../../../widgets/buttons/main-button.dart';
import '../../../widgets/cards/shadow_card.dart';
import '../../../widgets/text_views/card_title_text.dart';
import '../../../widgets/text_views/reminder_text_view.dart';
import '../topic_details_page.dart';

class TopicInfoCard extends StatelessWidget {
  const TopicInfoCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ShadowCard(
      child: Column(
        children: [
          ReminderTextView(),
          SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Previous study plan",
                    style: TextStyle(fontWeight: FontWeight.w400, fontSize: 16),
                  ),
                  SizedBox(height: 15),
                  CardTitleText(text: "Linked List"),
                  SizedBox(height: 8),
                  Text(
                    "12 questions",
                    style: TextStyle(
                      fontWeight: FontWeight.w200,
                      color: Colors.grey,
                    ),
                  ),
                  SizedBox(height: 8),
                  SizedBox(
                    width: 125,
                    child: MainButton(
                      title: "Open Topic",
                      onClick: () {
                        Navigator.pushAndRemoveUntil<void>(
                          context,
                          TopicDetailsPage.route(),
                              (route) => false,
                        );
                      },
                      color: Colors.indigo,
                    ),
                  )
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Icon(Icons.sticky_note_2_outlined,
                          color: Colors.orangeAccent, size: 50),
                      Text(
                        "12 MB",
                        style: TextStyle(
                            fontWeight: FontWeight.w100, color: Colors.grey),
                      ),
                    ],
                  ),
                  SizedBox(height: 10),
                  Text(
                    "Linked list lecture",
                    style: TextStyle(fontWeight: FontWeight.w400, fontSize: 18),
                  ),
                  SizedBox(height: 10),
                  Row(
                    children: [
                      Icon(Icons.open_in_new, color: Colors.indigo),
                      SizedBox(width: 5),
                      Text(
                        "Link",
                        style: TextStyle(fontSize: 16, color: Colors.indigo),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
