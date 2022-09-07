import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';

class Season {
  final String id;
  final String name;
  final List<Topic>? topics;

  Season({
    required this.id,
    required this.name,
    required this.topics,
  });

  factory Season.fromJson(Map<String, dynamic> json) {
    return Season(
        id: json['id'],
        name: json['name'],
        topics: json['topics']==null? []:List<Topic>.from(
          json["topics"].map(
            (x) => Topic.fromJson(x),
          ),
        ));
  }
}
