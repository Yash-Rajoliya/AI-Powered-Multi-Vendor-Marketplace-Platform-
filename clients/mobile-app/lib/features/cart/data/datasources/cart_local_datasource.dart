import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/cart_item.dart';

class CartLocalDataSource {
  static const _key = "cart";

  Future<void> save(List<CartItem> items) async {
    final prefs = await SharedPreferences.getInstance();

    final jsonList =
        items.map((e) => jsonEncode(e.toJson())).toList();

    await prefs.setStringList(_key, jsonList);
  }

  Future<List<CartItem>> get() async {
    final prefs = await SharedPreferences.getInstance();

    final list = prefs.getStringList(_key) ?? [];

    return list
        .map((e) => CartItem.fromJson(jsonDecode(e)))
        .toList();
  }

  Future<void> clear() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_key);
  }
}