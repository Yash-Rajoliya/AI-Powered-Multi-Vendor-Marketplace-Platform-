import '../../../../core/network/api_client.dart';
import '../../../../core/network/endpoints.dart';
import '../models/order.dart';

class OrderRemoteDataSource {
  final ApiClient api;

  OrderRemoteDataSource(this.api);

  Future<void> createOrder(Order order) async {
    await api.dio.post(
      Endpoints.orders,
      data: order.toJson(),
    );
  }
}