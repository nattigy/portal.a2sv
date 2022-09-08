import 'package:a2sv_portal_mobile/app/groups/data/graphql/get_groups.graphql.dart';
import 'package:a2sv_portal_mobile/app/groups/model/group.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class GroupRepository {
  final GraphQLClient client;

  GroupRepository({required this.client});

  Future<List<Group>> fetchGroups() async {

    final List<Group>groups = [
      Group(
        id: '1',
     school: 'AAiT',
        country: 'Ethiopia', 
        name: 'G 12', 
        members: '61 members',
        createdat: '01/01/2020',
        topics: [], 
        users: null),
        Group(
        id: '2',
     school: 'AAiT',
        country: 'Ethiopia', 
        members: '45 members',
        createdat: '03/05/2021',
        name: 'G 31', 
        topics: [], 
        users: null),
        Group(
        id: '3',
     school: 'AAiT',
        country: 'Ethiopia', 
         members: '55 members',
        createdat: '03/05/2021',
        name: 'G 32', 
        topics: [], 
        users: null),
        Group(
        id: '4',
     school: 'AASTU',
        country: 'Ethiopia', 
         members: '25 members',
        createdat: '03/05/2021',
        name: 'G 33', 
        topics: [], 
        users: null)
    ];

    return groups;
    // final response = await client.query(QueryOptions(
    //     document: gql(Get_Groups), fetchPolicy: FetchPolicy.noCache));

    // final groups = response.data?['groups'] as List;

    // return groups.map((group) => Group.fromJson(group)).toList();
  }
}
