class OnBoardData {
  final String imgPath;
  final String text;
  final String desc;

  const OnBoardData({
    required this.imgPath,
    required this.text,
    required this.desc,
  });

  static const List<OnBoardData> screens = <OnBoardData>[
    OnBoardData(
      imgPath: 'assets/images/OnboardingPage1.png',
      text: "Track your progress",
      desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    ),
    OnBoardData(
      imgPath: 'assets/images/OnboardingPage2.png',
      text: "Easy to manage",
      desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    ),
    OnBoardData(
      imgPath: 'assets/images/OnboardingPage1.png',
      text: "All in one place",
      desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    ),
  ];
}
