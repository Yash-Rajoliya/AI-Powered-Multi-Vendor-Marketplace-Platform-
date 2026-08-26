import Layout from "../../app/layout";
import Hero from "../../components/marketplace/Hero";
import Recommendations from "../../components/marketplace/Recommendations";
import Categories from "../../components/marketplace/Categories";
import TrendingProducts from "../../components/marketplace/TrendingProducts";
import VendorHighlights from "../../components/marketplace/VendorHighlights";

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <Recommendations />
      <Categories />
      <TrendingProducts />
      <VendorHighlights />
    </Layout>
  );
};

export default HomePage;