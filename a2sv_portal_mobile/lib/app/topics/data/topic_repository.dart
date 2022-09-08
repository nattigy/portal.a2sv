import 'package:a2sv_portal_mobile/app/topics/data/graphql/get_topics.graphql.dart';
import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class TopicRepository {
  final GraphQLClient client;

  TopicRepository({required this.client});

  Future<List<Topic>> fetchTopics() async {
    final response =
        await client.query(QueryOptions(document: gql(GET_TOPICS)));
    final topics = response.data?['topics'] as List;

    return topics.map((topic) => Topic.fromJson(topic)).toList();
  }
}
