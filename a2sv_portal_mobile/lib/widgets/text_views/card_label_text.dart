import 'package:flutter/material.dart';

class CardLabelText extends StatelessWidget {
  const CardLabelText({Key? key, required this.text}) : super(key: key);
  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(fontWeight: FontWeight.w600, fontSize: 20),
    );
  }
}
