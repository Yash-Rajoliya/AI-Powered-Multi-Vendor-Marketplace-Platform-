import '../../cart/data/models/cart_item.dart';

class Order {
  final String id;
  final List<CartItem> items;
  final double total;

  Order({
    required this.id,
    required this.items,
    required this.total,
  });

  Map<String, dynamic> toJson() => {
        "items": items.map((e) => e.toJson()).toList(),
        "total": total,
      };
}