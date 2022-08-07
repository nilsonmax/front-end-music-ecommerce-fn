import React from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login"
import DetailsPage from "./pages/Details/details"
import Signup from "./pages/Signup/Signup";
import { Footer } from "./components/Footer/Footer";
import CreateInstrumentContainer from "./containers/createInstrument/createInstrumentContainer";

const App = () => {
  return (
    <>
     {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/instruments" element={<instruments />} /> */}
        <Route path="/instruments/:id" element={<DetailsPage/>} />
        *<Route path="/instruments/create" element={<CreateInstrumentContainer />} /> 
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
