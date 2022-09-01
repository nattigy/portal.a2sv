import 'package:a2sv_portal_mobile/utils/colors.dart';
import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:flutter/material.dart';

class TopicCard extends StatelessWidget {
  final String title;
  final String time;
  final int numOfProblems;
  final double progressValue;
  final double perecent;
  final Image image;

  const TopicCard(
      {Key? key,
      required this.title,
      required this.time,
      required this.numOfProblems,
      required this.progressValue,
      required this.perecent,
      required this.image})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final screenWidth = MediaQuery.of(context).size.width;
    return Container(
      padding: EdgeInsets.symmetric(
          horizontal: screenWidth * 0.01, vertical: screenHeight * 0.02),
      child: Row(children: [
        Container(
            height: 50,
            width: 50,
            padding: EdgeInsets.symmetric(horizontal: screenWidth * 0.01),
            child: image),
        SizedBox(
          width: screenWidth * 0.005,
        ),
        Expanded(
            child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
            ),
            SizedBox(
              height: screenHeight * 0.005,
            ),
            Text(
              'last updated: $time',
              style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: CustomColors.lightTextColor),
            ),
            SizedBox(
              height: screenHeight * 0.01,
            ),
            Row(
              children: [
                Text(
                  '$numOfProblems problems',
                  style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: CustomColors.darkerTextColor),
                ),
                SizedBox(
                  width: screenWidth * 0.4,
                ),
                Text(
                  '$perecent  %  ',
                  style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: CustomColors.darkerTextColor),
                ),
              ],
            ),
            SizedBox(
              height: screenHeight * 0.002,
            ),
            Container(
                padding: EdgeInsets.only(right: screenWidth * 0.1),
                child: LinearProgressIndicator(
                  minHeight: 8,
                  backgroundColor: light_grey_color,
                  value: progressValue,
                  valueColor: new AlwaysStoppedAnimation<Color>(progress_color),
                ))
          ],
        ))
      ]),
    );
  }
}
