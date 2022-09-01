import 'package:flutter/material.dart';

import '../../utils/custom_colors.dart';
import 'margin_container.dart';

class ShadowCard extends StatelessWidget {
  const ShadowCard({Key? key, required this.child}) : super(key: key);

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 15, horizontal: 15),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.all(Radius.circular(8)),
        boxShadow: [
          BoxShadow(
            offset: Offset(4,4),
            spreadRadius: 0,
            blurRadius: 4,
            color: CustomColors.lightShadowColor
          )
        ]
      ),
      child: child,
    );
  }
}
