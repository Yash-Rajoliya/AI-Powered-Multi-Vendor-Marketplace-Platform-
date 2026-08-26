import { motion } from "framer-motion";

const FiltersSidebar = ({
  priceRange = 5000,
  selectedCategories = [],
  selectedRating = null,
  onPriceChange,
  onCategoryToggle,
  onRatingSelect,
  onAiFilterClick,
}) => {
  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-full lg:w-72 bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-24 shrink-0"
    >
      <h2 className="font-semibold text-lg mb-4">Filters</h2>

      {/* AI Suggestions */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2 font-medium">
          AI Suggestions
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onAiFilterClick && onAiFilterClick("under5000")}
            className="px-3 py-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-full text-xs font-medium transition-colors"
          >
            Best under ₹5000
          </button>
          <button
            type="button"
            onClick={() => onAiFilterClick && onAiFilterClick("topRated")}
            className="px-3 py-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-full text-xs font-medium transition-colors"
          >
            Top rated
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium text-sm">Max Price</p>
          <span className="text-xs text-indigo-600 font-medium">₹{priceRange}</span>
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          step="500"
          value={priceRange}
          onChange={(e) => onPriceChange && onPriceChange(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <p className="font-medium text-sm mb-2">Categories</p>
        <div className="space-y-2">
          {["Electronics", "Fashion", "Home"].map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onCategoryToggle && onCategoryToggle(cat)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div>
        <p className="font-medium text-sm mb-2">Ratings</p>
        <div className="space-y-2">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === r}
                onChange={() => onRatingSelect && onRatingSelect(r)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700">⭐ {r} & above</span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FiltersSidebar;