import 'package:a2sv_portal_mobile/app/topics/models/season.dart';
import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class TopicDetailRepository {
  final GraphQLClient client;

  TopicDetailRepository({required this.client});

  Future<Topic> fetchTopic() async {
    var topic = Topic(
        id: "1",
        description: "Hi",
        name: "Stack",
        season: Season(id: "2", name: "Camp", topics: []));
    await Future.delayed(Duration(seconds: 5));
    return topic;

    // final response =
    //     await client.query(QueryOptions(document: gql(GET_TOPICS)));
    // final topics = response.data?['topics'] as List;

    // return topics.map((topic) => Topic.fromJson(topic)).toList();
  }
}
