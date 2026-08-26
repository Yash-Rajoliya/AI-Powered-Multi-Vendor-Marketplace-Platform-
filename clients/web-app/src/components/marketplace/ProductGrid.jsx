import ProductCard from "./ProductCard";
import Skeleton from "../ui/Skeleton";

const ProductGrid = ({ products = [], loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full flex-1">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-gray-600">No products found</p>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full flex-1">
      {products.map((product, i) => (
        <ProductCard key={product.id || i} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;