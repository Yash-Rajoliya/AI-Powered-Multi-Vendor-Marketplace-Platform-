import 'package:flutter_riverpod/flutter_riverpod.dart';

final notificationProvider =
    StateNotifierProvider<NotificationController, List<String>>(
        (ref) => NotificationController());

class NotificationController extends StateNotifier<List<String>> {
  NotificationController() : super([]);

  void add(String msg) {
    state = [...state, msg];
  }
}