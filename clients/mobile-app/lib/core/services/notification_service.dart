import 'package:firebase_messaging/firebase_messaging.dart';

class NotificationService {
  final _fcm = FirebaseMessaging.instance;

  Future<void> init() async {
    await _fcm.requestPermission();

    FirebaseMessaging.onMessage.listen((message) {
      print("Notification: ${message.notification?.title}");
    });
  }
}