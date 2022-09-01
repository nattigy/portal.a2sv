import 'package:a2sv_portal_mobile/app/students/screens/widgets/single_platform.dart';
import 'package:flutter/material.dart';

import '../../../widgets/buttons/main-button.dart';

class PlatformsForm extends StatelessWidget {
  const PlatformsForm({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(30.0),
      child: Column(
        children: [
          SinglePlatform(
            fieldTitle: "leetcode url",
            imageURL: "assets/images/leetcode.png",
            color: Color.fromARGB(255, 250, 236, 223),
            onChange: () {},
          ),
          const SizedBox(
            height: 5,
          ),
          SinglePlatform(
            fieldTitle: "GeeksForGeeks url",
            imageURL: "assets/images/geeks.png",
            color: Color.fromARGB(255, 250, 236, 223),
            onChange: () {},
          ),
          const SizedBox(
            height: 5,
          ),
          SinglePlatform(
            fieldTitle: "HackerRank url",
            imageURL: "assets/images/hacker.png",
            color: Color.fromARGB(255, 250, 236, 223),
            onChange: () {},
          ),
          const SizedBox(
            height: 5,
          ),
          SinglePlatform(
            fieldTitle: "CodeForces url",
            imageURL: "assets/images/codeforces.png",
            color: Color.fromARGB(255, 250, 236, 223),
            onChange: () {},
          ),
          Expanded(child: Container()),
          Align(
            alignment: Alignment.bottomCenter,
            child: MainButton(
              title: "Continue",
              onClick: () {},
              color: const Color.fromRGBO(89, 86, 233, 1),
            ),
          ),
        ],
      ),
    );
  }
}
