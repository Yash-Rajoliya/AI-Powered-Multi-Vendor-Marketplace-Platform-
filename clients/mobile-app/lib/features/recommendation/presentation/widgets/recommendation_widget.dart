import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../shared/widgets/product_card.dart';
import '../providers/recommendation_controller.dart';

class RecommendationWidget extends ConsumerWidget {
  const RecommendationWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final data = ref.watch(recommendationProvider);

    return data.when(
      data: (list) => SizedBox(
        height: 220,
        child: ListView(
          scrollDirection: Axis.horizontal,
          children: list
              .map((e) => ProductCard(
                    title: e.title,
                    image: e.image,
                    price: e.price,
                  ))
              .toList(),
        ),
      ),
      loading: () => const CircularProgressIndicator(),
      error: (e, _) => Text(e.toString()),
    );
  }
}