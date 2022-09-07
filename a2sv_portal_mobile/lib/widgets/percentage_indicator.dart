import 'package:flutter/material.dart';

import '../utils/colors.dart';
import '../utils/custom_colors.dart';

class PercentageIndicator extends StatelessWidget {
  const PercentageIndicator(
      {Key? key, required this.percent, required this.width})
      : super(key: key);

  final double percent;
  final double width;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 6,
      width: width,
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
                color: percent <= 25
                    ? Colors.blue[800]
                    : percent <= 65
                        ? Colors.yellow[700]
                        : Colors.green,
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
