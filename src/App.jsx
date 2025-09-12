import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Api from "./api/Api";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
