import 'package:flutter/material.dart';

import '../../utils/custom_colors.dart';

class ReminderTextView extends StatelessWidget {
  const ReminderTextView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
          color: CustomColors.primaryLightColor,
          borderRadius: BorderRadius.all(Radius.circular(10))),
      child: Text(
        "Topological sorting - Upcoming lecture",
        style: TextStyle(
          color: CustomColors.primaryColor,
          fontWeight: FontWeight.w600,
          fontSize: 16,
        ),
      ),
    );
  }
}
