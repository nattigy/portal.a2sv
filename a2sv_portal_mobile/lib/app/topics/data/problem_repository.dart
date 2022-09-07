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
          platform: "assets/images/leetcode_icon.png",
          link: "",
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
          solved: "solved"),
      Problem(
          id: 1,
          title: "Binary Tree Pruning",
          difficulty: "Medium",
          tags: [],
          platform: "assets/images/leetcode_icon.png",
          link: "",
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
          solved: "Not Solved"),
      Problem(
          id: 1,
          title: "3 sum",
          difficulty: "Medium",
          tags: [],
          platform: "assets/images/leetcode_icon.png",
          link: "",
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
          solved: "solved"),
      Problem(
          id: 1,
          title: "Jump game IV",
          difficulty: "Hard",
          tags: [],
          platform: "assets/images/leetcode_icon.png",
          link: "",
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
          solved: "Not Solved"),
      Problem(
          id: 1,
          title: "Min Cost Climbing Stairs",
          difficulty: "Medium",
          tags: [],
          platform: "assets/images/leetcode_icon.png",
          link: "",
          createdAt: DateTime.now(),
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
