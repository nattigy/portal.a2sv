import 'package:a2sv_portal_mobile/app/topics/data/graphql/get_seasons.graphql.dart';
import 'package:a2sv_portal_mobile/app/topics/models/season.dart';
import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class SeasonRepository {
  final GraphQLClient client;

  SeasonRepository({required this.client});

  Future<List<Season>> fetchSeasons() async {
    List<Season> seasons = [
      Season(id: '1', name: 'Education',status: 'Active', topics: [
        Topic(
            id: '1',
            name: 'Linked list',
            description: 'blablabla',
            season: null),
             Topic(
            id: '2',
            name: 'Stack',
            description: 'blablabla',
            season: null),
             Topic(
            id: '1',
            name: 'bit',
            description: 'blablabla',
            season: null)
      ]),
      Season(id: '2', name: 'Camp', status: 'starts at 02/02/22',topics: [
        Topic(
            id: '2',
            name: 'dynamic programming',
            description: 'blablablablablablabalabalabalabbabaalallabla',
            season: null),
        Topic(
            id: '2',
            name: 'Arrays',
            description: 'arrays are  good',
            season: null)
      ]),
    ];

    return seasons;
    // final response =
    //     await client.query(QueryOptions(document: gql(Get_Seasons)));
    // print("response");
    // print(response);
    // final seasons = response.data?['seasons'] as List;

    // return seasons.map((season) => Season.fromJson(season)).toList();
  }
}
