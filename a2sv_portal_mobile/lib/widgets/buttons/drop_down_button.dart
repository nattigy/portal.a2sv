import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';

class DropDownBtn extends StatelessWidget {
  final String placeHolder;
  final Color? fillColor;
  final Color? focusColor;
  final IconData? iconData;
  final Widget? preicon;
  final Function onChanged;
  final Function onSaved;
  final List<String> items;
  const DropDownBtn(
      {Key? key,
      required this.placeHolder,
      this.preicon,
      this.fillColor,
      this.focusColor,
      this.iconData,
      required this.onChanged,
      required this.onSaved,
      required this.items})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
   
    const customOutlineInputBorder = OutlineInputBorder(
      borderRadius: BorderRadius.all(
        Radius.circular(10),
      ),
      borderSide: BorderSide.none,
    );
    return DropdownButtonFormField2(
      onChanged: (value) => onChanged(),
      onSaved: ((newValue) => onSaved()),
      icon: Icon(iconData),
      items: items
          .map((item) => DropdownMenuItem<String>(
                value: item,
                child: Text(
                  item,
                  style: const TextStyle(
                    fontSize: 14,
                  ),
                ),
              ))
          .toList(),
      decoration: InputDecoration(
        focusedBorder: customOutlineInputBorder,
        filled: true,
        prefixIcon: preicon,
        fillColor: fillColor,
        focusColor: focusColor,
        border: customOutlineInputBorder,
        hintStyle: const TextStyle(
            color: Color.fromRGBO(164, 164, 164, 1), fontSize: 12),
        hintText: placeHolder,
      ),
    );
  }
}
