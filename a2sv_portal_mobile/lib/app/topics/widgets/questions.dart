// ignore_for_file: sort_child_properties_last

import 'package:a2sv_portal_mobile/app/students/screens/widgets/bottom_sheet_card.dart';
import 'package:a2sv_portal_mobile/app/topics/entity/question.entity.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';

import 'single_question.dart';

class Questions extends StatelessWidget {
  const Questions({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    var questions = [
      Question(
          title: "Best Time to Buy and Sell Stock",
          tag: "Easy",
          platformurl: "assets/images/leetcode_icon.png",
          solved: true),
      Question(
          title: "Binary Tree Pruning",
          tag: "Medium",
          platformurl: "assets/images/leetcode_icon.png",
          solved: false),
      Question(
          title: "3 Sum",
          tag: "Medium",
          platformurl: "assets/images/leetcode_icon.png",
          solved: true),
      Question(
          title: "Jump game IV",
          tag: "Hard",
          platformurl: "assets/images/leetcode_icon.png",
          solved: false),
      Question(
          title: "Min Cost Climbing Stairs",
          tag: "Medium",
          platformurl: "assets/images/leetcode_icon.png",
          solved: true),
    ];
    var style = const TextStyle(
        fontWeight: FontWeight.w500,
        fontSize: 14,
        color: Color.fromRGBO(88, 88, 88, 1));
    return SingleChildScrollView(
      child: Column(
        children: [
          SizedBox(
            height: height * 0.02,
          ),
          Column(
            children: [
              ...questions.map((question) {
                return SingleQuestion(
                  question: question,
                );
              }).toList()
            ],
          ),
        ],
      ),
    );
  }
}
