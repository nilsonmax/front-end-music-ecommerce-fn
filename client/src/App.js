import React from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import Details from "./pages/Details/Details"

const App = () => {
  return (
    <div id='body'>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/instruments" element={<instruments />} /> */}
        <Route path="/instruments/:id" element={<Details />} />
        {/*<Route path="/instruments/create" element={<Create />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
