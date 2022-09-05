import 'package:a2sv_portal_mobile/app/topics/models/tag.dart';

class Problem {
  final DateTime createdAt;
  String difficulty;
  int id;
  String link;
  String platform;
  List<Tag> tags;
  String title;
  DateTime updatedAt;

  Problem(
      {required this.id,
      required this.title,
      required this.platform,
      required this.difficulty,
      required this.tags,
      required this.link,
      required this.createdAt,
      required this.updatedAt});

  factory Problem.fromJson(Map<String, dynamic> json) {
    return Problem(
        id: json['_id'],
        title: json['title'],
        link: json['link'],
        platform: json['platform'],
        difficulty: json['difficulty'],
        createdAt:  json['createdAt'],
        updatedAt: json['updatedAt'],
        tags: List<Tag>.from(json["problems"].map((x) => Problem.fromMap(x))));
  }
    factory Problem.fromMap(Map<String, dynamic> json) {
    return Problem(
        id: json['_id'],
        title: json['title'],
        link: json['link'],
        platform: json['platform'],
        difficulty: json['difficulty'],
        createdAt:  json['createdAt'],
        updatedAt: json['updatedAt'],
        tags: List<Tag>.from(json["problems"].map((x) => Problem.fromMap(x))));
  }

}
