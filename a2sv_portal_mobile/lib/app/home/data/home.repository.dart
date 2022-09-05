import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class HomeRepository {
  final GraphQLClient client;
  final FlutterSecureStorage storage;

  HomeRepository({required this.storage, required this.client});

  Future<void> loadConsistencyDiagram() async {}
}
