import ProductCard from "./ProductCard";
import Skeleton from "../ui/Skeleton";

const ProductGrid = () => {
  const loading = false;

  return (
    <div className="grid md:grid-cols-4 gap-6">
      
      {loading
        ? Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))
        : Array(12)
            .fill(0)
            .map((_, i) => <ProductCard key={i} />)}

    </div>
  );
};

export default ProductGrid;