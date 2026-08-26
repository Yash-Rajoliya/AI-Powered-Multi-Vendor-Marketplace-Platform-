import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-2xl shadow sticky top-24">
      
      <h2 className="font-semibold mb-4">Order Summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹7,497</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹7,497</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl"
      >
        Proceed to Checkout
      </button>

    </div>
  );
};

export default OrderSummary;