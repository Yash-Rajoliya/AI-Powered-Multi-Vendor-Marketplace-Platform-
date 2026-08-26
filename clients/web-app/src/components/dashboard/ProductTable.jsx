const ProductTable = () => {
  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow">
      
      <h3 className="font-semibold mb-4">Products</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2].map((i) => (
            <tr key={i} className="border-t">
              <td>Product {i}</td>
              <td>₹999</td>
              <td>In Stock</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ProductTable;