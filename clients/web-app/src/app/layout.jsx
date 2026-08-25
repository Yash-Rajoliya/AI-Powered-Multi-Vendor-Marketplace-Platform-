import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import AIChatWidget from "../components/ui/AIChatWidget";

const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      
      <Navbar />

      <main className="pt-24 px-4 md:px-10 max-w-7xl mx-auto">
        {children}
      </main>

      <Footer />

      <AIChatWidget />
    </div>
  );
};

export default Layout;