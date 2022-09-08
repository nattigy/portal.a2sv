import 'package:a2sv_portal_mobile/app/home/widgets/questions_ratio.dart';
import 'package:a2sv_portal_mobile/widgets/cards/shadow_card.dart';
import 'package:flutter/material.dart';

class ProblemsStatCard extends StatelessWidget {
  const ProblemsStatCard({
    Key? key,
    required this.problemsSolved,
    required this.totalSubmissions,
    required this.minutes,
    required this.wrongSubmissions,
    required this.easy,
    required this.medium,
    required this.hard,
  }) : super(key: key);

  final int problemsSolved;
  final int totalSubmissions;
  final int minutes;
  final int wrongSubmissions;
  final int easy;
  final int medium;
  final int hard;

  @override
  Widget build(BuildContext context) {
    return ShadowCard(
      child: Column(
        children: [
          // ReminderTextView(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text("Problems Solved"),
                  Text(
                    "$problemsSolved",
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 24,
                    ),
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Row(
                    children: [
                      Text("$totalSubmissions total submissions"),
                      const SizedBox(width: 5),
                      SizedBox(
                        width: 10,
                        height: 10,
                        child: Container(
                          decoration: const BoxDecoration(
                            color: Colors.orange,
                            borderRadius: BorderRadius.all(Radius.circular(10)),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 5),
                  Row(
                    children: [
                      Text("$minutes minutes dedicated"),
                      const SizedBox(width: 5),
                      SizedBox(
                        width: 10,
                        height: 10,
                        child: Container(
                          decoration: const BoxDecoration(
                            color: Colors.green,
                            borderRadius: BorderRadius.all(Radius.circular(10)),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 5),
                  Row(
                    children: [
                      Text("$wrongSubmissions wrong submissions"),
                      const SizedBox(width: 5),
                      SizedBox(
                        width: 10,
                        height: 10,
                        child: Container(
                          decoration: const BoxDecoration(
                            color: Colors.red,
                            borderRadius: BorderRadius.all(Radius.circular(10)),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              )
            ],
          ),
          const SizedBox(height: 12),
          QuestionsRatio(easy: easy, hard: hard, medium: medium),
        ],
      ),
    );
  }
}
