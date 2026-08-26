const TopBar = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      
      <div>
        <h2 className="text-xl font-semibold">
          Showing results for "Laptops"
        </h2>

        {/* AI Chips */}
        <div className="flex gap-2 mt-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs">
            AI Pick
          </span>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs">
            Inspired by your browsing
          </span>
        </div>
      </div>

      {/* Sorting */}
      <select className="border p-2 rounded-lg">
        <option>Sort by AI Recommended</option>
        <option>Price Low to High</option>
        <option>Popularity</option>
      </select>

    </div>
  );
};

export default TopBar;