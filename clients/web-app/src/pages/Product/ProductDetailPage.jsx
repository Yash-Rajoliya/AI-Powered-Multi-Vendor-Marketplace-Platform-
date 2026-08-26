import Layout from "../../app/layout";
import ProductGallery from "../../components/marketplace/ProductGallery";
import ProductInfo from "../../components/marketplace/ProductInfo";
import ProductTabs from "../../components/marketplace/ProductTabs";
import Recommendations from "../../components/marketplace/Recommendations";
import VendorCard from "../../components/marketplace/VendorCard";

const ProductDetailPage = () => {
  return (
    <Layout>
      
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-10">
        <ProductGallery />
        <ProductInfo />
      </div>

      {/* Vendor */}
      <VendorCard />

      {/* Tabs */}
      <ProductTabs />

      {/* AI Recommendations */}
      <Recommendations />

    </Layout>
  );
};

export default ProductDetailPage;