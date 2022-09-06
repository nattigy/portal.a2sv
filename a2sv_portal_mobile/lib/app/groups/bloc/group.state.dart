import 'package:a2sv_portal_mobile/app/groups/model/group.dart';
import 'package:equatable/equatable.dart';

class GroupState extends Equatable {
  const GroupState();

  @override
  List<Object?> get props => [];
}

class GroupInit extends GroupState {
  const GroupInit();
}

class GroupLoading extends GroupState {}

class GroupSuccess extends GroupState {
  final List<Group> groups;

  GroupSuccess({this.groups = const []});

  @override
  List<Object?> get props => [groups];
}

class GroupError extends GroupState {
  final String? errorMessage;

  GroupError({this.errorMessage});
}
