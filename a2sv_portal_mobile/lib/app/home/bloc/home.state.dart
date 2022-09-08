part of 'home.bloc.dart';

class HomeState extends Equatable {
  const HomeState();

  @override
  List<Object?> get props => [];
}

class HomeLoading extends HomeState {}

class HomeUnknown extends HomeState {}

class HomeLoadSuccess extends HomeState {
  final User user;
  final Consistency consistency;
  final ProblemStat problemStat;

  const HomeLoadSuccess({
    required this.problemStat,
    required this.user,
    required this.consistency,
  });

  @override
  List<Object?> get props => [user];
}

class HomeOperationFailure extends HomeState {
  final String message;

  const HomeOperationFailure(this.message);
}
