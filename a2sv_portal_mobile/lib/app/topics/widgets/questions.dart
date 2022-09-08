// ignore_for_file: sort_child_properties_last

import 'package:a2sv_portal_mobile/app/topics/entity/question.entity.dart';
import 'package:a2sv_portal_mobile/app/topics/problems_bloc/problems_bloc_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'single_question.dart';

class Questions extends StatelessWidget {
  final String id;
  const Questions({Key? key, required this.id}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    var style = const TextStyle(
        fontWeight: FontWeight.w500,
        fontSize: 14,
        color: Color.fromRGBO(88, 88, 88, 1));
    return SingleChildScrollView(
      child: Column(
        children: [
          SizedBox(
            height: height * 0.02,
          ),
          BlocBuilder<ProblemsBloc, ProblemsBlocState>(
            builder: (context, state) {
              if (state is ProblemsBlocInitial) {
                context.read<ProblemsBloc>().fetchProblems(id);
                return Column(
                  children: [
                    Center(child: CircularProgressIndicator()),
                  ],
                );
              } else if (state is ProblemsBlocSuccess) {
                return Column(
                  children: [
                    ...state.problems.map((question) {
                      return SingleQuestion(
                        problem: question,
                      );
                    }).toList()
                  ],
                );
              }
              else{
                return Column(
                  children: [
                    Center(child: CircularProgressIndicator()),
                  ],
                );
              }
            },
          ),
        ],
      ),
    );
  }
}
