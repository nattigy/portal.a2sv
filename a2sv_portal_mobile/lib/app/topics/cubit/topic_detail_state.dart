part of 'topic_detail_cubit.dart';

abstract class TopicDetailState extends Equatable {
  const TopicDetailState();
  @override
  List<Object?> get props => [];
}

class TopicDetailInitial extends TopicDetailState {}

class TopicDetailSuccess extends TopicDetailState {
    final Topic topic;

     const TopicDetailSuccess({required this.topic});

  @override
  List<Object?> get props => [topic];
}

class TopicDetailLoading extends TopicDetailState {}