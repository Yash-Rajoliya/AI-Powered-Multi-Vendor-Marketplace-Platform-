import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:speech_to_text/speech_to_text.dart';

final voiceSearchProvider =
    StateNotifierProvider<VoiceSearchController, String>(
  (ref) => VoiceSearchController(),
);

class VoiceSearchController extends StateNotifier<String> {
  final speech = SpeechToText();

  VoiceSearchController() : super("");

  Future<void> startListening() async {
    await speech.initialize();

    speech.listen(onResult: (result) {
      state = result.recognizedWords;
    });
  }

  void stop() {
    speech.stop();
  }
}