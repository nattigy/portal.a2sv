import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';
import 'package:a2sv_portal_mobile/app/users/entity/users.entity.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

class Group extends Equatable {
  final String id;
  final String name;
  final String school;
  final List<Topic>? topics;
  final List<User>? users;

  Group(
      {required this.id,
      required this.school,
      required this.name,
      required this.topics,
      required this.users});

  factory Group.fromJson(Map<String, dynamic> json) {
    return Group(
      id: json['id'],
      name: json['name'],
      school: json['school'],
      topics: json['topics'] != null
          ? List<Topic>.from(
              json["topics"].map(
                (x) => Topic.fromJson(x),
              ),
            )
          : [],
      users: json['users'] == null
          ? []
          : List<User>.from(
              json["users"].map(
                (x) => User.fromJson(x),
              ),
            ),
    );
  }

  @override
  List<Object?> get props => [];
}
