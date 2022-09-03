import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';

enum ProblemStatus { solved, notSolved, unableSolve }

class RadioButton extends StatefulWidget {
  String title;
  Color color;
  Function onchange;
  ProblemStatus? status;
  ProblemStatus value;

  RadioButton(
      {Key? key,
      required this.status,
      required this.title,
      required this.color,
      required this.onchange,
      required this.value})
      : super(key: key);

  @override
  State<RadioButton> createState() => _RadioButtonState();
}

class _RadioButtonState extends State<RadioButton> {
  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.topLeft,
      child: Row(
        children: [
          Radio<ProblemStatus>(
            value: widget.value,
            fillColor: MaterialStateColor.resolveWith((states) => widget.color),
            onChanged: (value) {
              widget.onchange(value);
            },
            groupValue: widget.status,
          ),
          Text(widget.title),
        ],
      ),
    );
  }
}
