import 'package:a2sv_portal_mobile/app/topics/models/problem.dart';

class Tag {
  int id;
  String name;
  List<Problem> problems;

  Tag({required this.id, required this.name, required this.problems});

  factory Tag.fromJson(Map<String, dynamic> json) {
    return Tag(
      id: json['_id'],
      name: json['name'],
      problems: List<Problem>.from(
        json["problems"].map(
          (x) => Problem.fromJson(x),
        ),
      ),
    );
  }
}
