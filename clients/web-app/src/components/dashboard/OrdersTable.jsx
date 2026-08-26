const OrdersTable = () => {
  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow">
      
      <h3 className="font-semibold mb-4">Orders</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>ID</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2].map((i) => (
            <tr key={i} className="border-t">
              <td>#00{i}</td>
              <td className="text-emerald-600">Delivered</td>
              <td>₹2,499</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default OrdersTable;