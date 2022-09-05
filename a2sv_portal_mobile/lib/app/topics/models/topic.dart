import 'package:equatable/equatable.dart';

class Topic extends Equatable{
  final int id;
  final String name;
  final String description;
  final int season_id;

  Topic({required this.id,required this.name,required this.description,required this.season_id});   

  factory Topic.fromJson(Map<String,dynamic> json){

      return Topic(
        id: json['_id'], 
        name: json['name'], 
        description: json['description'], 
        season_id: json['season_id']);
    }
  @override
List<Object?> get props => [];
  
}
