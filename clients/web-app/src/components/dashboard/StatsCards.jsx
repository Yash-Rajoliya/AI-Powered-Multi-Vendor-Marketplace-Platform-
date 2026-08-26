import { motion } from "framer-motion";

const stats = [
  { title: "Revenue", value: "₹1,20,000" },
  { title: "Orders", value: "320" },
  { title: "Products", value: "58" },
];

const StatsCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow"
        >
          <p className="text-gray-500">{s.title}</p>
          <h3 className="text-xl font-bold mt-2">{s.value}</h3>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;