import 'package:a2sv_portal_mobile/app/students/screens/widgets/radion_buttons.dart';
import 'package:a2sv_portal_mobile/app/topics/models/tag.dart';

class Problem {
  final DateTime createdAt;
  String difficulty;
  int id;
  String link;
  String platform;
  List<Tag> tags;
  String title;
  int numOfTries;
  ProblemStatus status;
  String solved;
  DateTime updatedAt;

  Problem(
      {required this.id,
      required this.title,
      required this.platform,
      required this.difficulty,
      required this.tags,
      required this.link,
      required this.status,
      required this.solved,
      required this.numOfTries,
      required this.createdAt,
      required this.updatedAt});

  factory Problem.fromJson(Map<String, dynamic> json) {
    return Problem(
        id: json['_id'],
        title: json['title'],
        link: json['link'],
        platform: json['platfom'],
        difficulty: json['difficulty'],
        solved: json['solved'],
        status: json['status'],
        numOfTries: json['numOfTries'],
        createdAt:  json['createdAt'],
        updatedAt: json['updatedAt'],
        tags: List<Tag>.from(json["tags"].map((x) => Tag.fromJson(x))));
  }

}
