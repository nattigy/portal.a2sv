import 'package:a2sv_portal_mobile/app/topics/data/topic_detail_repository.dart';
import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'topic_detail.state.dart';

class TopicDetailBloc extends Cubit<TopicDetailState> {
  final TopicDetailRepository topicDetailRepository;
  TopicDetailBloc({required this.topicDetailRepository}) : super(TopicDetailInitial());
  Future<void> fetchTopic() async {
    try {
      emit(TopicDetailLoading());
      final Topic topic= await topicDetailRepository.fetchTopic();
      emit(TopicDetailSuccess(topic: topic));
    } catch (e) {
      print(e.toString());
      emit(TopicDetailError(errorMessage: e.toString()));
    }
  }
}
