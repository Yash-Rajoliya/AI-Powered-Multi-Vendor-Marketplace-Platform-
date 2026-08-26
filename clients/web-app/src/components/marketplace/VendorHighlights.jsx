const vendors = ["TechStore", "FashionHub", "HomeDecor"];

const VendorHighlights = () => {
  return (
    <section className="mt-20">
      
      <h2 className="text-2xl font-semibold mb-6">
        Top Vendors
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div
            key={vendor}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h3 className="font-semibold">{vendor}</h3>
            <p className="text-sm text-gray-500">⭐ 4.8 Rating</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VendorHighlights;