import 'package:a2sv_portal_mobile/app/home/models/consistency.entity.dart';
import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:a2sv_portal_mobile/widgets/cards/shadow_card.dart';
import 'package:flutter/material.dart';

class ConsistencyDiagramCard extends StatelessWidget {
  const ConsistencyDiagramCard({
    Key? key,
    required this.totalSubmissions,
    required this.consistency,
  }) : super(key: key);

  final int totalSubmissions;
  final Consistency consistency;

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
                "$totalSubmissions total submissions",
                style:
                    const TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
              ),
              Row(
                children: [
                  IconButton(
                    onPressed: () {
                      // setState(() {
                      //   year -= 1;
                      // });
                    },
                    icon: const Icon(Icons.arrow_back_ios, size: 15),
                  ),
                  Text(consistency.year),
                  IconButton(
                    onPressed: () {
                      // setState(() {
                      //   year += 1;
                      // });
                    },
                    icon: const Icon(Icons.arrow_forward_ios, size: 15),
                  ),
                ],
              ),
            ],
          ),
          MonthlyConsistency(consistency: consistency),
        ],
      ),
    );
  }
}

class MonthlyConsistency extends StatelessWidget {
  final Consistency consistency;

  const MonthlyConsistency({Key? key, required this.consistency})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          ...List.generate(
            consistency.months.length,
            (index) => SingleMonth(month: consistency.months[index]),
          ),
        ],
      ),
    );
  }
}

class SingleMonth extends StatelessWidget {
  final Month month;

  const SingleMonth({Key? key, required this.month}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 70,
      height: 130,
      child: Wrap(
        children: [
          ...List.generate(
            month.days.length,
            (index) => Day(dailyStat: month.days[index]),
          ),
        ],
      ),
    );
  }
}

class Day extends StatelessWidget {
  const Day({Key? key, required this.dailyStat}) : super(key: key);
  final DailyStat dailyStat;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(2),
      decoration: BoxDecoration(
        color: dailyStat.totalProblems <= 1
            ? CustomColors.noConsistency
            : dailyStat.totalProblems <= 3
                ? CustomColors.lowConsistency
                : dailyStat.totalProblems <= 7
                    ? CustomColors.goodConsistency
                    : CustomColors.greatConsistency,
        borderRadius: const BorderRadius.all(Radius.circular(2)),
      ),
      child: const SizedBox(width: 12, height: 12),
    );
  }
}
