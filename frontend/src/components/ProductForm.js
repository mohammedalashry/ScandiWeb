import React from "react";
import { Link } from "react-router-dom";

const ProductForm = ({ formData, setFormData, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const renderTypeSpecificFields = () => {
    switch (formData.type) {
      case "DVD":
        return (
          <div className="form-group">
            <label htmlFor="size">Size (MB)</label>
            <input
              type="number"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            />
            <p className="description">Please, provide size in MB</p>
          </div>
        );
      case "Book":
        return (
          <div className="form-group">
            <label htmlFor="weight">Weight (Kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            <p className="description">Please, provide weight in Kg</p>
          </div>
        );
      case "Furniture":
        return (
          <>
            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="width">Width (cm)</label>
              <input
                type="number"
                id="width"
                name="width"
                value={formData.width}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="length">Length (cm)</label>
              <input
                type="number"
                id="length"
                name="length"
                value={formData.length}
                onChange={handleChange}
                required
              />
            </div>
            <p className="description">
              Please, provide dimensions in HxWxL format
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form id="product_form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="sku">SKU</label>
        <input
          type="text"
          id="sku"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="type">Type Switcher</label>
        <select
          id="productType"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Type Switcher</option>
          <option value="DVD">DVD</option>
          <option value="Book">Book</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>
      {renderTypeSpecificFields()}
      <div className="form-actions">
        <Link to="/" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
