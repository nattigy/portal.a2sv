import 'package:a2sv_portal_mobile/widgets/cards/margin_container.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';

import 'widgets/questions.dart';
import 'widgets/topic_info.dart';

class TopicDetailsPage extends StatelessWidget {
  const TopicDetailsPage({Key? key}) : super(key: key);

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const TopicDetailsPage());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:  SafeArea(
        child: MarginContainer(child: Column(
          children: [
            TopicInfo(),
            Expanded(child: Questions()),
          ],
        )),
      ),
    );
  }
}