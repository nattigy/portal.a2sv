import 'package:a2sv_portal_mobile/widgets/cards/shadow_card.dart';
import 'package:flutter/material.dart';

class RankingRow extends StatelessWidget {
  const RankingRow({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ShadowCard(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          RankItem(typeName: "Daily", typeRank: "4", color: Colors.green),
          RankItem(typeName: "Weekly", typeRank: "6", color: Colors.indigo),
          RankItem(typeName: "Monthly", typeRank: "11", color: Colors.orange),
          RankItem(typeName: "Overall", typeRank: "7", color: Colors.blue.shade900),
        ],
      ),
    );
  }
}

class RankItem extends StatelessWidget {
  const RankItem({Key? key, required this.typeName, required this.typeRank, required this.color}) : super(key: key);

  final String typeRank;
  final String typeName;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          "${typeRank}th",
          style: TextStyle(
            fontSize: 17,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 15),
        Text(
          typeName,
          style: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 19,
              color: color,
          ),
        ),
      ],
    );
  }
}

