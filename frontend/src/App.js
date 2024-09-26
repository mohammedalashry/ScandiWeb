import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import "./styles/main.scss";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
