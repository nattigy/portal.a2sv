import 'package:a2sv_portal_mobile/app/topics/models/topic.dart';
import 'package:equatable/equatable.dart';

class TopicState extends Equatable{
const TopicState();

@override
List<Object?> get props => [];
}
class TopicInit extends TopicState{

    const TopicInit();
}


class TopicLoading extends TopicState{

}

class TopicSuccess extends TopicState{
  final List<Topic> topics;
  TopicSuccess({this.topics = const []});
  @override
List<Object?> get props => [];
}

class TopicError extends TopicState{
  final String? errorMessage;
  TopicError({this.errorMessage});
}

