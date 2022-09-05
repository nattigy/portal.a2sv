import 'package:flutter/material.dart';

import 'package:expandable/expandable.dart';
import '../../../utils/custom_colors.dart';

class TopicsPage extends StatelessWidget {
  const TopicsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFFFBFCFF),
        body: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: MediaQuery.of(context).size.width * 0.05,
            vertical: MediaQuery.of(context).size.width * 0.05,
          ).copyWith(top: 0),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.max,
              children: [
                const SizedBox(height: 40),
                const Align(
                    alignment: Alignment.center,
                    child: Text(
                      "Topics",
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                      ),
                    )),
                const SizedBox(height: 24),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.24,
                  // color: Colors.blue,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: 5,
                    itemBuilder: ((context, index) {
                      return Padding(
                        padding: const EdgeInsets.only(right: 8),
                        child: Container(
                          padding: const EdgeInsets.all(8),
                          color: Colors.white,
                          width: MediaQuery.of(context).size.width * 0.42,
                          child: Column(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  vertical: 4,
                                ),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.start,
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
                                    const SizedBox(height: 12),
                                    Align(
                                      alignment: Alignment.centerLeft,
                                      child: Text(
                                        "Education season",
                                        style: TextStyle(
                                          color: CustomColors.veryDarkTextColor,
                                          fontSize: 16,
                                          fontWeight: FontWeight.w400,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Align(
                                      alignment: Alignment.centerLeft,
                                      child: Text(
                                        "8 topics covered",
                                        style: TextStyle(
                                          color: CustomColors.lightTextColor,
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
                    }),
                  ),
                ),
                const SizedBox(height: 40),
                ExpandableNotifier(child: _buildSeasonTopics()),
                SizedBox(height: 20),
                ExpandableNotifier(child: _buildSeasonTopics()),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSeasonTopics() {
    return ScrollOnExpand(
      scrollOnExpand: true,
      scrollOnCollapse: false,
      child: ExpandablePanel(
        header: Padding(
          padding: const EdgeInsets.only(top: 12, left: 12),
          child: Text(
            "Education season topics",
            style: TextStyle(
              fontSize: 14,
              color: CustomColors.veryDarkTextColor,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
        collapsed: Container(),
        // expanded: _buildSeasonTopics,
        expanded: SizedBox(
          height: 200,
          child: ListView.builder(
            itemCount: 4,
            itemBuilder: (context, index) {
              return _buildTopicCard(
                context: context,
                iconData: Icons.abc,
                topicTitle: "Stack",
                topicDescription:
                    "linear data structure that follows the principle of Last In First Out (LIFO)",
                problemsCount: 23,
              );
            },
          ),
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
      // color: Colors.red,
      child: ListTile(
        // leading: Icon(iconData),
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
