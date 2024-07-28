import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "@/components/NavBar";
import Home from "@/pages/Home";
import { Toaster } from "./components/ui/toaster";
import Product from "@/pages/Product";
const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
