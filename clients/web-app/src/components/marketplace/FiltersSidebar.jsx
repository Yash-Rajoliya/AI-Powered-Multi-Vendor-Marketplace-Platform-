import { motion } from "framer-motion";

const FiltersSidebar = () => {
  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-24"
    >
      <h2 className="font-semibold mb-4">Filters</h2>

      {/* AI Suggestions */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">
          AI Suggestions
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs cursor-pointer">
            Best under ₹5000
          </span>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs cursor-pointer">
            Top rated
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <p className="font-medium mb-2">Price</p>
        <input type="range" className="w-full" />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <p className="font-medium mb-2">Categories</p>
        {["Electronics", "Fashion", "Home"].map((cat) => (
          <label key={cat} className="block text-sm">
            <input type="checkbox" /> {cat}
          </label>
        ))}
      </div>

      {/* Ratings */}
      <div>
        <p className="font-medium mb-2">Ratings</p>
        {[4, 3, 2].map((r) => (
          <label key={r} className="block text-sm">
            ⭐ {r} & above
          </label>
        ))}
      </div>
    </motion.div>
  );
};

export default FiltersSidebar;