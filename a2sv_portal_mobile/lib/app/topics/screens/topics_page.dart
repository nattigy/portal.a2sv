import 'package:a2sv_portal_mobile/app/topics/models/season.dart';
import 'package:a2sv_portal_mobile/app/topics/season_bloc/season.bloc.dart';
import 'package:a2sv_portal_mobile/app/topics/season_bloc/season_state.dart';
import 'package:a2sv_portal_mobile/app/topics/widgets/topic_info_card.dart';
import 'package:a2sv_portal_mobile/widgets/cards/margin_container.dart';
import 'package:expandable/expandable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../utils/custom_colors.dart';

class TopicsPage extends StatelessWidget {
  const TopicsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final screenHeight=MediaQuery.of(context).size.height;
    final screenWidth= MediaQuery.of(context).size.width;
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFFFBFCFF),
        body: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: screenWidth * 0.05,
            vertical: screenHeight * 0.05,
          ).copyWith(top: 0),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.max,
              children: [
                SizedBox(height: screenHeight * 0.04),
                const Align(
                    alignment: Alignment.center,
                    child: Text(
                      "Topics",
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                      ),
                    )),
                SizedBox(height: screenHeight * 0.02),
                SizedBox(
                  height: screenHeight * 0.24,
                 
                  child: BlocBuilder<SeasonBloc, SeasonState>(
                    builder: ((context, state) {
                      if (state is SeasonInit) {
                        context.read<SeasonBloc>().fetchSeasons();
                        return const CircularProgressIndicator();
                      } else if (state is SeasonLoading) {
                        return const CircularProgressIndicator();
                      } else if (state is SeasonSuccess) {
                        final seasons = state.seasons;
                        if (seasons.isEmpty) {
                          return const Text('no seasons');
                        }
                        return ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: seasons.length,
                            itemBuilder: ((context, index) {
                              return Padding(
                                padding:  EdgeInsets.only(right: screenWidth * 0.03),
                                child: Container(
                                  padding:  EdgeInsets.symmetric(horizontal: screenWidth * 0.01,vertical: screenHeight * 0.01),
                                  color: Colors.white,
                                  width:
                                      MediaQuery.of(context).size.width * 0.42,
                                  child: Column(
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.symmetric(
                                          vertical: 4,
                                        ),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            const Align(
                                              alignment: Alignment.topLeft,
                                              child: Text(
                                                "Active",
                                                style: TextStyle(
                                                  color: Colors.green,
                                                ),
                                              ),
                                            ),
                                            // Align(
                                            //   alignment: Alignment.topLeft,
                                            //   child: Text(
                                            //     "starts in 12/12/2022",
                                            //     style: TextStyle(
                                            //       color: CustomColors.veryLightTextColor,
                                            //     ),
                                            //   ),
                                            // ),
                                          SizedBox(height: screenHeight * 0.03),
                                            Align(
                                              alignment: Alignment.centerLeft,
                                              child: Text(
                                                seasons[index].name,
                                                style: TextStyle(
                                                  color: CustomColors
                                                      .veryDarkTextColor,
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.w400,
                                                ),
                                              ),
                                            ),
                                            SizedBox(height: screenHeight * 0.01),
                                            Align(
                                              alignment: Alignment.centerLeft,
                                              child: Text(
                                                seasons[index]
                                                        .topics!
                                                        .length
                                                        .toString() +
                                                    " topics",
                                                style: TextStyle(
                                                  color: CustomColors
                                                      .lightTextColor,
                                                  fontSize: 12,
                                                  fontWeight: FontWeight.w500,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            }));
                      } else {
                        return const Text('Error');
                      }
                    }),
                  ),
                ),
                 SizedBox(height: screenHeight * 0.04),
                TopicInfoCard(),
                 SizedBox(height: screenHeight * 0.01),
                 Container(
                  padding: EdgeInsets.symmetric(horizontal:screenWidth * 0.04,vertical: screenHeight * 0.04),
                  child: BlocBuilder<SeasonBloc, SeasonState>(
                    builder: ((context, state) {
                      if (state is SeasonInit) {
                        context.read<SeasonBloc>().fetchSeasons();
                        return const CircularProgressIndicator();
                      } else if (state is SeasonLoading) {
                        return const CircularProgressIndicator();
                      } else if (state is SeasonSuccess) {
                        final seasons = state.seasons;
                        if (seasons.isEmpty) {
                          return Text('no seasons');
                        }
                        return ListView.builder(
                          shrinkWrap: true,
                            scrollDirection: Axis.vertical,
                            itemCount: seasons.length,
                            itemBuilder: ((context, index) {
                              return  ExpandableNotifier(child: _buildSeasonTopics(seasons[index]));
                            }));
                      } else {
                        return Text('Error');
                      }
                    }),
                  ),
                 )
                
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSeasonTopics(Season season) {
    return ScrollOnExpand(
      scrollOnExpand: true,
      scrollOnCollapse: false,
      child: ExpandablePanel(
        header: Padding(
          padding: const EdgeInsets.only(top: 12, left: 12),
          child: Text(
            season.name + " season topics",
            style: TextStyle(
              fontSize: 14,
              color: CustomColors.veryDarkTextColor,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
        collapsed: Container(),
       
        expanded: 
      
           ListView.builder(
            shrinkWrap: true,
            itemCount: season.topics!.length,
            itemBuilder: (context, index) {
              return _buildTopicCard(
                context: context,
                iconData: Icons.abc,
                topicTitle: season.topics![index].name,
                topicDescription: season.topics![index].description.toString(),
                problemsCount: 23,
              );
            },
          ),
        ),
      
    );
  }

  Widget _buildTopicCard({
    required BuildContext context,
    required IconData? iconData,
    required String topicTitle,
    required String topicDescription,
    required int problemsCount,
  }) {
    return Container(
      color: CustomColors.white,
      
      child: ListTile(
       
        leading: const SizedBox(
          height: 50,
          width: 50,
          child: Image(image: AssetImage("assets/images/array.png")),
        ),
        title: Text(
          topicTitle,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              topicDescription,
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                color: CustomColors.lightTextColor,
              ),
            ),
            SizedBox(height: MediaQuery.of(context).size.width * 0.012),
            Text(
              "$problemsCount problems",
              style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: CustomColors.darkerTextColor),
            ),
          ],
        ),
      ),
    );
  }
}
