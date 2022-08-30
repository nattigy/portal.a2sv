import 'package:flutter/material.dart';

class MainButton extends StatelessWidget {
  final String title;
  final Color? color;
  final Function function;
  const MainButton({Key? key, required this.title, this.color, required this.function}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 350,
      height: 50,
      child: ElevatedButton(

        onPressed: () {},
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all<Color>(
            color!,
          ),
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
            const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(
                Radius.circular(10),
              ),
            ),
          ),
        ),
        child: Text(title),
      ),
    );
  }
}
