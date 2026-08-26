import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import AIChatWidget from "../components/ui/AIChatWidget";

const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex flex-col relative overflow-x-hidden w-full">
      
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto w-full box-border">
        {children}
      </main>

      <Footer />

      <AIChatWidget />
    </div>
  );
};

export default Layout;