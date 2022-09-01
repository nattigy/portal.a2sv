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
            Text("Welcome"),
            Text("Jon Doe", style: TextStyle(fontWeight: FontWeight.w800, fontSize: 24),),
          ],
        ),
        CircleAvatar(),
      ],
    );
  }
}
