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

  const HomeLoadSuccess(this.user);

  @override
  List<Object?> get props => [user];
}

class HomeLoadConsistencyData extends HomeState {
  @override
  List<Object?> get props => [];
}

class HomeOperationFailure extends HomeState {
  final String message;

  const HomeOperationFailure(this.message);
}
