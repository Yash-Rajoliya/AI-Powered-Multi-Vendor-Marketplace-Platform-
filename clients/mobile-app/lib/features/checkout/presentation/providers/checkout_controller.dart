import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../cart/presentation/providers/cart_controller.dart';
import '../../order/data/order_remote_datasource.dart';
import '../../order/domain/order.dart';
import '../../../../core/di/providers.dart';
import '../services/payment_service.dart';

final checkoutControllerProvider =
    AsyncNotifierProvider<CheckoutController, bool>(
  CheckoutController.new,
);

class CheckoutController extends AsyncNotifier<bool> {
  late final OrderRemoteDataSource _orderApi;
  final payment = PaymentService();

  @override
  Future<bool> build() async {
    final api = ref.read(apiClientProvider);
    _orderApi = OrderRemoteDataSource(api);
    return false;
  }

  Future<void> checkout() async {
    state = const AsyncLoading();

    state = await AsyncValue.guard(() async {
      final cart = ref.read(cartControllerProvider);

      final total =
          cart.fold(0.0, (sum, item) => sum + item.total);

      final success = await payment.processPayment(total);

      if (!success) throw Exception("Payment failed");

      final order = Order(
        id: DateTime.now().toString(),
        items: cart,
        total: total,
      );

      await _orderApi.createOrder(order);

      ref.read(cartControllerProvider.notifier).state = [];

      return true;
    });
  }
}