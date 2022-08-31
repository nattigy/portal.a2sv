import 'package:flutter/material.dart';

import '../../../widgets/cards/shadow_card.dart';
import '../../../widgets/text_views/reminder_text_view.dart';
import 'questions_ratio.dart';

class ProblemsStatCard extends StatelessWidget {
  const ProblemsStatCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ShadowCard(
      child: Column(
        children: [
          // ReminderTextView(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Problems Solved",),
                  Text("129", style: TextStyle(fontWeight: FontWeight.w800, fontSize: 24),),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Row(
                    children: [
                      Text("201 total submissions"),
                      SizedBox(width: 5),
                      SizedBox(
                        width: 10,
                        height: 10,
                        child: Container(
                          decoration: BoxDecoration(
                            color: Colors.orange,
                            borderRadius: BorderRadius.all(Radius.circular(10))
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 5),
                  Row(
                    children: [
                      Text("1,293 minutes dedicated"),
                      SizedBox(width: 5),
                      SizedBox(
                        width: 10,
                        height: 10,
                        child: Container(
                          decoration: BoxDecoration(
                              color: Colors.green,
                              borderRadius: BorderRadius.all(Radius.circular(10))
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 5),
                  Row(
                    children: [
                      Text("72 wrong submissions"),
                      SizedBox(width: 5),
                      SizedBox(
                        width: 10,
                        height: 10,
                        child: Container(
                          decoration: BoxDecoration(
                              color: Colors.red,
                              borderRadius: BorderRadius.all(Radius.circular(10))
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              )
            ],
          ),
          SizedBox(height: 12),
          QuestionsRatio(),
        ],
      ),
    );
  }
}
