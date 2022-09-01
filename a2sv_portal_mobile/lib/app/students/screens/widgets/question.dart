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
    double width = MediaQuery. of(context). size. width;
    return Container(
      height: 50,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          SizedBox(width:width * 0.1,child :Image.asset(platformurl)),
          SizedBox(width:width * 0.4, child : Text(title,maxLines:2,overflow: TextOverflow.ellipsis,style: const TextStyle(fontSize: 12))),
          SizedBox(width:width * 0.2, child:Chip(
            padding: EdgeInsets.all(8),
            backgroundColor: Colors.greenAccent[100],
            shadowColor: Color.fromRGBO(42, 69, 42, 1), //CircleAvatar
            label: Text(
              tag,
              style:
                  TextStyle(fontSize: 10, color: Color.fromRGBO(42, 69, 42, 1)),
            ), //Text
          ),),
          SizedBox(width:width * 0.2,child:solved? Image.asset("assets/images/solved.png"):
          Image.asset("assets/images/not_solved.png"),),
        ],
      ),
    );
  }
}
