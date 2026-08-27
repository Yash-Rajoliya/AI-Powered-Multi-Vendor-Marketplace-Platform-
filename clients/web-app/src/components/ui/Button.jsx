import { motion } from "framer-motion";

const Button = ({ children }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2 rounded-xl shadow-md"
    >
      {children}
    </motion.button>
  );
};

export default Button;