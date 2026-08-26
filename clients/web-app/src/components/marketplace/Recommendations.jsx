import ProductCard from "./ProductCard";

const Recommendations = () => {
  return (
    <section className="mt-16">
      
      <h2 className="text-2xl font-semibold mb-4">
        You may also like
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {[1,2,3,4,5].map((item) => (
          <ProductCard key={item} tag="AI Pick" />
        ))}
      </div>
    </section>
  );
};

export default Recommendations;