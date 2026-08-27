class PaymentService {
  Future<bool> processPayment(double amount) async {
    // Placeholder for Stripe integration
    await Future.delayed(const Duration(seconds: 2));
    return true;
  }
}