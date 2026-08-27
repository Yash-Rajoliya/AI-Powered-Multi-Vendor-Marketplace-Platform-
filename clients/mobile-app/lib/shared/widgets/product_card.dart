import 'package:flutter/material.dart';
import '../../core/constants/app_spacing.dart';

class ProductCard extends StatelessWidget {
  final String title;
  final String image;
  final double price;

  const ProductCard({
    super.key,
    required this.title,
    required this.image,
    required this.price,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(AppSpacing.sm),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.network(image, fit: BoxFit.cover),
            ),
          ),
          const SizedBox(height: 8),
          Text(title),
          Text("₹$price"),
        ],
      ),
    );
  }
}