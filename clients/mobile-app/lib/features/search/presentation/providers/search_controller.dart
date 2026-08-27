import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/utils/debouncer.dart';
import '../../../../core/di/providers.dart';
import '../../product/domain/entities/product.dart';

final searchControllerProvider =
    StateNotifierProvider<SearchController, List<Product>>(
  (ref) => SearchController(ref),
);

class SearchController extends StateNotifier<List<Product>> {
  final Ref ref;
  final debouncer = Debouncer(milliseconds: 500);

  SearchController(this.ref) : super([]);

  void search(String query) {
    debouncer.run(() async {
      final api = ref.read(apiClientProvider);

      final res = await api.dio.get("/products/search?q=$query");

      state = (res.data as List)
          .map((e) => Product.fromJson(e))
          .toList();
    });
  }
}