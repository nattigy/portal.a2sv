import 'package:a2sv_portal_mobile/widgets/inputs/main-input-field.dart';
import 'package:flutter/material.dart';

class SinglePlatform extends StatelessWidget {
  final String fieldTitle;
  final String imageURL;
  final Color? color;
  final Function onChange;

  const SinglePlatform(
      {Key? key,
      required this.fieldTitle,
      required this.imageURL,
      this.color,
      required this.onChange})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Image.asset(imageURL),
        const SizedBox(
          width: 20,
        ),
        Expanded(
          flex: 2,
          child: MainInputField(
            placeHolder: fieldTitle,
            color: const Color.fromRGBO(250, 251, 255, 1),
            onChanged: onChange,
          ),
        ),
      ],
    );
  }
}
