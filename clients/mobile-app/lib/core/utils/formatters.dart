import 'package:intl/intl.dart';

class Formatters {
  static String currency(double value) {
    return NumberFormat.currency(symbol: "₹").format(value);
  }
}