import 'dart:io';

import 'package:a2sv_portal_mobile/utils/colors.dart';
import 'package:a2sv_portal_mobile/widgets/buttons/drop_down_button.dart';
import 'package:a2sv_portal_mobile/widgets/buttons/main-button.dart';
import 'package:a2sv_portal_mobile/widgets/inputs/main-input-field.dart';
import 'package:dotted_border/dotted_border.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';

class UserProfile extends StatefulWidget {
  const UserProfile({Key? key}) : super(key: key);

  // static const pageRoute = "/userprofile";
  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const UserProfile());
  }

  UserPage createState() => UserPage();
}

class UserPage extends State with SingleTickerProviderStateMixin {
  final List<String> educationItems = ['Continuing', 'graduated'];
  final List<String> workItems = ['comptetive', 'student', 'Employed'];
  String? selectedValue;
  String? selectedWorkValue;
  late AnimationController loadingController;
  File? _file;
  PlatformFile? _platformFile;

  selectFile() async {
    loadingController.value = 0;
    final file = await FilePicker.platform
        .pickFiles(type: FileType.custom, allowedExtensions: ['pdf']);

    if (file != null) {
      setState(() {
        _file = File(file.files.single.path!);
        _platformFile = file.files.first;
      });
    }

    loadingController.forward();
  }

  @override
  void initState() {
    loadingController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    )..addListener(() {
        setState(() {});
      });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final screenwidth = MediaQuery.of(context).size.width;
    final screenheight = MediaQuery.of(context).size.height;

    return Scaffold(
        backgroundColor: Colors.white,
        body: Container(
            padding: EdgeInsets.symmetric(
                horizontal: screenwidth * 0.055, vertical: screenheight * 0.07),
            child: SingleChildScrollView(
                child: Column(children: [
              Row(
                children: [
                  Container(
                    width: screenwidth * 0.28,
                    child: const Text(
                      'Education & career',
                      style: TextStyle(
                          fontFamily: 'Urbanist',
                          fontSize: 20,
                          color: welcome_color),
                    ),
                  ),
                  Container(
                    padding: EdgeInsets.only(left: screenwidth * 0.45),
                    child: TextButton(
                        onPressed: () {},
                        child: const Text(
                          'skip',
                          style: TextStyle(color: light_text_color),
                        )),
                  )
                ],
              ),
              SizedBox(
                height: screenheight * 0.02,
              ),
              Row(
                children: [
                  Container(
                      width: screenwidth * 0.55,
                      alignment: Alignment.topLeft,
                      child: LinearProgressIndicator(
                        backgroundColor: light_grey_color,
                        value: 0.6,
                        valueColor:
                            new AlwaysStoppedAnimation<Color>(progress_color),
                      )),
                  Container(
                    padding: EdgeInsets.only(left: screenwidth * 0.05),
                    child: const Text(
                      '47% completed',
                      style: TextStyle(
                          color: light_text_color,
                          fontSize: 12,
                          fontWeight: FontWeight.w500),
                    ),
                  )
                ],
              ),
              SizedBox(
                height: screenheight * 0.03,
              ),
              MainInputField(
                  placeHolder: 'Education Institute',
                  color: field_bg_color,
                  iconData: Icons.school,
                  onChanged: () {}),
              SizedBox(
                height: screenheight * 0.01,
              ),
              DropDownBtn(
                  placeHolder: 'current Education Status',
                  fillColor: field_bg_color,
                  focusColor: progress_color,
                  preicon: const Icon(Icons.school),
                  iconData: Icons.keyboard_arrow_down,
                  onChanged: () {},
                  onSaved: () {},
                  items: educationItems),
              SizedBox(
                height: screenheight * 0.02,
              ),
              DropDownBtn(
                  placeHolder: 'current working status',
                  preicon: const Icon(Icons.work),
                  fillColor: field_bg_color,
                  focusColor: progress_color,
                  iconData: Icons.keyboard_arrow_down,
                  onChanged: () {},
                  onSaved: () {},
                  items: workItems),
              SizedBox(height: screenheight * 0.02),
              GestureDetector(
                onTap: selectFile,
                child: Padding(
                    padding: EdgeInsets.symmetric(
                        horizontal: screenwidth * 0.04,
                        vertical: screenheight * 0.02),
                    child: DottedBorder(
                      borderType: BorderType.RRect,
                      radius: Radius.circular(10),
                      dashPattern: [10, 4],
                      strokeCap: StrokeCap.round,
                      color: progress_color,
                      child: Container(
                        width: double.infinity,
                        height: screenheight * 0.1,
                        decoration: BoxDecoration(
                            color: Colors.blue.shade50.withOpacity(.3),
                            borderRadius: BorderRadius.circular(10)),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(
                              Icons.file_copy,
                              color: progress_color,
                              size: 40,
                            ),
                            SizedBox(
                              width: screenwidth * 0.02,
                            ),
                            const Text(
                              'Attach Your CV',
                              style: TextStyle(
                                  fontSize: 15, color: progress_color),
                            ),
                          ],
                        ),
                      ),
                    )),
              ),
              _platformFile != null
                  ? Container(
                      padding: EdgeInsets.symmetric(
                          horizontal: screenwidth * 0.04,
                          vertical: screenheight * 0.02),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Selected File',
                            style: TextStyle(
                              color: Colors.grey.shade400,
                              fontSize: 15,
                            ),
                          ),
                          SizedBox(
                            height: screenheight * 0.01,
                          ),
                          Container(
                              padding: EdgeInsets.symmetric(
                                  horizontal: screenwidth * 0.02,
                                  vertical: screenheight * 0.01),
                              decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(10),
                                  color: Colors.white,
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.grey.shade200,
                                      offset: Offset(0, 1),
                                      blurRadius: 3,
                                      spreadRadius: 2,
                                    )
                                  ]),
                              child: Row(
                                children: [
                                  ClipRRect(
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  Container(
                                    padding: EdgeInsets.only(
                                        right: screenwidth * 0.02),
                                    child: const Icon(Icons.file_present),
                                  ),
                                  Expanded(
                                      child: Container(
                                    padding: EdgeInsets.symmetric(
                                        vertical: screenheight * 0.01),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          _platformFile!.name,
                                          style: TextStyle(
                                              fontSize: 13,
                                              color: Colors.black),
                                        ),
                                        SizedBox(
                                          height: 5,
                                        ),
                                        Text(
                                          '${(_platformFile!.size / 1024).ceil()} KB',
                                          style: TextStyle(
                                              fontSize: 13,
                                              color: Colors.grey.shade500),
                                        ),
                                        SizedBox(
                                          height: 5,
                                        ),
                                        Container(
                                            height: screenheight * 0.008,
                                            clipBehavior: Clip.hardEdge,
                                            decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(5),
                                              color: Colors.blue.shade50,
                                            ),
                                            child: LinearProgressIndicator(
                                              value: loadingController.value,
                                            )),
                                      ],
                                    ),
                                  )),
                                  SizedBox(
                                    width: screenwidth * 0.01,
                                  ),
                                ],
                              )),
                          SizedBox(
                            height: screenheight * 0.02,
                          ),
                        ],
                      ))
                  : Container(),
              SizedBox(
                height: screenheight * 0.02,
              ),
              MainButton(
                  title: 'Continue',
                  color: progress_color,
                  onClick: () {
                    //Navigator.push(context, SingleUser.route());
                  }),
            ]))));
  }
}
