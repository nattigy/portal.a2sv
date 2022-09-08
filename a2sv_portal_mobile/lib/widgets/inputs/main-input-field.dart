import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:flutter/material.dart';
import 'package:formz/formz.dart';

class MainInputField extends StatelessWidget {
  final String placeHolder;
  final String? customLabelText;
  final Color? color;
  final Color? iconColor;
  final Color? fillColor;
  final IconData? iconData;
  final ValueChanged<String>? onChanged;
  final FormzInput? formzInput;
  final String? customErrorText;
  final bool obscureText;

  const MainInputField({
    Key? key,
    required this.placeHolder,
    required this.color,
    this.fillColor,
    this.iconData,
    required this.onChanged,
    this.formzInput,
    this.customLabelText,
    this.customErrorText,
    this.obscureText = false,
    this.iconColor,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const customOutlineInputBorder = OutlineInputBorder(
      borderRadius: BorderRadius.all(
        Radius.circular(10),
      ),
      borderSide: BorderSide.none,
    );
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
      child: TextFormField(
        onChanged: onChanged,
        decoration: InputDecoration(
          prefixIcon: Icon(
            iconData,
            color: iconColor,
          ),
          focusedBorder: customOutlineInputBorder,
          filled: true,
          fillColor: color,
          iconColor: CustomColors.primaryColor,
          focusColor: color,
          // fillColor: Color.fromRGBO(250, 251, 255, 1),
          border: customOutlineInputBorder,
          hintStyle: TextStyle(
            // color: Color.fromRGBO(164, 164, 164, 1),
            color: CustomColors.veryLightTextColor,
            fontSize: 12,
          ),
          hintText: placeHolder,
          labelText: customLabelText,
          errorText: formzInput == null
              ? null
              : (formzInput!.invalid ? customErrorText : null),
        ),
        obscureText: obscureText,
      ),
    );
  }
}
