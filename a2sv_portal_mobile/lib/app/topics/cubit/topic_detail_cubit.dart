import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'topic_detail_state.dart';

class TopicDetailCubit extends Cubit<TopicDetailState> {
  TopicDetailCubit() : super(TopicDetailInitial());
}
