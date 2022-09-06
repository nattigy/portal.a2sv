import 'package:a2sv_portal_mobile/app/groups/bloc/group.bloc.dart';
import 'package:a2sv_portal_mobile/app/groups/bloc/group.state.dart';
import 'package:a2sv_portal_mobile/widgets/cards/margin_container.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'widgets/group_info_card.dart';

class GroupTab extends StatelessWidget {
  const GroupTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
        body: SafeArea(
      child: Container(
          padding: EdgeInsets.symmetric(
              horizontal: screenWidth * 0.04, vertical: screenHeight * 0.02),
          child: BlocBuilder<GroupBloc, GroupState>(
            builder: (context, state) {
              if (state is GroupInit) {
                context.read<GroupBloc>().fetchGroups();
                return CircularProgressIndicator();
              } else if (state is GroupSuccess) {
                final groups = state.groups;
                if (groups.isEmpty) {
                  return const Center(
                      child: Text(
                    'no groups',
                  ));
                }
                return ListView.separated(
                  scrollDirection: Axis.vertical,
                  shrinkWrap: true,
                  itemCount: groups.length,
                  itemBuilder: (context, index) {
                    return Container(
                      child: GroupInfoCard(group: groups[index]),
                    );
                  },
                  separatorBuilder: (context, index) {
                    return const SizedBox(
                      height: 10,
                    );
                  },
                );
              } else if (state is GroupError) {
                return RefreshIndicator(
                    onRefresh: () async {
                      context.read<GroupBloc>().fetchGroups();
                    },
                    child: Text('Error'));
              } else {
                return CircularProgressIndicator();
              }
            },
          )),
    ));
  }
}
