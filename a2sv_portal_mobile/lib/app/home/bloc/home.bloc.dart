import 'package:a2sv_portal_mobile/app/home/models/consistency.entity.dart';
import 'package:a2sv_portal_mobile/app/home/models/problem_stat.entity.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../users/data/users.repository.dart';
import '../../users/entity/users.entity.dart';
import '../data/home.repository.dart';

part 'home.state.dart';

class HomeBloc extends Cubit<HomeState> {
  final UserRepository usersRepository;
  final HomeRepository homeRepository;

  HomeBloc({required this.usersRepository, required this.homeRepository})
      : super(HomeUnknown());

  void loadHome() async {
    emit(HomeLoading());
    try {
      User? user = await usersRepository.getLocalUser();
      Consistency consistency = await homeRepository.loadConsistencyDiagram("2022");
      ProblemStat problemStat = await homeRepository.loadProblemStats();
      emit(HomeLoadSuccess(
        user: user!,
        consistency: consistency,
        problemStat: problemStat,
      ));
    } catch (e) {
      emit(HomeOperationFailure(e.toString()));
    }
  }
}
