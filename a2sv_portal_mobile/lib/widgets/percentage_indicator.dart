import 'package:flutter/material.dart';

import '../utils/colors.dart';
import '../utils/custom_colors.dart';

class PercentageIndicator extends StatelessWidget {
  const PercentageIndicator({Key? key, required this.percent}) : super(key: key);

  final double percent;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 10,
      decoration: BoxDecoration(
        color: light_grey_color,
        borderRadius: BorderRadius.all(Radius.circular(12)),
      ),
      child: Row(
        children: [
          Expanded(
            flex: percent.toInt(),
            child: Container(
              decoration: BoxDecoration(
                color: CustomColors.primaryColor,
                borderRadius: BorderRadius.all(Radius.circular(12)),
              ),
            ),
          ),
          Expanded(
            flex: (100 - percent).toInt(),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.transparent,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
