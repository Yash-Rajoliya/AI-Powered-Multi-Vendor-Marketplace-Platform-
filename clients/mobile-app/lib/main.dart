import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/config/env/env.dart';
import 'core/services/logger_service.dart';
import 'core/services/notification_service.dart';
import 'app.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final logger = LoggerService();

  // Catch Flutter framework errors
  FlutterError.onError = (FlutterErrorDetails details) {
    FlutterError.presentError(details);
    logger.log("Flutter Error", error: details.exception, stackTrace: details.stack);
  };

  runZonedGuarded(
    () async {
      // 🌍 Initialize Environment inside guarded zone
      AppEnv.init(Env.dev);

      // 🔔 Safely Initialize Notifications
      try {
        final notificationService = NotificationService();
        await notificationService.init();
      } catch (e, stack) {
        logger.log("Notification Service initialization failed", error: e, stackTrace: stack);
      }

      logger.log("App starting...");

      runApp(
        const ProviderScope(
          child: MyApp(),
        ),
      );
    },
    (error, stack) {
      logger.log("Unhandled Error", error: error, stackTrace: stack);
    },
  );
}