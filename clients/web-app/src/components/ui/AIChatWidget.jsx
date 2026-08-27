import { useState } from "react";
import { motion } from "framer-motion";

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4 rounded-full shadow-lg"
      >
        🤖
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-xl p-4"
        >
          <h3 className="font-semibold mb-2">AI Assistant</h3>

          <div className="h-40 overflow-y-auto space-y-2 text-sm">
            <div className="bg-gray-100 p-2 rounded">
              Try: “Best laptop under ₹50k”
            </div>
          </div>

          <input
            placeholder="Ask anything..."
            className="w-full mt-3 p-2 border rounded-lg"
          />
        </motion.div>
      )}
    </>
  );
};

export default AIChatWidget;