import { useEffect, useState } from "react";
import { getProducts } from "../../services/product.service";

export const useProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};