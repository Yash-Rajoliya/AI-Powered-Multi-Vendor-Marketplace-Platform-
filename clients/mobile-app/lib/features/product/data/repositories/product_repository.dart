import '../../../../core/network/safe_api_call.dart';
import '../datasources/product_remote_datasource.dart';
import '../models/product.dart';

class ProductRepository {
  final ProductRemoteDataSource remote;

  ProductRepository(this.remote);

  /// Fetch paginated products
  Future<List<Product>> fetchProducts(int page) async {
    return safeApiCall(() async {
      final products = await remote.fetchProducts(page);

      // 🔥 Hook: analytics / logging / caching can be added here
      return products;
    });
  }

  /// Fetch single product
  Future<Product> fetchProductById(String id) async {
    return safeApiCall(() => remote.fetchProductById(id));
  }
}