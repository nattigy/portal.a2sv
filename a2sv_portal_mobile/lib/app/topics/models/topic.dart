import 'package:a2sv_portal_mobile/app/topics/models/problem.dart';
import 'package:a2sv_portal_mobile/app/topics/models/season.dart';
import 'package:equatable/equatable.dart';

class Topic extends Equatable {
  final String id;
  final String name;
  final String? description;
 

  Topic(
      {required this.id,
      required this.name,
      required this.description,
      });

  factory Topic.fromJson(Map<String, dynamic> json) {
    return Topic(
        id: json['id'],
        name: json['name'],
        description: json['description'],
        
        );
  }

  @override
  List<Object?> get props => [];
}

