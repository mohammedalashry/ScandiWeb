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

  useEffect(() => {
    document.title = "Add Product";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct(formData);
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product">
      <header>
        <h1>Add Product</h1>
      </header>
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddProduct;
