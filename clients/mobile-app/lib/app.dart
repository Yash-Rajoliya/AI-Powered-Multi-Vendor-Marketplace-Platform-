import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/config/routes/app_router.dart';
import 'core/config/themes/app_theme.dart';
import 'shared/providers/theme_provider.dart';

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);

    return MaterialApp.router(
      title: 'AI Marketplace',
      debugShowCheckedModeBanner: false,

      // 🎨 Themes
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: themeMode,

      // 🧭 Routing
      routerConfig: appRouter,

      // 🌐 Global Builder
      builder: (context, child) {
        if (child == null) {
          return const SizedBox.shrink();
        }

        return GestureDetector(
          onTap: () {
            FocusManager.instance.primaryFocus?.unfocus();
          },
          child: child,
        );
      },
    );
  }
}