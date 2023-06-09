import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';
import 'package:flutter/material.dart';

import '../../../widgets/cards/shadow_card.dart';
import '../../../widgets/percentage_indicator.dart';

class TopicInfo extends StatelessWidget {
  final Topic topic;
  

  const TopicInfo({Key? key, required this.topic}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;
    return Column(
      children: [
        // SizedBox(height: height * 0.04),
        Align(
          alignment: Alignment.topLeft,
          child: Chip(
            padding: EdgeInsets.all(8),
            backgroundColor: Color.fromRGBO(92, 184, 92, 0.22),
            label: Text(
              topic.season!.name,
              style: TextStyle(
                  fontSize: 12,
                  color: Color.fromRGBO(92, 184, 92, 1),
                  fontWeight: FontWeight.bold),
            ), //Text
          ),
        ),
        SizedBox(
          height: height * 0.005,
        ),
        ShadowCard(
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        "Questions Covered",
                        style: TextStyle(
                            color: Color.fromRGBO(88, 88, 88, 1),
                            fontWeight: FontWeight.w500,
                            fontSize: 14),
                      ),
                      SizedBox(height: height * 0.01),
                      Row(
                        children: [
                          PercentageIndicator(percent: 10, width: width * 0.4),
                          Text("   37%"),
                        ],
                      ),
                      SizedBox(height: height * 0.03),
                      const Text(
                        "Comfortable with Linked list?",
                        style: TextStyle(
                            color: Color.fromRGBO(88, 88, 88, 1),
                            fontWeight: FontWeight.w500,
                            fontSize: 14),
                      ),
                      Row(
                        children: [
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                                elevation: 0,
                                shadowColor: Colors.white,
                                primary: Color.fromRGBO(92, 184, 92, 0.22),
                                side: const BorderSide(
                                    color: Color.fromRGBO(92, 184, 92, 0.8))),
                            // style: ButtonStyle(elevation: 0,backgroundColor:MaterialStateProperty.all(Color.fromRGBO(92, 184, 92, 0.22)) ),
                            onPressed: () {},
                            child: const Text("Yes",
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Color.fromRGBO(92, 184, 92, 0.8),
                                )),
                          ),
                          SizedBox(
                            width: width * 0.02,
                          ),
                          SizedBox(
                            child: ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                  elevation: 0,
                                  fixedSize: Size(20, 20),
                                  shadowColor: Colors.white,
                                  primary: Color.fromRGBO(235, 79, 79, 0.1),
                                  side: const BorderSide(
                                    color: Color.fromRGBO(235, 79, 79, 0.8),
                                  )),
                              // style: ButtonStyle(elevation: 0,backgroundColor:MaterialStateProperty.all(Color.fromRGBO(92, 184, 92, 0.22)) ),
                              onPressed: () {},
                              child: const Text("No",
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Color.fromRGBO(235, 79, 79, 0.8),
                                  )),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                       Align(
                        alignment: Alignment.topCenter,
                        child: Text(
                          topic.name!,
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Color.fromRGBO(58, 80, 93, 1),
                          ),
                        ),
                      ),
                      const Text(
                        "27 questions",
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                          color: Color.fromRGBO(170, 170, 170, 1),
                        ),
                      ),
                      SizedBox(
                        height: height * 0.02,
                      ),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          const Icon(
                            Icons.sticky_note_2,
                            color: Colors.blue,
                            size: 20,
                          ),
                          SizedBox(
                            width: width * 0.01,
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: const [
                              Text(
                                "12 MB",
                                style: TextStyle(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 10,
                                    color: Colors.grey),
                              ),
                              Text(
                                "Learning Path",
                                style:
                                    TextStyle(fontSize: 10, color: Colors.blue),
                              ),
                            ],
                          ),
                        ],
                      ),
                      SizedBox(
                        height: height * 0.01,
                      ),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          const Icon(
                            Icons.sticky_note_2_outlined,
                            color: Colors.orangeAccent,
                            size: 20,
                          ),
                          SizedBox(
                            width: width * 0.01,
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: const [
                              Text(
                                "12 MB",
                                style: TextStyle(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 10,
                                    color: Colors.grey),
                              ),
                              Text(
                                "Slide",
                                style:
                                    TextStyle(fontSize: 10, color: Colors.blue),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  )
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}
