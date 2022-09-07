class Consistency {
  final List<Month> months;
  final String year;

  Consistency({required this.year, required this.months});
}

class Month {
  final List<DailyStat> days;

  Month(this.days);
}

class DailyStat {
  final int totalProblems;

  DailyStat(this.totalProblems);
}
