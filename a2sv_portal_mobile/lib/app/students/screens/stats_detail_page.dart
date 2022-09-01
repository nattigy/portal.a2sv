import 'package:a2sv_portal_mobile/app/home_tab/widgets/profile_stats_card.dart';
import 'package:flutter/material.dart';

import '../../../widgets/cards/margin_container.dart';
import '../../../widgets/text_views/card_label_text.dart';
import '../../home_tab/widgets/consistency_diagram_card.dart';

class StatsDetailPage extends StatelessWidget {
  const StatsDetailPage({Key? key}) : super(key: key);

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
                    CardLabelText(text: "Consistency diagram"),
                    SizedBox(height: 15),
                    ConsistencyDiagramCard(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
