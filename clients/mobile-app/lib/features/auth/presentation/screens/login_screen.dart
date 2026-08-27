import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../shared/widgets/app_button.dart';
import '../../../../shared/widgets/app_textfield.dart';
import '../providers/auth_controller.dart';

class LoginScreen extends ConsumerWidget {
  LoginScreen({super.key});

  final email = TextEditingController();
  final password = TextEditingController();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authControllerProvider);

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            const SizedBox(height: 100),
            AppTextField(controller: email, hint: "Email"),
            const SizedBox(height: 16),
            AppTextField(controller: password, hint: "Password"),
            const SizedBox(height: 24),
            authState.isLoading
                ? const CircularProgressIndicator()
                : AppButton(
                    text: "Login",
                    onTap: () {
                      ref
                          .read(authControllerProvider.notifier)
                          .login(email.text, password.text);
                    },
                  ),
          ],
        ),
      ),
    );
  }
}