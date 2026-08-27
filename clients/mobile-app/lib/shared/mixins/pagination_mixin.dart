mixin PaginationMixin {
  int page = 1;
  bool hasMore = true;

  void reset() {
    page = 1;
    hasMore = true;
  }

  void nextPage() {
    page++;
  }
}