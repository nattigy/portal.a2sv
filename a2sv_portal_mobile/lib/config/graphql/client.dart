import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:graphql/client.dart';

import '../local_storage.dart';

final HttpLink _httpLink = HttpLink(
  'http://192.168.0.185:8000/graphql',
);

final AuthLink authLink = AuthLink(
  getToken: () async {
    FlutterSecureStorage storage = LocalStorage().storage;
    var jwt = await storage.read(key: "jwt");
    if (jwt == null) return '';
    return 'Bearer $jwt';
  },
);

final Link _link = authLink.concat(_httpLink);

class Client {
  static final Client _client = Client._internal();

  factory Client() => _client;

  Client._internal();

  GraphQLClient connect = GraphQLClient(
    cache: GraphQLCache(store: HiveStore()),
    link: _link,
  );
}
