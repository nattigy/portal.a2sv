import 'package:flutter/material.dart';

class QuestionsRatio extends StatelessWidget {
  const QuestionsRatio({
    Key? key,
    required this.easy,
    required this.medium,
    required this.hard,
  }) : super(key: key);

  final int easy;
  final int medium;
  final int hard;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              flex: easy,
              child: SizedBox(
                height: 10,
                child: Container(
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(3)),
                    color: Colors.green,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 3),
            Expanded(
              flex: medium,
              child: SizedBox(
                height: 10,
                child: Container(
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(3)),
                    color: Colors.orange,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 3),
            Expanded(
              flex: hard,
              child: SizedBox(
                height: 10,
                child: Container(
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(3)),
                    color: Colors.deepPurple,
                  ),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Row(
              children: [
                SizedBox(
                  height: 8,
                  width: 8,
                  child: Container(
                    decoration: const BoxDecoration(color: Colors.green),
                  ),
                ),
                const SizedBox(width: 5),
                const Text("Easy"),
              ],
            ),
            const SizedBox(width: 15),
            Row(
              children: [
                SizedBox(
                  height: 8,
                  width: 8,
                  child: Container(
                    decoration: const BoxDecoration(color: Colors.orange),
                  ),
                ),
                const SizedBox(width: 5),
                const Text("Medium"),
              ],
            ),
            const SizedBox(width: 15),
            Row(
              children: [
                SizedBox(
                  height: 8,
                  width: 8,
                  child: Container(
                    decoration: const BoxDecoration(color: Colors.deepPurple),
                  ),
                ),
                const SizedBox(width: 5),
                const Text("Hard"),
              ],
            ),
          ],
        )
      ],
    );
  }
}
