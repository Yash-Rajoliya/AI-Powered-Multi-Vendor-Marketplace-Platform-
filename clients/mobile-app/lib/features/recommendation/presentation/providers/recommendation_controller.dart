import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/di/providers.dart';
import '../../product/domain/entities/product.dart';

final recommendationProvider =
    FutureProvider<List<Product>>((ref) async {
  final api = ref.read(apiClientProvider);

  final res = await api.dio.get("/ai/recommendations");

  return (res.data as List)
      .map((e) => Product.fromJson(e))
      .toList();
});