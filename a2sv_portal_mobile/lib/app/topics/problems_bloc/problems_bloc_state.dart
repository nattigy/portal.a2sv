part of 'problems_bloc_cubit.dart';

abstract class ProblemsBlocState extends Equatable {
  const ProblemsBlocState();

  @override
  List<Object?> get props => [];
}

class ProblemsBlocInitial extends ProblemsBlocState {}
class ProblemsBlocLoading extends ProblemsBlocState {}
class ProblemsBlocSuccess extends ProblemsBlocState {
  final List<Problem> problems;

  const ProblemsBlocSuccess({this.problems = const []});
  @override
  List<Object?> get props => [problems];

}

class ProblemBlocError extends ProblemsBlocState {
  final String? errorMessage;

  ProblemBlocError({this.errorMessage});
}