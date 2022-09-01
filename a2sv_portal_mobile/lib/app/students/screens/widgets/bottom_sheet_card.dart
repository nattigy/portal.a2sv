import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:a2sv_portal_mobile/widgets/buttons/main-button.dart';
import 'package:a2sv_portal_mobile/widgets/text_views/card_title_text.dart';
import 'package:flutter/material.dart';

class BottomSheetCard extends StatelessWidget {
  const BottomSheetCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          CardTitleText(text: "Min cost of climbing stairs"),
          MainButton(title: "Save", color: CustomColors.primaryColor, onClick: (){})
        ],
      ),
    );
  }
}
