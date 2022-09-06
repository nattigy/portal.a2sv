import 'package:a2sv_portal_mobile/app/groups/bloc/group.state.dart';
import 'package:a2sv_portal_mobile/app/groups/data/group_repository.dart';
import 'package:a2sv_portal_mobile/app/groups/model/group.dart';
import 'package:flutter_bloc/flutter_bloc.dart';



class GroupBloc extends Cubit<GroupState> {
  final GroupRepository groupRepository;

  GroupBloc({required this.groupRepository}) : super(GroupInit());

  Future<void> fetchGroups() async {
    try {
      emit(GroupLoading());
      final List<Group> groups= await groupRepository.fetchGroups();
      emit(GroupSuccess(groups: groups));
    } catch (e) {
      print(e.toString());
      emit(GroupError(errorMessage: e.toString()));
    }
  }
}
