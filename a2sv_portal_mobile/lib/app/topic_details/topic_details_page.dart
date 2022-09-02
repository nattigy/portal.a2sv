import 'package:a2sv_portal_mobile/app/topic_details/widgets/questions.dart';
import 'package:a2sv_portal_mobile/app/topic_details/widgets/topic_info.dart';
import 'package:a2sv_portal_mobile/widgets/cards/margin_container.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';

class TopicDetailsPage extends StatelessWidget {
  const TopicDetailsPage({Key? key}) : super(key: key);

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