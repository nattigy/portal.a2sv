import 'dart:math';

import 'package:a2sv_portal_mobile/app/home/models/consistency.entity.dart';
import 'package:a2sv_portal_mobile/app/home/models/problem_stat.entity.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class HomeRepository {
  final GraphQLClient client;
  final FlutterSecureStorage storage;

  HomeRepository({required this.storage, required this.client});

  Future<Consistency> loadConsistencyDiagram(String year) async {
   List<List<DailyStat>> days =[
     [...List.generate(31, (index) => DailyStat(new Random().nextInt(3)))],
     [...List.generate(30, (index) => DailyStat(new Random().nextInt(10)))],
     [...List.generate(31, (index) => DailyStat(new Random().nextInt(5)))],
     [...List.generate(30, (index) => DailyStat(new Random().nextInt(10)))],
   ];
    List<Month> months = [...List.generate(12, (idx) => Month(days[new Random().nextInt(3)]))];
    Consistency consistency = Consistency(
      year: year,
      months: months,
    );
    const Duration(seconds: 2);
    return consistency;
  }

  Future<ProblemStat> loadProblemStats() async {
    ProblemStat problemStat = ProblemStat(
      medium: 12,
      easy: 10,
      hard: 8,
      minutes: 4654,
      problemsSolved: 30,
      totalSubmissions: 50,
      wrongSubmissions: 20,
    );
    const Duration(seconds: 2);
    return problemStat;
  }
}
