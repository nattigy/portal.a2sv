import 'package:flutter/material.dart';

class CardTitleText extends StatelessWidget {
  const CardTitleText({Key? key, required this.text}) : super(key: key);

  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(text, style: TextStyle(
      fontWeight: FontWeight.w700,
      fontSize: 20
    ),);
  }
}
