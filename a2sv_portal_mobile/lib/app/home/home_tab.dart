import 'package:a2sv_portal_mobile/app/home/widgets/topics_covered_card.dart';
import 'package:a2sv_portal_mobile/app/students/screens/widgets/ranking_row.dart';
import 'package:flutter/material.dart';

import '../../widgets/cards/margin_container.dart';
import '../../widgets/text_views/card_label_text.dart';
import '../topics/widgets/topic_info_card.dart';
import 'widgets/consistency_diagram_card.dart';
import 'widgets/profile_card.dart';
import 'widgets/profile_stats_card.dart';

class HomeTab extends StatefulWidget {
  const HomeTab({Key? key, required this.navigationCtx}) : super(key: key);
  final BuildContext navigationCtx;

  @override
  State<HomeTab> createState() => _HomeTabState();
}

class _HomeTabState extends State<HomeTab> {
  @override
  void initState() {
    // TODO: implement initState

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 25),
              MarginContainer(child: ProfileCard()),
              SizedBox(height: 10),
              MarginContainer(
                  child: GestureDetector(
                      onTap: () {
                        Navigator.pushNamed(context, "detail_stat");
                      },
                      child: ProblemsStatCard())),
              SizedBox(height: 30),
              MarginContainer(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    CardLabelText(text: "Ranking"),
                    SizedBox(height: 15),
                    RankingRow(),
                  ],
                ),
              ),
              SizedBox(height: 30),
              MarginContainer(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    CardLabelText(text: "Consistency diagram"),
                    SizedBox(height: 15),
                    ConsistencyDiagramCard(),
                  ],
                ),
              ),
              SizedBox(height: 30),
              MarginContainer(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    CardLabelText(text: "Topics Covered"),
                    SizedBox(height: 15),
                    TopicsCoveredCard(),
                  ],
                ),
              ),
              SizedBox(height: 30),
            ],
          ),
        ),
      ),
    );
  }
}
