import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:a2sv_portal_mobile/app/groups/model/group.dart';
import 'package:a2sv_portal_mobile/widgets/cards/shadow_card.dart';
import 'package:a2sv_portal_mobile/widgets/text_views/card_title_text.dart';
import 'package:flutter/material.dart';

import '../../../widgets/text_views/card_content_text.dart';

class GroupInfoCard extends StatelessWidget {
  final Group group;
  const GroupInfoCard({Key? key, required this.group}) : super(key: key);

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
                CardTitleText(text: group.name),
                SizedBox(height: 8),
                CardContentText(text: group.school),
                SizedBox(height: 5),
                CardContentText(text: group.createdAt.toString()),
                SizedBox(height: 5),
                CardContentText(text: group.users!.length.toString()),
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
                  color: CustomColors.blueBgColor,
                ),
                child: Text( "G-32",style: TextStyle(color:  CustomColors.blueTextColor,fontWeight: FontWeight.bold,fontSize: 16),),
              ),
              SizedBox(height: 30),
              Row(
                children: [
                  Text(
                    "Contest Ranking",
                    style: TextStyle(color: CustomColors.blueTextColor),
                  ),
                  SizedBox(width: 8),
                  Text(
                    "1st",
                    style: TextStyle(
                      color: CustomColors.blueTextColor,
                      fontWeight: FontWeight.normal,
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
                    style: TextStyle(color:CustomColors.blueTextColor),
                  ),
                  SizedBox(width: 8),
                  Text(
                    "1st",
                    style: TextStyle(
                      color: CustomColors.blueTextColor,
                      fontWeight: FontWeight.normal,
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
