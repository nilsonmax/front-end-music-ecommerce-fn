import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Home } from "./components/home/home";
import Navbar from "./components/Navbar/Navbar";


const App = () => {
  return (
    <div id='body'>
    <Navbar />
    {/* <Header /> */}
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/instruments" element={<instruments />} /> */}
      {/* <Route path="/instruments/:id" element={<Details />} />
      <Route path="/instruments/create" element={<Create />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
    {/* <Footer /> */}
  </div>
  );
};

export default App;
