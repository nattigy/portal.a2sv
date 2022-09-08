import 'package:a2sv_portal_mobile/app/home/bloc/home.bloc.dart';
import 'package:a2sv_portal_mobile/app/home/widgets/consistency_diagram_card.dart';
import 'package:a2sv_portal_mobile/app/home/widgets/profile_card.dart';
import 'package:a2sv_portal_mobile/app/home/widgets/profile_stats_card.dart';
import 'package:a2sv_portal_mobile/app/home/widgets/topics_covered_card.dart';
import 'package:a2sv_portal_mobile/app/students/screens/widgets/ranking_row.dart';
import 'package:a2sv_portal_mobile/widgets/cards/margin_container.dart';
import 'package:a2sv_portal_mobile/widgets/text_views/card_label_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class HomeTab extends StatefulWidget {
  const HomeTab({Key? key, required this.navigationCtx}) : super(key: key);
  final BuildContext navigationCtx;

  @override
  State<HomeTab> createState() => _HomeTabState();
}

class _HomeTabState extends State<HomeTab> {
  @override
  void initState() {
    context.read<HomeBloc>().loadHome();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: BlocBuilder<HomeBloc, HomeState>(builder: (homeCtx, homeState) {
          if (homeState is HomeLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (homeState is HomeLoadSuccess) {
            return SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 25),
                  MarginContainer(
                    child: ProfileCard(
                      firstName: homeState.user.firstName!,
                      lastName: homeState.user.lastName!,
                    ),
                  ),
                  const SizedBox(height: 10),
                  MarginContainer(
                    child: GestureDetector(
                      onTap: () {
                        Navigator.pushNamed(context, "detail_stat");
                      },
                      child: ProblemsStatCard(
                        easy: homeState.problemStat.easy,
                        medium: homeState.problemStat.medium,
                        hard: homeState.problemStat.hard,
                        minutes: homeState.problemStat.minutes,
                        problemsSolved: homeState.problemStat.problemsSolved,
                        totalSubmissions:
                            homeState.problemStat.totalSubmissions,
                        wrongSubmissions:
                            homeState.problemStat.wrongSubmissions,
                      ),
                    ),
                  ),
                  const SizedBox(height: 30),
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
                  const SizedBox(height: 30),
                  MarginContainer(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        CardLabelText(text: "Consistency diagram"),
                        SizedBox(height: 15),
                        ConsistencyDiagramCard(
                          totalSubmissions:
                              homeState.problemStat.totalSubmissions,
                          consistency: homeState.consistency,
                        ),
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
            );
          } else {
            return Center(child: Text("Error"));
          }
        }),
      ),
    );
  }
}
