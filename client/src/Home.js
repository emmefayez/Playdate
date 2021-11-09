import React from "react";
import { Routes, Route, Link } from "react-router-dom"; 

function Home() {
  return (
    <div className="Home">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}