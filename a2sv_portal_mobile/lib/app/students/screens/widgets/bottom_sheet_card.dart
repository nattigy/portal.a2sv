import 'package:a2sv_portal_mobile/app/students/screens/widgets/radion_buttons.dart';
import 'package:a2sv_portal_mobile/app/topics/models/problem.dart';
import 'package:a2sv_portal_mobile/app/topics/problems_bloc/problems_bloc_cubit.dart';
import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:a2sv_portal_mobile/widgets/buttons/main-button.dart';
import 'package:a2sv_portal_mobile/widgets/inputs/main-input-field.dart';
import 'package:a2sv_portal_mobile/widgets/text_views/card_title_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class BottomSheetCard extends StatefulWidget {
  final Problem problem;
  const BottomSheetCard({Key? key, required this.problem}) : super(key: key);
  @override
  State<BottomSheetCard> createState() => _BottomSheetCardState();
}

class _BottomSheetCardState extends State<BottomSheetCard> {
  ProblemStatus? status;
  int numOfTries = 1;

  void onChange(value) {
    setState(() {
      status = value;
    });
  }
  void increment() {
    setState(() {
      numOfTries++;;
    });
  }
    void decrement() {
    setState(() {
      if(numOfTries > 1)
        numOfTries--;
    });
  }
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    status = widget.problem.status;
    numOfTries = widget.problem.numOfTries;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.horizontal(
              left: Radius.circular(20), right: Radius.circular(20))),
      child: StreamBuilder<Object>(
          stream: null,
          builder: (context, snapshot) {
            return Column(
              children: [
                const SizedBox(height: 8),
                Align(
                  alignment: Alignment.topCenter,
                  child: Container(
                    width: 50,
                    height: 6,
                    decoration: const BoxDecoration(
                        borderRadius: BorderRadius.all(
                          Radius.circular(10),
                        ),
                        color: Color.fromRGBO(200, 200, 200, 1)),
                  ),
                ),
                const SizedBox(height: 8),
                Expanded(
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          height: 20,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                              width: 250,
                              child: Text(
                                widget.problem.title,
                                overflow: TextOverflow.ellipsis,
                                maxLines: 2,
                                style: const TextStyle(
                                    fontWeight: FontWeight.w600, fontSize: 20),
                              ),
                            ),
                            Row(
                              children: [
                                Image.asset("assets/images/leetcode_icon.png"),
                                Text(widget.problem.platform),
                              ],
                            )
                          ],
                        ),
                        Align(
                          alignment: Alignment.topLeft,
                          child: Chip(
                            padding: EdgeInsets.all(8),
                            backgroundColor: widget.problem.difficulty == "Easy"
                                ? Color.fromRGBO(92, 184, 92, 0.22)
                                : widget.problem.difficulty == "Medium"
                                    ? Color.fromRGBO(246, 161, 41, 0.22)
                                    : Color.fromRGBO(
                                        235, 79, 79, 0.22), //CircleAvatar
                            label: Text(
                              widget.problem.difficulty,
                              style: TextStyle(
                                  fontSize: 12,
                                  color: widget.problem.difficulty == "Easy"
                                      ? Color.fromRGBO(92, 184, 92, 1)
                                      : widget.problem.difficulty == "Medium"
                                          ? Color.fromRGBO(246, 161, 41, 1)
                                          : Color.fromRGBO(235, 79, 79, 1),
                                  fontWeight: FontWeight.bold),
                            ), //Text
                          ),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        const Align(
                            alignment: Alignment.topLeft,
                            child: Text(
                              "status",
                              style: TextStyle(
                                  color: Color.fromRGBO(150, 150, 150, 1),
                                  fontSize: 16),
                            )),
                        RadioButton(
                            status: status,
                            title: "solved",
                            color: Colors.green,
                            onchange: onChange,
                            value: ProblemStatus.SOLVED),
                        RadioButton(
                            status: status,
                            title: "Not solved",
                            color: Colors.orange,
                            onchange: onChange,
                            value: ProblemStatus.NOT_SOLVED),
                        RadioButton(
                            status: status,
                            title: "unable to solve",
                            color: Colors.red,
                            onchange: onChange,
                            value: ProblemStatus.UNABLE_TO_SOLVE),
                        SizedBox(
                          height: 20,
                        ),
                        const Align(
                          alignment: Alignment.topLeft,
                          child: Text(
                            "Number of Tries",
                            style: TextStyle(
                                color: Color.fromRGBO(150, 150, 150, 1),
                                fontSize: 16),
                          ),
                        ),
                        Row(children: [
                          IconButton(
                            onPressed: () =>decrement(),
                            icon: Icon(Icons.arrow_back_ios,
                                color: Colors.grey, size: 10),
                          ),
                          Container(
                            width: 40,
                            height: 40,
                            padding: EdgeInsets.all(5),
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(10),
                                color: Color.fromRGBO(251, 252, 255, 1)),
                            child: Center(child: Text(numOfTries.toString())),
                          ),
                          IconButton(
                            onPressed: () => increment(),
                            icon: Icon(Icons.arrow_forward_ios,
                                color: Colors.grey, size: 10),
                          ),
                        ]),
                        MainInputField(
                          iconData: Icons.alarm,
                          placeHolder: "Time Taken(min)",
                          color: const Color.fromRGBO(250, 251, 255, 1),
                          onChanged: (value) {},
                        ),
                        MainInputField(
                          iconData: Icons.calendar_month,
                          placeHolder: "Submission Date",
                          color: const Color.fromRGBO(250, 251, 255, 1),
                          onChanged: (value) {},
                        ),
                        MainButton(
                            title: "Save",
                            color: CustomColors.primaryColor,
                            onClick: () {
                              
                              context.read<ProblemsBloc>().updateProblem(widget.problem.id, status!,numOfTries);
                              Navigator.pop(context);
                            }),
                        // ElevatedButton(
                        //     style: Theme.of(context)
                        //         .copyWith()
                        //         .elevatedButtonTheme
                        //         .style,
                        //     child: Text("Save"),
                        //     onPressed: () {})
                      ],
                    ),
                  ),
                ),
              ],
            );
          }),
    );
  }
}
