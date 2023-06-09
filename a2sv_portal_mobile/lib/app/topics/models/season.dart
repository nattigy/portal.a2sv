import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';

class Season {
  final String id;
  final String name;
  final String status;
  final List<Topic>? topics;

  Season({
    required this.id,
    required this.status,
    required this.name,
    required this.topics,
  });

  factory Season.fromJson(Map<String, dynamic> json) {
    return Season(
        id: json['id'],
        name: json['name'],
        status: json['status'],
        topics: json['topics'] == null
            ? []
            : List<Topic>.from(
                json["topics"].map(
                  (x) => Topic.fromJson(x),
                ),
              ));
  }
}
