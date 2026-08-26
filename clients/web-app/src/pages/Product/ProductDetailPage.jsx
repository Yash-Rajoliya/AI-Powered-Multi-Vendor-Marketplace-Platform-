import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/common/Layout";
import ProductGallery from "../../components/marketplace/ProductGallery";
import ProductInfo from "../../components/marketplace/ProductInfo";
import ProductTabs from "../../components/marketplace/ProductTabs";
import Recommendations from "../../components/marketplace/Recommendations";
import VendorCard from "../../components/marketplace/VendorCard";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timer = setTimeout(() => {
      if (isMounted) {
        setProduct({ id, name: "Smart Product", price: 2499 });
        setLoading(false);
      }
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [id]);

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = existingCart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ProductGallery product={product} />
          <ProductInfo product={product} onAddToCart={handleAddToCart} />
        </div>

        {/* Vendor */}
        <VendorCard productId={id} />

        {/* Tabs */}
        <ProductTabs product={product} />

        {/* AI Recommendations */}
        <Recommendations productId={id} />
      </div>
    </Layout>
  );
};

export default ProductDetailPage;