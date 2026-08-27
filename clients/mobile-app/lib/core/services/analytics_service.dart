class AnalyticsService {
  void logEvent(String name, {Map<String, dynamic>? params}) {
    // Integrate Firebase / Segment later
    print("Analytics → $name | $params");
  }
}