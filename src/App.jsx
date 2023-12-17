import React from "react";
import Home from "./pages/Home";
import SavedQuotes from "./pages/SavedQuotes";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="container mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved-quotes" element={<SavedQuotes />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
