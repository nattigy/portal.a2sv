import 'package:graphql_flutter/graphql_flutter.dart';

final HttpLink _httpLink =
HttpLink('https://a2sv-portal.herokuapp.com/graphql');

final _link = Link.from([_httpLink]);

GraphQLClient client() {
  return GraphQLClient(
    cache: GraphQLCache(store: InMemoryStore()),
    link: _link,
  );
}