import Layout from "../../app/layout";
import CartItem from "../../components/cart/CartItem";
import OrderSummary from "../../components/cart/OrderSummary";

const CartPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        
        {/* Items */}
        <div className="md:col-span-2 space-y-6">
          {[1, 2, 3].map((i) => (
            <CartItem key={i} />
          ))}
        </div>

        {/* Summary */}
        <OrderSummary />

      </div>
    </Layout>
  );
};

export default CartPage;