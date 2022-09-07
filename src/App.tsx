import React from "react";
import Header from "./Component/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import AboutsUs from "./Pages/AboutUs";
function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-24 p-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<AboutsUs />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
