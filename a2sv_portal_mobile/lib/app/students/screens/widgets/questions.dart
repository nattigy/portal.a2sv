import 'package:a2sv_portal_mobile/app/students/screens/widgets/question.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';

class Questions extends StatelessWidget {
  const Questions({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width ;
    var style = TextStyle(fontWeight: FontWeight.w500);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Column(
        children: [
          const SizedBox(height: 70),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [

              SizedBox(
                width: width * 0.1,
              ),
              SizedBox(
                width: width * 0.4,
                child: const Text("name"),
              ),
              SizedBox(
                width: width * 0.2,
                child: const Center(
                  child: Text("difficulty"),
                ),
              ),
            
              SizedBox(
                width: width * 0.2,
                child: const Center(
                  child: Text("status"),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10,),
          const Question(
              title: "Min Cost ",
              tag: "Easy",
              platformurl: "assets/images/leetcode_icon.png",
              solved: true),
          const Question(
              title: "Min Stack taking long words and beza is asking me if this is okay words and beza is asking me if this is okay",
              tag: "Easy",
              platformurl: "assets/images/leetcode_icon.png",
              solved: false),
        ],
      ),
    );
  }
}
