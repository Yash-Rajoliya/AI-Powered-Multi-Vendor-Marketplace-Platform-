import { useState, useEffect } from "react";
import Layout from "../../components/common/Layout";
import CartItem from "../../components/cart/CartItem";
import OrderSummary from "../../components/cart/OrderSummary";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const syncCartState = () => {
    try {
      const storedCart = localStorage.getItem("cart");
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    } catch {
      setCartItems([]);
    }
  };

  useEffect(() => {
    syncCartState();
    window.addEventListener("cartUpdated", syncCartState);
    return () => window.removeEventListener("cartUpdated", syncCartState);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) return handleRemoveItem(id);
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {/* Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>

          {/* Summary */}
          <OrderSummary items={cartItems} />
        </div>
      )}
    </Layout>
  );
};

export default CartPage;