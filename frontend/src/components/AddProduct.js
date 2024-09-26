import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/api";
import ProductForm from "./ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    type: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Add Product";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidInput()) {
      setError("Please, submit required data");
      return;
    }

    try {
      await addProduct(formData);
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response && error.response.status === 400) {
        setError("Please, provide the data of indicated type");
      } else {
        setError("An error occurred while adding the product");
      }
    }
  };

  const isValidInput = () => {
    // Implement your validation logic here
    return formData.sku && formData.name && formData.price && formData.type;
  };

  return (
    <div className="add-product">
      <header>
        <h1>Add Product</h1>
      </header>
      {error && <div className="error">{error}</div>}
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddProduct;