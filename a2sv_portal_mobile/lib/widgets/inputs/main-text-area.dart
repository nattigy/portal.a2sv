import 'package:flutter/material.dart';

class MainTextArea extends StatelessWidget {
  final String placeHolder;
  final Color? color;
  final Function onChanged;

  const MainTextArea(
      {Key? key,
      required this.placeHolder,
      required this.color,
      required this.onChanged})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final screenwidth = MediaQuery.of(context).size.width;
    final screenheight = MediaQuery.of(context).size.height;

    const customOutlineInputBorder = OutlineInputBorder(
      borderRadius: BorderRadius.all(
        Radius.circular(10),
      ),
      borderSide: BorderSide.none,
    );
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: screenwidth * 0.01),
      child: TextFormField(
        onChanged: (value) => onChanged(),
        minLines: 3,
        maxLines: 5,
        decoration: InputDecoration(
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
