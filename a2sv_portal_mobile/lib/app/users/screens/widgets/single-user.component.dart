import 'dart:io';

import 'package:a2sv_portal_mobile/app/users/screens/user_profile.dart';
import 'package:a2sv_portal_mobile/utils/colors.dart';
import 'package:a2sv_portal_mobile/widgets/buttons/main-button.dart';
import 'package:a2sv_portal_mobile/widgets/inputs/main-input-field.dart';
import 'package:a2sv_portal_mobile/widgets/inputs/main-text-area.dart';
import 'package:csc_picker/csc_picker.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class SingleUser extends StatefulWidget {
  const SingleUser({Key? key}) : super(key: key);

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const SingleUser());
  }

  SingleUserPage createState() => SingleUserPage();
}

class SingleUserPage extends State {
  File? image;
  String countryValue = "";
  String stateValue = "";
  String cityValue = "";
  String address = "";

  Future pickImage() async {
    try {
      final img = await ImagePicker().pickImage(source: ImageSource.gallery);
      if (img == null) {
        return;
      }
      final imageTemp = File(img.path);
      setState(() {
        this.image = imageTemp;
      });
    } catch (e) {}
  }

  @override
  Widget build(BuildContext context) {
    final screenwidth = MediaQuery.of(context).size.width;
    final screenheight = MediaQuery.of(context).size.height;
    GlobalKey<CSCPickerState> _cscPickerKey = GlobalKey();

    return Scaffold(
        backgroundColor: Colors.white,
        body: Container(
          padding: EdgeInsets.symmetric(
              horizontal: screenwidth * 0.055, vertical: screenheight * 0.07),
          child: SingleChildScrollView(
            child: Column(
              children: [
                Row(
                  children: [
                    Container(
                      width: screenwidth * 0.28,
                      child: const Text(
                        'Welcome to A2SV portal',
                        style: TextStyle(
                            fontFamily: 'Urbanist',
                            fontSize: 20,
                            color: welcome_color),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.only(left: screenwidth * 0.45),
                      child: TextButton(
                          onPressed: () {
                            Navigator.push(context, UserProfile.route());
                          },
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

                        // margin: EdgeInsets.all(10),
                        child: LinearProgressIndicator(
                          backgroundColor: light_grey_color,
                          value: 0.4,
                          valueColor:
                              new AlwaysStoppedAnimation<Color>(progress_color),
                        )),
                    Container(
                      padding: EdgeInsets.only(left: screenwidth * 0.05),
                      child: const Text(
                        '22% completed',
                        style: TextStyle(
                            color: light_text_color,
                            fontSize: 12,
                            fontWeight: FontWeight.w500),
                      ),
                    )
                  ],
                ),
                SizedBox(
                  height: screenheight * 0.04,
                ),
                Row(
                  children: [
                    Stack(
                      children: [
                        CircleAvatar(
                            radius: 40,
                            backgroundColor: avatar_color,
                            child: image != null
                                ? CircleAvatar(
                                    radius: 40,
                                    backgroundImage: FileImage(image!),
                                  )
                                : Container()),
                        Positioned(
                            right: 0,
                            bottom: 0,
                            child: Container(
                              height: 30,
                              width: 30,
                              // color: progress_color,
                              decoration: const BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: progress_color),

                              child: InkWell(
                                  onTap: () {
                                    pickImage();
                                  },
                                  child: const Icon(
                                    Icons.add,
                                    color: Colors.white,
                                  )),
                            ))
                      ],
                    ),
                    Container(
                      padding: EdgeInsets.only(left: screenwidth * 0.025),
                      child: const Text(
                        'Upload your photo',
                        style: TextStyle(
                            fontSize: 20, fontWeight: FontWeight.w700),
                      ),
                    )
                  ],
                ),
                SizedBox(
                  height: screenheight * 0.02,
                ),
                MainInputField(
                    placeHolder: 'John',
                    color: field_bg_color,
                    iconData: Icons.person,
                    onChanged: (val) {}),
                MainInputField(
                    placeHolder: 'Doe',
                    color: field_bg_color,
                    iconData: Icons.person,
                    onChanged: (val) {}),
                MainInputField(
                    placeHolder: '+251  phone',
                    color: field_bg_color,
                    onChanged: (val) {}),
                SizedBox(
                  height: screenheight * 0.01,
                ),
                MainTextArea(
                  placeHolder: 'write Something about you',
                  color: field_bg_color,
                  onChanged: () {},
                ),
                SizedBox(
                  height: screenheight * 0.02,
                ),
                Container(
                    //  padding: EdgeInsets.symmetric(horizontal: 20),
                    // height: 600,
                    child: Column(
                  children: [
                    ///Adding CSC Picker Widget in app
                    CSCPicker(
                      ///Enable disable state dropdown [OPTIONAL PARAMETER]
                      showStates: false,

                      /// Enable disable city drop down [OPTIONAL PARAMETER]
                      showCities: false,

                      ///Enable (get flag with country name) / Disable (Disable flag) / ShowInDropdownOnly (display flag in dropdown only) [OPTIONAL PARAMETER]
                      flagState: CountryFlag.ENABLE,

                      ///Dropdown box decoration to style your dropdown selector [OPTIONAL PARAMETER] (USE with disabledDropdownDecoration)
                      dropdownDecoration: BoxDecoration(
                        borderRadius: BorderRadius.all(Radius.circular(10)),
                        color: field_bg_color,
                        // border:
                        //     Border.all(color: Colors.grey.shade300, width: 1)
                      ),

                      ///Disabled Dropdown box decoration to style your dropdown selector [OPTIONAL PARAMETER]  (USE with disabled dropdownDecoration)
                      disabledDropdownDecoration: BoxDecoration(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                          color: field_bg_color,
                          border: Border.all(
                              color: Colors.grey.shade300, width: 1)),

                      ///placeholders for dropdown search field
                      countrySearchPlaceholder: "Country",

                      ///labels for dropdown
                      countryDropdownLabel: "Country",

                      ///Default Country
                      defaultCountry: DefaultCountry.Ethiopia,

                      ///Disable country dropdown (Note: use it with default country)
                      //disableCountry: true,

                      ///selected item style [OPTIONAL PARAMETER]
                      selectedItemStyle: TextStyle(
                        color: Colors.black,
                        fontSize: 14,
                      ),

                      ///DropdownDialog Heading style [OPTIONAL PARAMETER]
                      dropdownHeadingStyle: TextStyle(
                          color: Colors.black,
                          fontSize: 17,
                          fontWeight: FontWeight.bold),

                      ///DropdownDialog Item style [OPTIONAL PARAMETER]
                      dropdownItemStyle: TextStyle(
                        color: Colors.black,
                        fontSize: 14,
                      ),

                      ///Dialog box radius [OPTIONAL PARAMETER]
                      dropdownDialogRadius: 10.0,

                      ///Search bar radius [OPTIONAL PARAMETER]
                      searchBarRadius: 10.0,
                      onCountryChanged: (value) {
                        setState(() {
                          ///store value in country variable
                          countryValue = value;
                        });
                      },

                      ///triggers once state selected in dropdown
                      onStateChanged: (value) {
                        setState(() {
                          ///store value in state variable
                          stateValue = value.toString();
                        });
                      },

                      ///triggers once city selected in dropdown
                      onCityChanged: (value) {
                        setState(() {
                          ///store value in city variable
                          cityValue = value.toString();
                        });
                      },
                    ),

                    ///print newly selected country state and city in Text Widget
                  ],
                )),
                SizedBox(
                  height: screenheight * 0.02,
                ),
                MainButton(
                    title: 'Continue',
                    color: progress_color,
                    onClick: () {
                      //Navigator.push(context, UserProfile.route());
                    }),
              ],
            ),
          ),
        ));
  }
}
