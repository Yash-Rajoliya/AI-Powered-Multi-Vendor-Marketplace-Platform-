import Layout from "../../app/layout";
import FiltersSidebar from "../../components/marketplace/FiltersSidebar";
import ProductGrid from "../../components/marketplace/ProductGrid";
import TopBar from "../../components/marketplace/TopBar";

const ProductListingPage = () => {
  return (
    <Layout>
      <div className="flex gap-8">
        
        {/* Sidebar */}
        <FiltersSidebar />

        {/* Main */}
        <div className="flex-1">
          <TopBar />
          <ProductGrid />
        </div>

      </div>
    </Layout>
  );
};

export default ProductListingPage;