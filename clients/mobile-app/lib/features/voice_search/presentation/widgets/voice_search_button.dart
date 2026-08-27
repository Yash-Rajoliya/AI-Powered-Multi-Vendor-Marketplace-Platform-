import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/voice_search_controller.dart';

class VoiceSearchButton extends ConsumerWidget {
  const VoiceSearchButton({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return FloatingActionButton(
      onPressed: () {
        ref.read(voiceSearchProvider.notifier).startListening();
      },
      child: const Icon(Icons.mic),
    );
  }
}