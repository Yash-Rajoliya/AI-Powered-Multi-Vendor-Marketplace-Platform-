class Validators {
  // RFC 5322 compliant regex for robust email validation
  static const String _emailPattern =
      r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$";

  static String? email(String? value) {
    if (value == null) return "Email required";
    
    // Remove control characters & null characters
    final cleanValue = value.replaceAll(RegExp(r'[\x00-\x1F\x7F]'), '').trim();

    if (cleanValue.isEmpty) {
      return "Email required";
    }

    if (cleanValue.length > 254 || !RegExp(_emailPattern).hasMatch(cleanValue)) {
      return "Invalid email";
    }

    return null;
  }

  static String? password(String? value) {
    if (value == null || value.isEmpty) {
      return "Password required";
    }

    // Guard against whitespace-only passwords
    if (value.trim().isEmpty) {
      return "Password cannot consist only of spaces";
    }

    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (value.length > 128) {
      return "Password exceeds maximum length";
    }

    return null;
  }
}