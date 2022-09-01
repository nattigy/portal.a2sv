import 'package:flutter/material.dart';

class MainInputField extends StatelessWidget {
  final String placeHolder;
  final Color? color;
  final IconData? iconData;
  final Function onChanged;

  const MainInputField(
      {Key? key,
      required this.placeHolder,
      required this.color,
      this.iconData,
      required this.onChanged})
      : super(key: key);

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
        onChanged: (value) => onChanged(),
        decoration: InputDecoration(
          prefixIcon: Icon(iconData),
          focusedBorder: customOutlineInputBorder,
          filled: true,

          fillColor: color,
          focusColor: color,
          // fillColor: Color.fromRGBO(250, 251, 255, 1),
          border: customOutlineInputBorder,
          hintStyle: const TextStyle(
              color: Color.fromRGBO(164, 164, 164, 1), fontSize: 12),
          hintText: placeHolder,
        ),
      ),
    );
  }
}
