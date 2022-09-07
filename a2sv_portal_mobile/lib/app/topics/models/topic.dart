import 'package:a2sv_portal_mobile/app/topics/models/problem.dart';
import 'package:a2sv_portal_mobile/app/topics/models/season.dart';
import 'package:equatable/equatable.dart';

class Topic extends Equatable {
  final int id;
  final String name;
  final String description;
  final Season season;
  // List<Problem> problems;

  Topic({
    required this.id,
    required this.name,
    required this.description,
    required this.season,
  });

  factory Topic.fromJson(Map<String, dynamic> json) {
    return Topic(
      id: json['_id'],
      name: json['name'],
      description: json['description'],
      season: json['season_id'],
      // problems: List<Problem>.from(
      //   json["problems"].map(
      //     (x) => Problem.fromMap(x),
      //   ),
      // ),
    );
  }

  @override
  List<Object?> get props => [];
}
