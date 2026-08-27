import 'package:dio/dio.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/network/endpoints.dart';
import '../models/product.dart';

class ProductRemoteDataSource {
  final ApiClient api;

  ProductRemoteDataSource(this.api);

  Future<List<Product>> fetchProducts(int page) async {
    final response = await api.dio.get(
      Endpoints.products,
      queryParameters: {'page': page},
    );

    final List data = response.data['data'];

    return data.map((e) => Product.fromJson(e)).toList();
  }

  Future<Product> fetchProductById(String id) async {
    final response = await api.dio.get(
      "${Endpoints.products}/$id",
    );

    return Product.fromJson(response.data['data']);
  }
}