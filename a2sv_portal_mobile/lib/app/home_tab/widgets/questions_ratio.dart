import 'package:flutter/material.dart';

class QuestionsRatio extends StatelessWidget {
  const QuestionsRatio({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              flex: 1,
              child: SizedBox(
                height: 10,
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(3)),
                    color: Colors.green,
                  ),
                ),
              ),
            ),
            SizedBox(width: 3),
            Expanded(
              flex: 1,
              child: SizedBox(
                height: 10,
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(3)),
                    color: Colors.orange,
                  ),
                ),
              ),
            ),
            SizedBox(width: 3),
            Expanded(
              flex: 2,
              child: SizedBox(
                height: 10,
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(3)),
                    color: Colors.deepPurple,
                  ),
                ),
              ),
            ),
          ],
        ),
        SizedBox(height: 8),
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
                    decoration: BoxDecoration(
                      color: Colors.green,
                    ),
                  ),
                ),
                SizedBox(width: 5),
                Text("Easy"),
              ],
            ),
            SizedBox(width: 15),
            Row(
              children: [
                SizedBox(
                  height: 8,
                  width: 8,
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.orange,
                    ),
                  ),
                ),
                SizedBox(width: 5),
                Text("Medium"),
              ],
            ),
            SizedBox(width: 15),
            Row(
              children: [
                SizedBox(
                  height: 8,
                  width: 8,
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.deepPurple,
                    ),
                  ),
                ),
                SizedBox(width: 5),
                Text("Hard"),
              ],
            ),
          ],
        )
      ],
    );
  }
}
