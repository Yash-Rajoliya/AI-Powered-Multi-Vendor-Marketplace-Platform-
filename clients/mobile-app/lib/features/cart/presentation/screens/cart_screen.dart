import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/cart_controller.dart';
import '../../checkout/presentation/providers/checkout_controller.dart';

class CartScreen extends ConsumerWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cart = ref.watch(cartControllerProvider);
    final checkout = ref.watch(checkoutControllerProvider);

    return Scaffold(
      appBar: AppBar(title: const Text("Cart")),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              children: cart
                  .map((e) => ListTile(
                        title: Text(e.title),
                        trailing: Text("₹${e.total}"),
                      ))
                  .toList(),
            ),
          ),
          checkout.isLoading
              ? const CircularProgressIndicator()
              : ElevatedButton(
                  onPressed: () {
                    ref
                        .read(checkoutControllerProvider.notifier)
                        .checkout();
                  },
                  child: const Text("Checkout"),
                )
        ],
      ),
    );
  }
}