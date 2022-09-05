import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';

class Season {
  final String id;
  final DateTime createdAt;
  final DateTime endDate;
  final String name;
  final DateTime startDate;
  final List<Topic>? topics;
  final DateTime updatedAt;

  Season({
    required this.id,
    required this.createdAt,
    required this.endDate,
    required this.name,
    required this.startDate,
    required this.topics,
    required this.updatedAt,
  });

  
  factory Season.fromJson(Map<String, dynamic> json) {
    return Season(
        id: json['_id'],
        name: json['name'],
        startDate: json['startDate'],
        endDate: json['endDate'],
        createdAt:  json['createdAt'],
        updatedAt: json['updatedAt'],
        topics: List<Topic>.from(
          json["topics"].map(
            (x) => Topic.fromJson(x),
          ),
        ));
  }

}
