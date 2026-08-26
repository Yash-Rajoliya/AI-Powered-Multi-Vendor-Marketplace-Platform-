const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Toys",
];

const Categories = () => {
  return (
    <section className="mt-20">
      
      <h2 className="text-2xl font-semibold mb-6">
        Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
          >
            {cat}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;