import 'package:a2sv_portal_mobile/app/students/screens/widgets/questions.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';

class TopicDetailsPage extends StatelessWidget {
  const TopicDetailsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Questions(),
    );
  }
}
