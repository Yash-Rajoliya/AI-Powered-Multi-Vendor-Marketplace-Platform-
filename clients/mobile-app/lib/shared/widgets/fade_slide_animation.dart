import 'package:flutter/material.dart';

class FadeSlideAnimation extends StatelessWidget {
  final Widget child;

  const FadeSlideAnimation({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder(
      tween: Tween(begin: 30.0, end: 0),
      duration: const Duration(milliseconds: 500),
      builder: (context, value, child) {
        return Transform.translate(
          offset: Offset(0, value),
          child: Opacity(
            opacity: 1 - (value / 30),
            child: child,
          ),
        );
      },
      child: child,
    );
  }
}