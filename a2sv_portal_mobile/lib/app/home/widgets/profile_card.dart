import 'package:a2sv_portal_mobile/constants/app_images.dart';
import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:flutter/material.dart';

class ProfileCard extends StatelessWidget {
  const ProfileCard({
    Key? key,
    required this.firstName,
    required this.lastName,
  }) : super(key: key);

  final String firstName;
  final String lastName;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 20),
            Text(
              "Welcome",
              style: TextStyle(
                fontWeight: FontWeight.w600,
                color: CustomColors.veryLightTextColor,
              ),
            ),
            Text(
              "$firstName",
              style: TextStyle(fontWeight: FontWeight.w600, fontSize: 24),
            ),
          ],
        ),
        GestureDetector(
          onTap: () {
            Navigator.pushNamed(context, "profile");
          },
          child: CircleAvatar(foregroundImage: AssetImage(userImg)),
        ),
      ],
    );
  }
}
