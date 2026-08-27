class CartItem {
  final String productId;
  final String title;
  final double price;
  final int quantity;

  CartItem({
    required this.productId,
    required this.title,
    required this.price,
    required this.quantity,
  });

  double get total => price * quantity;

  CartItem copyWith({int? quantity}) {
    return CartItem(
      productId: productId,
      title: title,
      price: price,
      quantity: quantity ?? this.quantity,
    );
  }

  Map<String, dynamic> toJson() => {
        "productId": productId,
        "title": title,
        "price": price,
        "quantity": quantity,
      };

  factory CartItem.fromJson(Map<String, dynamic> json) {
    return CartItem(
      productId: json['productId'],
      title: json['title'],
      price: (json['price'] as num).toDouble(),
      quantity: json['quantity'],
    );
  }
}