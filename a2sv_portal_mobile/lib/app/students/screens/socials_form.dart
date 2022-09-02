import 'package:a2sv_portal_mobile/app/students/screens/widgets/single_platform.dart';
import 'package:flutter/material.dart';

import '../../../widgets/buttons/main-button.dart';

class SocialsForm extends StatelessWidget {
  const SocialsForm({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(30.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SinglePlatform(
            fieldTitle: "Instagram handle",
            imageURL: "assets/images/insta.png",
            color: Color.fromARGB(255, 236, 228, 198),
            onChange: (val) {},
          ),
          const SizedBox(
            height: 5,
          ),
          SinglePlatform(
            fieldTitle: "Telegram handle",
            imageURL: "assets/images/telegram.png",
            color: Color.fromARGB(255, 236, 228, 198),
            onChange: (val) {},
          ),
          const SizedBox(
            height: 5,
          ),
          SinglePlatform(
            fieldTitle: "Twitter handle",
            imageURL: "assets/images/twitter.png",
            color: Color.fromARGB(255, 236, 228, 198),
            onChange: (val) {},
          ),
          const SizedBox(
            height: 5,
          ),
          SinglePlatform(
            fieldTitle: "Linkedin handle",
            imageURL: "assets/images/linkedin.png",
            color: Color.fromARGB(255, 236, 228, 198),
            onChange: (val) {},
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
