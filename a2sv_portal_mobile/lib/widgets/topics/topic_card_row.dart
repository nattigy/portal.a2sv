import 'package:a2sv_portal_mobile/utils/colors.dart';
import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:a2sv_portal_mobile/widgets/cards/shadow_card.dart';
import 'package:flutter/material.dart';

import '../percentage_indicator.dart';

class TopicCardRow extends StatelessWidget {
  final String title;
  final String time;
  final int numOfProblems;
  final double progressValue;
  final double percent;
  final Image image;

  const TopicCardRow({
    Key? key,
    required this.title,
    required this.time,
    required this.numOfProblems,
    required this.progressValue,
    required this.percent,
    required this.image,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final screenWidth = MediaQuery.of(context).size.width;

    return Row(
      children: [
        Container(
          height: 50,
          width: 50,
          padding: EdgeInsets.symmetric(horizontal: screenWidth * 0.01),
          child: image,
        ),
        SizedBox(width: screenWidth * 0.01),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                    fontSize: 16, fontWeight: FontWeight.w500),
              ),
              SizedBox(height: screenHeight * 0.005),
              Text(
                'last updated: $time',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: CustomColors.lightTextColor,
                ),
              ),
              SizedBox(height: screenHeight * 0.01),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '$numOfProblems problems',
                    style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: CustomColors.darkerTextColor),
                  ),
                  Text(
                    '$percent %',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: CustomColors.darkerTextColor,
                    ),
                  ),
                ],
              ),
              SizedBox(height: screenHeight * 0.005),
              PercentageIndicator(percent: percent, width: 200),
            ],
          ),
        )
      ],
    );
  }
}
