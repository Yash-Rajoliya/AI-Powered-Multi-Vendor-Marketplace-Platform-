import ProductCard from "./ProductCard";

const TrendingProducts = () => {
  return (
    <section className="mt-20">
      
      <h2 className="text-2xl font-semibold mb-6">
        Trending Products
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {[1,2,3,4].map((item) => (
          <ProductCard key={item} />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;