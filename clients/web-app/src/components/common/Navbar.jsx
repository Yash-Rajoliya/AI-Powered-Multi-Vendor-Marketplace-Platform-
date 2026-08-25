import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/30 border-b border-white/20 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          SmartCart AI
        </h1>

        {/* AI Search */}
        <div className="hidden md:flex items-center bg-white/60 backdrop-blur-md px-4 py-2 rounded-full w-[400px] shadow-inner">
          <input
            placeholder="Search with AI..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="hover:text-indigo-600 transition">Login</button>
          <button className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700">
            Cart
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;