import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

class BarcodeScannerScreen extends StatelessWidget {
  const BarcodeScannerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Scan Product")),
      body: MobileScanner(
        onDetect: (barcode, args) {
          final String? code = barcode.rawValue;
          if (code != null) {
            print("Scanned: $code");
          }
        },
      ),
    );
  }
}