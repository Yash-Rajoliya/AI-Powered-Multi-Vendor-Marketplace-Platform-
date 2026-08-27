import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/camera_search_controller.dart';

class CameraSearchScreen extends ConsumerWidget {
  const CameraSearchScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final image = ref.watch(cameraSearchProvider);

    return Scaffold(
      appBar: AppBar(title: const Text("Camera Search")),
      body: Column(
        children: [
          if (image != null) Image.file(File(image.path)),
          ElevatedButton(
            onPressed: () {
              ref.read(cameraSearchProvider.notifier).pickImage();
            },
            child: const Text("Capture"),
          ),
        ],
      ),
    );
  }
}