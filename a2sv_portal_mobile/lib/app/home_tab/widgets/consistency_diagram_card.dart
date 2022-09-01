import 'package:a2sv_portal_mobile/widgets/cards/shadow_card.dart';
import 'package:flutter/material.dart';

class ConsistencyDiagramCard extends StatelessWidget {
  const ConsistencyDiagramCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ShadowCard(
        child: Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "201 total submissions",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
              ),
              Text("heere"),
            ],
          ),
        ),
        SizedBox(height: 10),
        MonthlyConsistency(),
      ],
    ));
  }
}

class MonthlyConsistency extends StatelessWidget {
  const MonthlyConsistency({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          ...List.generate(12, (index) => SingleMonth()),
        ],
      ),
    );
  }
}

class SingleMonth extends StatelessWidget {
  const SingleMonth({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 90,
      height: 160,
      child: Wrap(
        children: [
          ...List.generate(31, (index) => Day()),
        ],
      ),
    );
  }
}

class Day extends StatelessWidget {
  const Day({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(2),
      decoration: BoxDecoration(
        color: Colors.green,
        borderRadius: BorderRadius.all(Radius.circular(3)),
      ),
      child: SizedBox(width: 15, height: 15),
    );
  }
}
