import 'package:intl/intl.dart';

class Formatters {
  static String currency(num? value, {String symbol = "₹", String fallback = "₹0.00"}) {
    if (value == null || value.isNaN || value.isInfinite) {
      return fallback;
    }

    try {
      final formatter = NumberFormat.currency(
        symbol: symbol,
        decimalDigits: 2,
        locale: "en_IN",
      );
      return formatter.format(value);
    } catch (_) {
      return fallback;
    }
  }
}