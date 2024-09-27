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
      setTimeout(() => {
        setError("");
        navigate("/");
      }, 5000);
      return;
    }

    try {
      await addProduct(formData);
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response && error.response.status !== 201) {
        setError("Please, provide the data of indicated type");
      } else {
        setError("An error occurred while adding the product");
      }
      setTimeout(() => {
        setError("");
        navigate("/");
      }, 5000);
    }
  };

  const isValidInput = () => {
    
    return formData.sku && formData.name && formData.price && formData.type &&(formData.size || formData.weight || (formData.height && formData.width && formData.length)); ;
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
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AddProduct;