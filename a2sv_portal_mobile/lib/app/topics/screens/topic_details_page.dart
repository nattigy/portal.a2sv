import 'package:a2sv_portal_mobile/app/topics/topic_detail_bloc/topic_detail.bloc.dart';
import 'package:a2sv_portal_mobile/app/topics/widgets/questions_title.dart';
import 'package:a2sv_portal_mobile/widgets/cards/margin_container.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../widgets/questions.dart';
import '../widgets/topic_info.dart';

class TopicDetailsPage extends StatelessWidget {
  const TopicDetailsPage({Key? key}) : super(key: key);

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const TopicDetailsPage());
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<TopicDetailBloc, TopicDetailState>(
      builder: (context, state) {
        if (state is TopicDetailInitial) {
          context.read<TopicDetailBloc>().fetchTopic();
          return Scaffold(
            appBar: AppBar(
              automaticallyImplyLeading: true,
              iconTheme: IconThemeData(
                color: Colors.black, //change your color here
              ),
              backgroundColor: Colors.transparent,
              elevation: 0,
            ),
            body: Center(child: CircularProgressIndicator()),
          );
        } else if (state is TopicDetailSuccess) {
          return Scaffold(
            appBar: AppBar(
              automaticallyImplyLeading: true,
              iconTheme: IconThemeData(
                color: Colors.black, //change your color here
              ),
              backgroundColor: Colors.transparent,
              elevation: 0,
              centerTitle: true,
              title: Text(
                state is TopicDetailSuccess ? state.topic.name : "",
                style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.w600,
                    color: Colors.black),
              ),
            ),
            body: SafeArea(
              child: MarginContainer(
                  child: Column(
                children: [
                  TopicInfo(season: state.topic.season.name),
                  QuestionsTitle(),
                  Expanded(child: Questions()),
                ],
              )),
            ),
          );
        } else {
          return Scaffold(
            appBar: AppBar(
              automaticallyImplyLeading: true,
              iconTheme: IconThemeData(
                color: Colors.black, //change your color here
              ),
              backgroundColor: Colors.transparent,
              elevation: 0,
            ),
            body: Center(child: CircularProgressIndicator()),
          );
        }
      },
    );
  }
}
