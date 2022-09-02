// ignore_for_file: sort_child_properties_last

import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';

import 'question.dart';

class Questions extends StatelessWidget {
  const Questions({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    var questions = [
     const Question(
          title: "Best time to sell and buy stocks",
          tag: "Easy",
          platformurl: "assets/images/leetcode_icon.png",
          solved: true),
     const Question(
          title: "Min Cost something",
          tag: "Medium",
          platformurl: "assets/images/leetcode_icon.png",
          solved: false),
     const Question(
          title: "Min Cost to sell stocks ",
          tag: "Hard",
          platformurl: "assets/images/leetcode_icon.png",
          solved: true),
      const Question(
          title: "Min Cost ",
          tag: "Easy",
          platformurl: "assets/images/leetcode_icon.png",
          solved: false),
    ];
    var style = const TextStyle(
        fontWeight: FontWeight.w500,
        fontSize: 14,
        color: Color.fromRGBO(88, 88, 88, 1));
    return SingleChildScrollView(
      child: Column(children: [
         SizedBox(height: height * 0.05),
        const Align(
          child: Text(
            " 27 Questions",
            style: TextStyle(
                fontWeight: FontWeight.w600,
                fontSize: 16,
                color: Color.fromRGBO(88, 88, 88, 1)),
          ),
          alignment: Alignment.topLeft,
        ),
        SizedBox(
          height: height * 0.02,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            SizedBox(
              width: width * 0.1,
            ),
            SizedBox(
              width: width * 0.4,
              child: Align(child: Text("Name", style: style),alignment: Alignment.topLeft),
            ),
            SizedBox(
              width: width * 0.3,
              child: Center(
                child: Center(child: Text("Difficulty", style: style)),
              ),
            ),
            SizedBox(
              width: width * 0.1,
              child: Center(
                child: Text("Status", style: style),
              ),
            ),
          ],
        ),
        SizedBox(
          height: height * 0.02,
        ),
        Container(
          height: 350,
          child:  ListView.builder(
            itemCount: questions.length,
    
            itemBuilder: (context, index) {
              return questions[index];
            }
          )
        )
      ]),
    );
  }
}
