import 'package:a2sv_portal_mobile/app/topics/models/season.dart';
import 'package:equatable/equatable.dart';

class Topic extends Equatable {
  final String id;
  final String name;
  final String? description;
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
        id: json['id'],
        name: json['name'],
        description: json['description'],
        season: Season.fromJson(json['season'])
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
