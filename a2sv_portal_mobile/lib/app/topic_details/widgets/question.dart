import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';

class Question extends StatelessWidget {
  final String title;
  final String tag;
  final String platformurl;
  final bool solved;
  const Question(
      {Key? key,
      required this.title,
      required this.tag,
      required this.platformurl,
      required this.solved})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        SizedBox(width: width * 0.1, child: Image.asset(platformurl)),
        SizedBox(
            width: width * 0.4,
            child: Text(title,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 14,
                    color: Color.fromRGBO(88, 88, 88, 1)))),
        SizedBox(
          width: width * 0.3,
          child: Center(
            child: Chip(
              padding: EdgeInsets.all(8),
              backgroundColor: tag == "Easy"
                  ? Color.fromRGBO(92, 184, 92, 0.22)
                  : tag == "Medium"
                      ? Color.fromRGBO(246, 161, 41, 0.22)
                      : Color.fromRGBO(235, 79, 79, 0.22), //CircleAvatar
              label: Text(
                tag,
                style: TextStyle(
                    fontSize: 12,
                    color: tag == "Easy"
                  ? Color.fromRGBO(92, 184, 92, 1)
                  : tag == "Medium"
                      ? Color.fromRGBO(246, 161, 41, 1)
                      : Color.fromRGBO(235, 79, 79, 1),
                    fontWeight: FontWeight.bold),
              ), //Text
            ),
          ),
        ),
        SizedBox(
          width: width * 0.1,
          child: solved
              ? Image.asset("assets/images/solved.png")
              : Image.asset("assets/images/not_solved.png"),
        ),
      ],
    );
  }
}
