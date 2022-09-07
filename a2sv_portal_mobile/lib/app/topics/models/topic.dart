import 'package:a2sv_portal_mobile/app/topics/models/season.dart';
import 'package:equatable/equatable.dart';

class Topic extends Equatable {
  final String? id;
  final String? name;
  final String? description;
  final Season? season;
  // List<Problem> problems;

  Topic({
    required this.id,
    required this.name,
    required this.description,
    required this.season,
  });

  factory Topic.fromJson(Map<String, dynamic> json) {
    return Topic(
        id: json.containsKey("id") ? json['id'] : null,
        name: json.containsKey("name") ? json['name'] : null,
        description:
            json.containsKey("description") ? json['description'] : null,
        // season: json["season"] == null ? null : Season.fromJson(json['season'])
        season: (!json.containsKey("season"))
            ? null
            : json["season"] == null
                ? null
                : Season.fromJson(json['season'])
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
