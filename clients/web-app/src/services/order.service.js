import api from "./api";

export const createOrder = async (data) => {
  try {
    const res = await api.post("/orders", data);
    return res.data?.data || res.data;
  } catch (error) {
    console.error("Failed to create order:", error.message);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const res = await api.get("/orders");
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    throw error;
  }
};