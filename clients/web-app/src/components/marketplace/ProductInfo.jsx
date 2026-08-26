import { motion } from "framer-motion";

const ProductInfo = () => {
  return (
    <div className="sticky top-24">
      
      <h1 className="text-3xl font-bold">
        Premium Smart Gadget
      </h1>

      <div className="flex items-center gap-3 mt-2">
        <p className="text-indigo-600 text-2xl font-bold">
          ₹4,999
        </p>
        <span className="text-sm bg-rose-100 text-rose-600 px-2 py-1 rounded">
          20% OFF
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        ⭐ 4.5 (1,200 reviews)
      </p>

      {/* Variants */}
      <div className="mt-6">
        <p className="font-medium mb-2">Color</p>
        <div className="flex gap-2">
          {["Black", "Blue", "Red"].map((c) => (
            <button
              key={c}
              className="border px-4 py-2 rounded-lg hover:border-indigo-600"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-xl"
        >
          Add to Cart
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 border py-3 rounded-xl"
        >
          Buy Now
        </motion.button>

      </div>
    </div>
  );
};

export default ProductInfo;