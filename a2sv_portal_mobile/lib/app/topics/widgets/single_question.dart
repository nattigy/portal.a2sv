import 'package:a2sv_portal_mobile/app/students/screens/widgets/bottom_sheet_card.dart';
import 'package:a2sv_portal_mobile/app/students/screens/widgets/radion_buttons.dart';
import 'package:a2sv_portal_mobile/app/topics/entity/question.entity.dart';
import 'package:a2sv_portal_mobile/app/topics/models/problem.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';

class SingleQuestion extends StatelessWidget {
  final Problem problem;

  const SingleQuestion({
    Key? key,
    required this.problem,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return InkWell(
      onTap: () {
  
        showModalBottomSheet<void>(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(top: Radius.circular(25.0)),
          ),

          context: context,
          builder: (BuildContext context) {
            return BottomSheetCard(problem: problem);
          },
        );
      },
      splashColor: Colors.indigo.withOpacity(.3),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          SizedBox(
              width: width * 0.1, child: Image.asset(problem.link)),
          SizedBox(
            width: width * 0.35,
            child: Text(
              problem.title,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontWeight: FontWeight.w500,
                fontSize: 14,
                // color: Color.fromRGBO(88, 88, 88, 1)
              ),
            ),
          ),
          SizedBox(
            width: width * 0.3,
            child: Center(
              child: Chip(
                padding: EdgeInsets.all(8),
                backgroundColor: problem.difficulty == "Easy"
                    ? Color.fromRGBO(92, 184, 92, 0.22)
                    : problem.difficulty == "Medium"
                        ? Color.fromRGBO(246, 161, 41, 0.22)
                        : Color.fromRGBO(235, 79, 79, 0.22), //CircleAvatar
                label: Text(
                 problem.difficulty,
                  style: TextStyle(
                      fontSize: 12,
                      color: problem.difficulty== "Easy"
                          ? Color.fromRGBO(92, 184, 92, 1)
                          : problem.difficulty == "Medium"
                              ? Color.fromRGBO(246, 161, 41, 1)
                              : Color.fromRGBO(235, 79, 79, 1),
                      fontWeight: FontWeight.bold),
                ), //Text
              ),
            ),
          ),
          SizedBox(
            height: 24,
            width: width * 0.15,
            child: problem.status ==ProblemStatus.SOLVED
                ? Image.asset("assets/images/solved.png")
                : Image.asset("assets/images/not_solved.png"),
          ),
        ],
      ),
    );
  }
}
