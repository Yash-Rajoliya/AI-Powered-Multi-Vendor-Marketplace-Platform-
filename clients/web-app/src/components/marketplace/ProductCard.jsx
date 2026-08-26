import { memo } from "react";
import { motion } from "framer-motion";

const ProductCard = memo(({ product = {} }) => {
  const { title = "Smart Product", price = "2,499", image, tag } = product;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between"
    >
      <div>
        <img
          src={image || "https://via.placeholder.com/200"}
          alt={title}
          loading="lazy"
          className="rounded-xl mb-3 w-full h-48 object-cover"
        />

        {tag && (
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded font-medium inline-block">
            {tag}
          </span>
        )}

        <h3 className="font-semibold mt-2 text-gray-800 line-clamp-1">{title}</h3>
        <p className="text-indigo-600 font-bold mt-1">
          {typeof price === "number" ? `₹${price.toLocaleString()}` : `₹${price}`}
        </p>
      </div>

      <button
        type="button"
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors"
      >
        Add to Cart
      </button>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;