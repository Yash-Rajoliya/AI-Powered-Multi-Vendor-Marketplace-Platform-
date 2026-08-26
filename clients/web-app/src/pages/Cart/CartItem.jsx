import { motion } from "framer-motion";

const CartItem = () => {
  return (
    <motion.div
      layout
      className="flex gap-6 bg-white p-4 rounded-2xl shadow"
    >
      <img
        src="https://via.placeholder.com/120"
        className="rounded-xl"
      />

      <div className="flex-1">
        <h3 className="font-semibold">Premium Product</h3>
        <p className="text-sm text-gray-500">₹2,499</p>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-3">
          <button className="px-3 py-1 border rounded">-</button>
          <span>1</span>
          <button className="px-3 py-1 border rounded">+</button>
        </div>

        {/* Remove */}
        <button className="text-rose-500 text-sm mt-3">
          Remove
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;