import 'package:a2sv_portal_mobile/widgets/cards/shadow_card.dart';
import 'package:a2sv_portal_mobile/widgets/text_views/card_title_text.dart';
import 'package:flutter/material.dart';

import '../../../widgets/text_views/card_content_text.dart';

class GroupInfoCard extends StatelessWidget {
  const GroupInfoCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ShadowCard(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CardTitleText(text: "Group 32"),
                SizedBox(height: 8),
                CardContentText(text: "Addis Ababa Institute of Technology"),
                SizedBox(height: 5),
                CardContentText(text: "Ethiopia"),
                SizedBox(height: 5),
                CardContentText(text: "123 members"),
                SizedBox(height: 5),
                CardContentText(text: "created at 21-02-2022"),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Container(
                padding: EdgeInsets.all(20),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.all(Radius.circular(10)),
                  color: Colors.lightBlueAccent.withOpacity(0.1),
                ),
                child: CardTitleText(text: "G-32"),
              ),
              SizedBox(height: 30),
              Row(
                children: [
                  Text(
                    "Contest Ranking",
                    style: TextStyle(color: Color(0xFF3B6A8B)),
                  ),
                  SizedBox(width: 8),
                  Text(
                    "1st",
                    style: TextStyle(
                      color: Color(0xFF3B6A8B),
                      fontWeight: FontWeight.w600,
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 8),
              Row(
                children: [
                  Text(
                    "Problem Ranking",
                    style: TextStyle(color: Color(0xFF3B6A8B)),
                  ),
                  SizedBox(width: 8),
                  Text(
                    "1st",
                    style: TextStyle(
                      color: Color(0xFF3B6A8B),
                      fontWeight: FontWeight.w600,
                      fontSize: 16,
                    ),
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
