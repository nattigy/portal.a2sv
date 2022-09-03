import 'package:a2sv_portal_mobile/widgets/cards/margin_container.dart';
import 'package:flutter/material.dart';

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
      appBar: AppBar(
        automaticallyImplyLeading: true,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_ios, color: Colors.black), onPressed: () {},
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title:  const Text(
          "Linked List",
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.w600, color: Colors.black),
        ),
      ),
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