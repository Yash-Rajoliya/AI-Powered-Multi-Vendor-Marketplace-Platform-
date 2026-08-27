import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/di/providers.dart';
import '../../data/product_repository.dart';
import '../../data/datasources/product_remote_datasource.dart';
import '../../domain/entities/product.dart';

final productControllerProvider =
    AsyncNotifierProvider<ProductController, List<Product>>(
  ProductController.new,
);

class ProductController extends AsyncNotifier<List<Product>> {
  late final ProductRepository _repo;

  int _page = 1;
  bool _hasMore = true;

  @override
  Future<List<Product>> build() async {
    final api = ref.read(apiClientProvider);

    _repo = ProductRepository(
      ProductRemoteDataSource(api),
    );

    return _fetch();
  }

  Future<List<Product>> _fetch() async {
    final data = await _repo.fetchProducts(_page);

    if (data.isEmpty) _hasMore = false;

    return data;
  }

  Future<void> loadMore() async {
    if (!_hasMore) return;

    _page++;

    final more = await _repo.fetchProducts(_page);

    state = AsyncData([...state.value!, ...more]);
  }
}