import { motion } from "framer-motion";

const ProductCard = ({ tag }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="min-w-[250px] bg-white rounded-2xl shadow-md p-4"
    >
      <img
        src="https://via.placeholder.com/200"
        className="rounded-xl mb-3"
      />

      {tag && (
        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
          {tag}
        </span>
      )}

      <h3 className="font-semibold mt-2">Smart Product</h3>
      <p className="text-indigo-600 font-bold">₹2,499</p>

      <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg">
        Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductCard;