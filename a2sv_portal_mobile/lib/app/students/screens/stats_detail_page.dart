import 'package:a2sv_portal_mobile/app/home_tab/widgets/profile_stats_card.dart';
import 'package:flutter/material.dart';

import '../../../widgets/cards/margin_container.dart';
import '../../../widgets/text_views/card_label_text.dart';
import '../../group_tab/widgets/group_info_card.dart';
import '../../home_tab/widgets/consistency_diagram_card.dart';
import 'widgets/bottom_sheet_card.dart';
import 'widgets/ranking_row.dart';
import 'widgets/topics_covered_card.dart';

class StatsDetailPage extends StatelessWidget {
  const StatsDetailPage({Key? key}) : super(key: key);

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => StatsDetailPage());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(height: 30),
              MarginContainer(child: ProblemsStatCard()),
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
              MarginContainer(child: GroupInfoCard()),
              SizedBox(height: 30),
              ElevatedButton(
                  onPressed: () {
                    showModalBottomSheet<void>(
                      context: context,
                      builder: (BuildContext context) {
                        return BottomSheetCard();
                      },
                    );
                  },
                  child: Text("click me"))
            ],
          ),
        ),
      ),
    );
  }
}
