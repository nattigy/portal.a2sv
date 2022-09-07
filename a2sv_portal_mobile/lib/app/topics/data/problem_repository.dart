import 'package:a2sv_portal_mobile/app/students/screens/widgets/radion_buttons.dart';
import 'package:a2sv_portal_mobile/app/topics/models/problem.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class ProblemsRepository {
  final GraphQLClient client;

  ProblemsRepository({required this.client});

  Future<List<Problem>> fetchProblems(String id) async {
    var questions = [
      Problem(
          id: 1,
          title: "Best Time to Buy and Sell Stock",
          difficulty: "Easy",
          tags: [],
          platform: "leetcode",
          link: "assets/images/leetcode_icon.png",
          createdAt: DateTime.now(),
          numOfTries: 1,
          updatedAt: DateTime.now(),
          status: ProblemStatus.SOLVED,
          solved: "solved"),
      Problem(
          id: 1,
          title: "Binary Tree Pruning",
          difficulty: "Medium",
          tags: [],
          platform: "leetcode",
          link: "assets/images/leetcode_icon.png",
          numOfTries: 0,
          status: ProblemStatus.SOLVED,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
          solved: "Not Solved"),
      Problem(
          id: 1,
          title: "3 sum",
          difficulty: "Medium",
          tags: [],
          platform: "leetcode",
          link: "assets/images/leetcode_icon.png",
          status: ProblemStatus.SOLVED,
          createdAt: DateTime.now(),
          numOfTries: 7,
          updatedAt: DateTime.now(),
          solved: "solved"),
      Problem(
          id: 1,
          title: "Jump game IV",
          difficulty: "Hard",
          tags: [],
          platform: "leetcode",
          link: "assets/images/leetcode_icon.png",
          status: ProblemStatus.SOLVED,
            numOfTries: 4,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
          solved: "Not Solved"),
      Problem(
          id: 1,
          title: "Min Cost Climbing Stairs",
          difficulty: "Medium",
          tags: [],
          platform: "leetcode",
          link: "assets/images/leetcode_icon.png",
          status: ProblemStatus.SOLVED,
          createdAt: DateTime.now(),
          numOfTries: 3,
          updatedAt: DateTime.now(),
          solved: "solved"),
    ];

    await Future.delayed(Duration(seconds: 5));
    //   final response =
    // await client.query(QueryOptions(document: gql(GET_TOPICS)));
    // final topics = response.data?['topics'] as List;

    // return topics.map((topic) => Topic.fromJson(topic)).toList();
    return questions;
  }
}
