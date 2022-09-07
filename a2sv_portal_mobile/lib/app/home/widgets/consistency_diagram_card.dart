import 'dart:math';

import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:a2sv_portal_mobile/widgets/cards/shadow_card.dart';
import 'package:flutter/material.dart';

class ConsistencyDiagramCard extends StatefulWidget {
  const ConsistencyDiagramCard({Key? key}) : super(key: key);

  @override
  State<ConsistencyDiagramCard> createState() => _ConsistencyDiagramCardState();
}

class _ConsistencyDiagramCardState extends State<ConsistencyDiagramCard> {
  int year = 2022;
  @override
  Widget build(BuildContext context) {
    return ShadowCard(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "201 total submissions",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
              ),
              Row(
                children: [
                  IconButton(
                    onPressed: () {
                      setState(() {
                        year -= 1;
                      });
                    },
                    icon: const Icon(
                      Icons.arrow_back_ios,
                      size: 15,
                    ),
                  ),
                  Text("$year"),
                  IconButton(
                    onPressed: year < 2022
                        ? () {
                            setState(() {
                              year += 1;
                            });
                          }
                        : null,
                    icon: const Icon(
                      Icons.arrow_forward_ios,
                      size: 15,
                    ),
                  ),
                ],
              ),
            ],
          ),
          MonthlyConsistency(colorRange: [
            CustomColors.greatConsistency,
            CustomColors.goodConsistency,
            CustomColors.lowConsistency,
            CustomColors.noConsistency
          ]),
        ],
      ),
    );
  }
}

class MonthlyConsistency extends StatelessWidget {
  List<Color?> colorRange;

  MonthlyConsistency({Key? key, required this.colorRange}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          ...List.generate(12, (index) => SingleMonth(colorRange: colorRange)),
        ],
      ),
    );
  }
}

class SingleMonth extends StatelessWidget {
  final List<Color?> colorRange;
  const SingleMonth({Key? key, required this.colorRange}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 70,
      height: 130,
      child: Wrap(
        children: [
          ...List.generate(31, (index) => Day(colorRange: colorRange)),
        ],
      ),
    );
  }
}

class Day extends StatelessWidget {
  final List<Color?> colorRange;
  const Day({Key? key, required this.colorRange}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(2),
      decoration: BoxDecoration(
        color: colorRange[Random().nextInt(colorRange.length)],
        // color: Colors.green,
        borderRadius: BorderRadius.all(Radius.circular(2)),
      ),
      child: SizedBox(width: 12, height: 12),
    );
  }
}
