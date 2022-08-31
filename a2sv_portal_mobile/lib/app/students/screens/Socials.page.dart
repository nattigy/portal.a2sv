import 'package:a2sv_portal_mobile/app/students/screens/socials_form.dart';
import 'package:flutter/material.dart';


class SocialsPage extends StatelessWidget {
  const SocialsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(title: const Text('Platform account')),
      body: Column(
        children: const [
          SizedBox(
            height: 130,
            child: Align(
              alignment: Alignment.center,
              child: Text("Progress bar goes here"),
            ),
          ),
           Expanded(child: SocialsForm()),
        ],
      ),
    );
  }
}
