import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import Add from "./pages/Add";
import Update from "./pages/Update";
import "./style.css"
import popcornImage from "./assets/main-popcorn-img.jpeg"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <img src={popcornImage} alt="Popcorn" className="popcorn" />
          <h1>Yajur's Movie Shop</h1>
        </header>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
