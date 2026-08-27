import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        children: [
          _buildPage("Discover Products"),
          _buildPage("AI Recommendations"),
          _buildPage("Fast Checkout"),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          context.go('/login');
        },
        child: const Icon(Icons.arrow_forward),
      ),
    );
  }

  Widget _buildPage(String text) {
    return Center(child: Text(text));
  }
}