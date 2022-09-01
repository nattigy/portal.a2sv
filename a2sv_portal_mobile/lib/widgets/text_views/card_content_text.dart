import 'package:flutter/material.dart';

class CardContentText extends StatelessWidget {
  const CardContentText({Key? key, required this.text}) : super(key: key);

  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(fontWeight: FontWeight.w500, color: Colors.grey),
    );
  }
}