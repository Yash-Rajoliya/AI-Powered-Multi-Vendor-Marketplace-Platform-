class Validators {
  static const String _emailPattern =
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';

  static String? email(String? value) {
    if (value == null || value.trim().isEmpty) {
      return "Email required";
    }

    final trimmedValue = value.trim();

    if (!RegExp(_emailPattern).hasMatch(trimmedValue)) {
      return "Invalid email";
    }

    return null;
  }

  static String? password(String? value) {
    if (value == null || value.isEmpty) {
      return "Password required";
    }

    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (value.trim().isEmpty) {
      return "Password cannot consist only of spaces";
    }

    return null;
  }
}