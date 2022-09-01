import 'package:flutter/material.dart';

class MarginContainer extends StatelessWidget {
  const MarginContainer({Key? key, required this.child}) : super(key: key);

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 20),
      child: child,
    );
  }
}
