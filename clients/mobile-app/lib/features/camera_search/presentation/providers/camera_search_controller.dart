import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';

final cameraSearchProvider =
    StateNotifierProvider<CameraSearchController, XFile?>(
  (ref) => CameraSearchController(),
);

class CameraSearchController extends StateNotifier<XFile?> {
  final picker = ImagePicker();

  CameraSearchController() : super(null);

  Future<void> pickImage() async {
    final image = await picker.pickImage(source: ImageSource.camera);
    state = image;
  }
}