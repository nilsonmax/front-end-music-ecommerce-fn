import React from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import DetailsPage from "./pages/Details/details"
import CreateInstrument from './components/createInstrument/createInstrument';
import Signup from "./pages/Signup/Signup";

const App = () => {
  return (
    <div id='body'>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/instruments" element={<instruments />} /> */}
        <Route path="/instruments/:id" element={<DetailsPage/>} />
        *<Route path="/instruments/create" element={<CreateInstrument />} /> 
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
