import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../utils/custom_colors.dart';
import '../../../widgets/buttons/main-button.dart';
import '../../auth/data/auth.repository.dart';
import '../../auth/screens/login.page.dart';
import '../models/onboard_data.dart';

class OnBoardingPage extends StatefulWidget {
  static const pageRoute = '/onboard';

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => OnBoardingPage());
  }

  @override
  _OnBoardingPageState createState() => _OnBoardingPageState();
}

class _OnBoardingPageState extends State<OnBoardingPage> {
  int currentIndex = 0;
  late PageController _pageController;
  List<OnBoardData> screens = OnBoardData.screens;

  @override
  void initState() {
    _pageController = PageController(initialPage: 0);
    super.initState();
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  _storeOnboardInfo() async {
    await RepositoryProvider.of<AuthenticationRepository>(context)
        .registerFirstTry();
  }

  Widget _buildPager() {
    return PageView.builder(
        itemCount: screens.length,
        controller: _pageController,
        onPageChanged: (int index) {
          setState(() {
            currentIndex = index;
          });
        },
        itemBuilder: (context, index) {
          return Padding(
            padding: EdgeInsets.symmetric(
                vertical: MediaQuery.of(context).size.width * 0.06,
                horizontal: MediaQuery.of(context).size.width * 0.03),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    SizedBox(height: MediaQuery.of(context).size.height * 0.09),
                    _buildImage(index),
                    SizedBox(height: MediaQuery.of(context).size.height * 0.03),
                    _buildHeadText(index),
                    SizedBox(height: MediaQuery.of(context).size.height * 0.03),
                    _buildDescText(index),
                    SizedBox(height: MediaQuery.of(context).size.height * 0.05),
                  ],
                ),
                Padding(
                  padding: EdgeInsets.only(
                      bottom: MediaQuery.of(context).size.height * 0.065),
                  child: _buildSlider(),
                ),
              ],
            ),
          );
        });
  }

  Widget _buildImage(int index) {
    return SizedBox(
      // height: 400,
      height: MediaQuery.of(context).size.height * 0.431,
      child: Image(
        // image: AssetImage("assets/images/OnboardingPage${index + 1}.png"),
        image: AssetImage(screens[index].imgPath),
      ),
    );
  }

  Widget _buildDescText(int index) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Text(
        screens[index].desc,
        textAlign: TextAlign.center,
        style: const TextStyle(
          color: Color(0xFF565656),
          fontSize: 14.0,
          fontWeight: FontWeight.w400,
        ),
      ),
    );
  }

  Widget _buildSlider() {
    return Container(
      color: Colors.white,
      child: currentIndex < screens.length - 1
          ? Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Container(
                  height: 10.0,
                  child: ListView.builder(
                    itemCount: screens.length,
                    shrinkWrap: true,
                    scrollDirection: Axis.horizontal,
                    itemBuilder: (context, index) {
                      return Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              margin:
                                  const EdgeInsets.symmetric(horizontal: 3.0),
                              width: currentIndex == index ? 25 : 10,
                              height: 5,
                              decoration: BoxDecoration(
                                color: currentIndex == index
                                    ? CustomColors.primaryColor
                                    : CustomColors
                                        .greyUnselectedOnboardingSlider,
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                            ),
                          ]);
                    },
                  ),
                ),
              ],
            )
          : Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: MediaQuery.of(context).size.width * 0.09),
              child: MainButton(
                title: "Get Started",
                color: const Color.fromRGBO(89, 86, 233, 1),
                onClick: () async {
                  await _storeOnboardInfo();
                  if (!mounted) {
                    return;
                  }
                  Navigator.pushAndRemoveUntil<void>(
                    context,
                    LoginPage.route(),
                    (route) => false,
                  );
                },
              ),
            ),
    );
  }

  Widget _buildHeadText(int index) {
    return Text(
      screens[index].text,
      textAlign: TextAlign.center,
      style: const TextStyle(
        fontSize: 20.0,
        fontWeight: FontWeight.w700,
        color: Colors.black,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      // appBar: _buildBackAndSkip(),
      body: _buildPager(),
    );
  }
}
