import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/config/env/env.dart';
import 'core/services/logger_service.dart';
import 'core/services/notification_service.dart';
import 'app.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // 🌍 Initialize Environment
  AppEnv.init(Env.dev);

  // 🔔 Initialize Notifications
  final notificationService = NotificationService();
  await notificationService.init();

  // 📊 Logger setup
  final logger = LoggerService();
  logger.log("App starting...");

  runZonedGuarded(
    () {
      runApp(
        const ProviderScope(
          child: MyApp(),
        ),
      );
    },
    (error, stack) {
      logger.log("Unhandled Error", error: error);
    },
  );
}