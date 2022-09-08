import 'package:a2sv_portal_mobile/app/topics/models/season.dart';
import 'package:equatable/equatable.dart';

class SeasonState extends Equatable {
  const SeasonState();

  @override
  List<Object?> get props => [];
}

class SeasonInit extends SeasonState {
  const SeasonInit();
}

class SeasonLoading extends SeasonState {}

class SeasonSuccess extends SeasonState {
  final List<Season> seasons;

  SeasonSuccess({this.seasons = const []});

  @override
  List<Object?> get props => [seasons];
}

class SeasonError extends SeasonState {
  final String? errorMessage;

  SeasonError({this.errorMessage});
}
