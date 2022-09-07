import 'package:a2sv_portal_mobile/app/topics/data/graphql/get_seasons.graphql.dart';
import 'package:a2sv_portal_mobile/app/topics/data/graphql/get_topics.graphql.dart';
import 'package:a2sv_portal_mobile/app/topics/models/season.dart';
import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class SeasonRepository {
  final GraphQLClient client;

  SeasonRepository({required this.client});

  Future<List<Season>> fetchSeasons() async {
    final response =
        await client.query(QueryOptions(document: gql(Get_Seasons)));
       print("response");
       print(response);
    final seasons = response.data?['seasons'] as List;

    return seasons.map((season) => Season.fromJson(season)).toList();
  }
}
