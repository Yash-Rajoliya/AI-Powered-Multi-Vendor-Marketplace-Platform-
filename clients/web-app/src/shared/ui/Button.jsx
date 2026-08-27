import { motion } from "framer-motion";

const Button = ({ children, variant = "primary", ...props }) => {
  const base =
    "px-4 py-2 rounded-xl font-medium transition";

  const styles = {
    primary: "bg-indigo-600 text-white",
    outline: "border",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${base} ${styles[variant]}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;