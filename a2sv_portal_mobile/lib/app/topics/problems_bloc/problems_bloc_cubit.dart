import 'package:a2sv_portal_mobile/app/topics/data/problem_repository.dart';
import 'package:a2sv_portal_mobile/app/topics/models/problem.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'problems_bloc_state.dart';

class ProblemsBloc extends Cubit<ProblemsBlocState> {
  final ProblemsRepository problemsRepository;
  ProblemsBloc({required this.problemsRepository}) : super(ProblemsBlocInitial());

    Future<void> fetchProblems(String id) async {
    try {
      emit(ProblemsBlocLoading());
      final List<Problem> problems= await problemsRepository.fetchProblems(id);
      emit(ProblemsBlocSuccess(problems: problems));
    } catch (e) {
     
      emit(ProblemBlocError(errorMessage: e.toString()));
    }
  }
}
