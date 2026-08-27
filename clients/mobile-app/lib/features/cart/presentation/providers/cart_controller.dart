import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/cart_local_datasource.dart';
import '../../data/models/cart_item.dart';

final cartControllerProvider =
    StateNotifierProvider<CartController, List<CartItem>>(
  (ref) => CartController(),
);

class CartController extends StateNotifier<List<CartItem>> {
  final _local = CartLocalDataSource();

  CartController() : super([]) {
    _load();
  }

  Future<void> _load() async {
    state = await _local.get();
  }

  Future<void> add(CartItem item) async {
    final existing = state.indexWhere(
        (e) => e.productId == item.productId);

    if (existing >= 0) {
      state[existing] =
          state[existing].copyWith(quantity: state[existing].quantity + 1);
    } else {
      state = [...state, item];
    }

    await _local.save(state);
  }

  Future<void> remove(String productId) async {
    state = state.where((e) => e.productId != productId).toList();
    await _local.save(state);
  }

  double get total =>
      state.fold(0, (sum, item) => sum + item.total);
}