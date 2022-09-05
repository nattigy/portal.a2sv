import 'package:a2sv_portal_mobile/widgets/cards/shadow_card.dart';
import 'package:flutter/material.dart';

class ConsistencyDiagramCard extends StatelessWidget {
  const ConsistencyDiagramCard({Key? key}) : super(key: key);

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
                    onPressed: () {},
                    icon: Icon(
                      Icons.arrow_back_ios,
                      size: 15,
                    ),
                  ),
                  Text("2022"),
                  IconButton(
                    onPressed: () {},
                    icon: Icon(
                      Icons.arrow_forward_ios,
                      size: 15,
                    ),
                  ),
                ],
              ),
            ],
          ),
          MonthlyConsistency(),
        ],
      ),
    );
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
      width: 70,
      height: 130,
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
        borderRadius: BorderRadius.all(Radius.circular(2)),
      ),
      child: SizedBox(width: 12, height: 12),
    );
  }
}
