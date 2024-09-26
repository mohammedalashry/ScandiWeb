import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Adjust this to match your backend URL

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/`, productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const deleteProducts = async (productIds) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/`, {
      data: {
        ids: productIds,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting products:", error);
    throw error;
  }
};
