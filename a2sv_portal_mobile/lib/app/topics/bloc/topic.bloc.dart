
import 'package:a2sv_portal_mobile/app/topics/bloc/topic.state.dart';
import 'package:a2sv_portal_mobile/app/topics/data/topic_repository.dart';
import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class TopicBloc extends Cubit<TopicState>{
  final TopicRepository topicRepository;
  TopicBloc({required this.topicRepository}) : super(TopicInit());

   Future<void> fetchTopics() async{
        try{
          emit(TopicLoading());
          final List<Topic> topics = await topicRepository.fetchTopics();
          emit(TopicSuccess(topics: topics));
        }
        catch(e){
            emit(TopicError(errorMessage: e.toString()));
        }
   }

  
}