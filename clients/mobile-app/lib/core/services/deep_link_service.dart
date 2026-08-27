import 'dart:async';

class DeepLinkService {
  final _controller = StreamController<String>();

  Stream<String> get links => _controller.stream;

  void handleLink(String url) {
    _controller.add(url);
  }
}