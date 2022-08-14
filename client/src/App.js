import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import DetailsPage from "./pages/Details/details";
import Signup from "./pages/Signup/Signup";
import UserInfo from "./components/UserInfo/userInfo";
import { Footer } from "./components/Footer/Footer";
import CreateInstrumentContainer from "./containers/createInstrument/createInstrumentContainer";
import LoginForm from "./components/loginForm/loginForm";
import { useSelector } from "react-redux";
import { showLogin } from "./redux/action/index";
import { useDispatch } from "react-redux";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/profile/Profile";
import SuccessPayment from "./pages/SuccessPayment/SuccessPayment";
import Checkout from "./components/Checkout/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LVhuNGZCoUhdempeuLZScU9BSjym86ji19YjkpFBaBMuACGX5anJToeQpMH4ksNFSyeGshaX83d9AVMXnShe0KY00xHD6MAe6"
);

const App = () => {

  let visible = useSelector(e => e.reducer.visible)

  const dispatch = useDispatch();
  const handleOnClose = () => dispatch(showLogin(false));
  return (
    <Elements stripe={stripePromise}>
      {/* <NavBar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <Admin />
              <Footer />
            </>
          }
        />
        {/* <Route path="/user/perfil" element={} /> */}
        <Route
          path="/login"
          element={
            <>
              <LoginPage />
              <Footer />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />


        <Route path="/user/info" element={<><UserInfo /><Footer/></>} />
        <Route path="/user/Profile" element={<><Profile /><Footer/></>} />

        {/* <Route path="/instruments" element={<instruments />} /> */}
        <Route
          path="/instruments/:id"
          element={
            <>
              <DetailsPage />
              <Footer />
            </>
          }
        />
        *
        <Route
          path="/instruments/create"
          element={
            <>
              <CreateInstrumentContainer />
              <Footer />
            </>
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<SuccessPayment />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <LoginForm onClose={handleOnClose} visible={visible} />
    </Elements>
  );
};

export default App;
