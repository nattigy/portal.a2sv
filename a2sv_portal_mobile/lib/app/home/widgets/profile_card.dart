import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:flutter/material.dart';

class ProfileCard extends StatelessWidget {
  const ProfileCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(

          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 20,),
            Text("Welcome",style: TextStyle(fontWeight:FontWeight.w600,color: CustomColors.veryLightTextColor)),
            Text(
              "Jon Doe",
              style: TextStyle(fontWeight: FontWeight.w600, fontSize: 24),
            ),
          ],
        ),
        CircleAvatar(),
      ],
    );
  }
}
