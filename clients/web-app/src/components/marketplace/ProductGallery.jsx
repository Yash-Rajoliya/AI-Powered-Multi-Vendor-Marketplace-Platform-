import { useState } from "react";
import { motion } from "framer-motion";

const images = [
  "https://via.placeholder.com/400",
  "https://via.placeholder.com/401",
  "https://via.placeholder.com/402",
];

const ProductGallery = () => {
  const [active, setActive] = useState(images[0]);

  return (
    <div>
      <motion.img
        src={active}
        whileHover={{ scale: 1.05 }}
        className="rounded-2xl mb-4 cursor-zoom-in"
      />

      <div className="flex gap-3">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            onClick={() => setActive(img)}
            className="w-20 h-20 rounded-lg cursor-pointer border"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;