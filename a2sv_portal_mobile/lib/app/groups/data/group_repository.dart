import 'package:a2sv_portal_mobile/app/groups/data/graphql/get_groups.graphql.dart';
import 'package:a2sv_portal_mobile/app/groups/model/group.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class GroupRepository {
  final GraphQLClient client;

  GroupRepository({required this.client});

  Future<List<Group>> fetchGroups() async {
    final response = await client.query(QueryOptions(
        document: gql(Get_Groups), fetchPolicy: FetchPolicy.noCache));

    final groups = response.data?['groups'] as List;

    return groups.map((group) => Group.fromJson(group)).toList();
  }
}
