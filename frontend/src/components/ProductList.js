import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProducts } from "../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    document.title = "Product List";
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    
      setIsLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setIsLoading(false);    
  };

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id]
    );
  };

  const handleMassDelete = async () => {
    try {
      await deleteProducts(selectedProducts);
      await fetchProducts();
      setSelectedProducts([]);
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  return (
    <div className="product-list">
      <header>
        <h1>Product List</h1>
        <div className="actions">
          <Link to="/add-product" className="btn btn-primary">
            ADD
          </Link>
          <button
            onClick={handleMassDelete}
            className="btn btn-danger"
            id="delete-product-btn"
          >
            MASS DELETE
          </button>
        </div>
      </header>
      {!isLoading &&<div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-box">
            <input
              type="checkbox"
              className="delete-checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleCheckboxChange(product.id)}
            />
            <p>{product.sku}</p>
            <p>{product.name}</p>
            <p>{parseFloat(product.price).toFixed(2)}$</p>
            <p>{JSON.parse(product?.attributes)}</p>
          </div>
        ))}
      </div>}
      
    </div>
  );
};

export default ProductList;
