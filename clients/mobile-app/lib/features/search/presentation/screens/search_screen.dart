import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/search_controller.dart';

class SearchScreen extends ConsumerWidget {
  SearchScreen({super.key});

  final controller = TextEditingController();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final results = ref.watch(searchControllerProvider);

    return Scaffold(
      appBar: AppBar(
        title: TextField(
          controller: controller,
          onChanged: (val) {
            ref.read(searchControllerProvider.notifier).search(val);
          },
        ),
      ),
      body: ListView(
        children: results
            .map((e) => ListTile(title: Text(e.title)))
            .toList(),
      ),
    );
  }
}