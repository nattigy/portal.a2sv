import 'package:a2sv_portal_mobile/app/topics/data/season_repository.dart';
import 'package:a2sv_portal_mobile/app/topics/data/topic_repository.dart';
import 'package:a2sv_portal_mobile/app/topics/models/season.dart';
import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';
import 'package:a2sv_portal_mobile/app/topics/season_bloc/season_state.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';



class SeasonBloc extends Cubit<SeasonState> {
  final SeasonRepository seasonRepository;

  SeasonBloc({required this.seasonRepository}) : super(SeasonInit());

  Future<void> fetchSeasons() async {
    try {
      emit(SeasonLoading());
      final List<Season> seasons = await seasonRepository.fetchSeasons();
      print("season "+ seasons.toString());
      emit(SeasonSuccess(seasons: seasons));
    } catch (e) {
   
      emit(SeasonError(errorMessage: e.toString()));
    }
  }
}
