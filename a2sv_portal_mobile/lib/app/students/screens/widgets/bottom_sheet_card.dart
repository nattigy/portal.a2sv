import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:a2sv_portal_mobile/widgets/buttons/main-button.dart';
import 'package:a2sv_portal_mobile/widgets/inputs/main-input-field.dart';
import 'package:a2sv_portal_mobile/widgets/text_views/card_title_text.dart';
import 'package:flutter/material.dart';

enum ProblemStatus { solved, notSolved, unableSolve }

class BottomSheetCard extends StatefulWidget {
  const BottomSheetCard({Key? key}) : super(key: key);

  @override
  State<BottomSheetCard> createState() => _BottomSheetCardState();
}

class _BottomSheetCardState extends State<BottomSheetCard> {
  ProblemStatus? status = ProblemStatus.solved;

  @override
  Widget build(BuildContext context) {
    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      decoration: const BoxDecoration(
              color: Colors.white,
          borderRadius: BorderRadius.horizontal(
              left: Radius.circular(20), right: Radius.circular(20))),
      child: StreamBuilder<Object>(
        stream: null,
        builder: (context, snapshot) {
          return SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 5,
                ),
                Align(
                  alignment: Alignment.topCenter,
                  child: Container(
                    width: 50,
                    height: 10,
                    decoration: const BoxDecoration(
                        borderRadius: BorderRadius.all(
                          Radius.circular(10),
                        ),
                        color: Color.fromRGBO(200, 200, 200, 1)),
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    CardTitleText(text: "Min cost of climbing stairs"),
                    Row(
                      children: [
                        Image.asset("assets/images/leetcode_icon.png"),
                        Text("Leetcode"),
                      ],
                    )
                  ],
                ),
                const Align(
                  alignment: Alignment.topLeft,
                  child: Chip(
                    backgroundColor: Color.fromRGBO(92, 184, 92, 0.22),
                    label: Text(
                      "Easy",
                      style: TextStyle(
                          fontSize: 12,
                          color: Color.fromRGBO(92, 184, 92, 1),
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
                          color: Color.fromRGBO(150, 150, 150, 1), fontSize: 16),
                    )),
                Align(
                  alignment: Alignment.topLeft,
                  child: Row(
                    children: [
                      Radio<ProblemStatus>(
                        fillColor:
                            MaterialStateColor.resolveWith((states) => Colors.green),
                        // contentPadding: EdgeInsets.symmetric(horizontal: 0,vertical: 0),
                        // title: Text("Solved"),
                        // selectedTileColor: Colors.green,
                        value: ProblemStatus.solved,
                        onChanged: (value) {
                          setState(() {
                            status = value;
                          });
                        },
                        groupValue: status,
                      ),
                      Text("Solved"),
                    ],
                  ),
                ),
                Align(
                  alignment: Alignment.topLeft,
                  child: Row(
                    children: [
                      Radio<ProblemStatus>(
                        //  contentPadding: EdgeInsets.symmetric(horizontal: 0,vertical: 0),
                
                        //  title: Text("Not solved"),
                        //selectedTileColor: Colors.orange,
                        value: ProblemStatus.notSolved,
                        fillColor:
                            MaterialStateColor.resolveWith((states) => Colors.orange),
                        onChanged: (value) {
                          setState(() {
                            status = value;
                          });
                        },
                        groupValue: status,
                      ),
                      Text("Not solved"),
                    ],
                  ),
                ),
                Align(
                  alignment: Alignment.topLeft,
                  child: Row(
                    children: [
                      Radio<ProblemStatus>(
        
                        value: ProblemStatus.unableSolve,
                        fillColor:
                            MaterialStateColor.resolveWith((states) => Colors.red),
                        onChanged: (value) {
                          setState(() {
                            status = value;
                          });
                        },
                        groupValue: status,
                      ),
                      Text("Unable to solve"),
                    ],
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                const Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "Number of Tries",
                    style: TextStyle(
                        color: Color.fromRGBO(150, 150, 150, 1), fontSize: 16),
                  ),
                ),
                Row(children: [
                  IconButton(
                    onPressed: () {},
                    icon: Icon(Icons.arrow_back_ios, color: Colors.grey,size: 10),
                  ),
                  Container(
                    width: 40,
                    height: 40,
                    padding: EdgeInsets.all(5),
                    decoration: BoxDecoration(
                      
                        borderRadius: BorderRadius.circular(10), color: Color.fromRGBO(251, 252, 255, 1)),
                    child: Center(child: Text("1")),
                  ),
                  IconButton(
                    onPressed: () {},
                    icon: Icon(Icons.arrow_forward_ios, color: Colors.grey,size: 10),
                  ),
                ]),
                
                
                  MainInputField(
                    iconData: Icons.alarm,
                  placeHolder: "Time Taken(min)",
                  color: const Color.fromRGBO(250, 251, 255, 1),
                  onChanged: (value){},
                ),
                 MainInputField(
                    iconData: Icons.calendar_month,
                  placeHolder: "Submission Date",
                  color: const Color.fromRGBO(250, 251, 255, 1),
                  onChanged: (value){},
                ),
                MainButton(
                    title: "Save", color: CustomColors.primaryColor!, onClick: () {})
              ],
            ),
          );
        }
      ),
    );
  }
}
