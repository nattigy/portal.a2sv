import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';

class QuestionsTitle extends StatelessWidget {
  const QuestionsTitle({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    var style = const TextStyle(
        fontWeight: FontWeight.w500,
        fontSize: 14,
        color: Color.fromRGBO(88, 88, 88, 1));
    return Column(
      children: [
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
        Container(
          margin: EdgeInsets.only(bottom: 5),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(
                width: width * 0.1,
              ),
              SizedBox(
                width: width * 0.35,
                child: Align(
                    child: Text("Name", style: style),
                    alignment: Alignment.topLeft),
              ),
              SizedBox(
                width: width * 0.3,
                child: Center(
                  child: Center(child: Text("Difficulty", style: style)),
                ),
              ),
              SizedBox(
                width: width * 0.15,
                child: Center(
                  child: Text("Status", style: style),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
