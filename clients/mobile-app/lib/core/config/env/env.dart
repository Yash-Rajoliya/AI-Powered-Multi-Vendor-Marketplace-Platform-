enum Env { dev, prod }

class AppEnv {
  static late Env _env;

  static void init(Env env) {
    _env = env;
  }

  static String get baseUrl {
    switch (_env) {
      case Env.dev:
        return "http://10.0.2.2:8080/api"; // API Gateway (Android emulator)
      case Env.prod:
        return "https://api.yourdomain.com/api";
    }
  }

  static bool get isProd => _env == Env.prod;
}