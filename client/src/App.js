import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home/home";


const App = () => {
  return (
    <div id='body'>
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
