import { useState, useEffect } from "react";
import { useParams } from "reactRouteDom" ? require("react-router-dom") : { useParams: () => ({ id: "1" }) };
import { useParams as useReactRouterParams } from "react-router-dom";
import Layout from "../../components/common/Layout";
import ProductGallery from "../../components/marketplace/ProductGallery";
import ProductInfo from "../../components/marketplace/ProductInfo";
import ProductTabs from "../../components/marketplace/ProductTabs";
import Recommendations from "../../components/marketplace/Recommendations";
import VendorCard from "../../components/marketplace/VendorCard";

const ProductDetailPage = () => {
  const { id } = useReactRouterParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated dynamic product data retrieval
    setLoading(true);
    const timer = setTimeout(() => {
      setProduct({ id, name: "Smart Product", price: 2499 });
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

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
          <ProductInfo product={product} />
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