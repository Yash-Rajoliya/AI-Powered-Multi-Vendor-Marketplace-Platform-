import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
      
      {/* Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 animate-gradient opacity-90" />

      <div className="relative z-10 text-white max-w-3xl">
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Discover Products Powered by AI
        </motion.h1>

        {/* AI Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/20 backdrop-blur-lg rounded-full p-2 flex items-center"
        >
          <input
            placeholder="What are you looking for?"
            className="flex-1 bg-transparent px-4 py-2 outline-none"
          />
        </motion.div>

        <div className="mt-6 flex justify-center gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-xl">
            Explore Products
          </button>
          <button className="border px-6 py-3 rounded-xl">
            Become a Vendor
          </button>
        </div>

      </div>
    </div>
  );
};

export default Hero;