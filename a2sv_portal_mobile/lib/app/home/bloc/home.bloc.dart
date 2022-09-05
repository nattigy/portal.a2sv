import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../users/data/users.repository.dart';
import '../../users/entity/users.entity.dart';
import '../data/home.repository.dart';

part 'home.state.dart';

class HomeBloc extends Cubit<HomeState> {
  final UserRepository usersRepository;
  final HomeRepository homeRepository;

  HomeBloc({required this.usersRepository, required this.homeRepository}) : super(HomeUnknown());

  void loadHome() async {
    emit(HomeLoading());
    try {
      final item = await usersRepository.getLocalUser();
      emit(HomeLoadSuccess(item!));
    } catch (e) {
      emit(HomeOperationFailure(e.toString()));
    }
  }

  void loadConsistencyDiagram() async {
    emit(HomeLoading());
    try {
      await homeRepository.loadConsistencyDiagram();
      emit(HomeLoadConsistencyData());
    } catch (e) {
      emit(HomeOperationFailure(e.toString()));
    }
  }
}
