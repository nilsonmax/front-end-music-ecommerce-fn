import React from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login"
import DetailsPage from "./pages/Details/details"
import Signup from "./pages/Signup/Signup";
import UserInfo from './components/UserInfo/userInfo';
import { Footer } from "./components/Footer/Footer";
import CreateInstrumentContainer from "./containers/createInstrument/createInstrumentContainer";
import LoginForm from "./components/loginForm/loginForm";
import { useSelector } from 'react-redux';
import { showLogin } from './redux/action/index';
import { useDispatch } from "react-redux";
import Admin from "./pages/Admin/Admin";
import Profile from "./components/Profile/Profile";


const App = () => {
  let visible = useSelector(e => e.visible)
  const dispatch = useDispatch();
  const handleOnClose=()=>dispatch(showLogin(false));
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<><HomePage /><Footer /></>} />
        <Route path="/admin" element={<><Admin /><Footer /></>} />
        {/* <Route path="/user/perfil" element={} /> */}
        <Route path="/login" element={<><LoginPage /><Footer /></>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/form" element={<UserInfo />} />
        <Route path="/user/profile" element={<Profile />} />
        {/* <Route path="/instruments" element={<instruments />} /> */}
        <Route path="/instruments/:id" element={<><DetailsPage /><Footer /></>} />
        *<Route path="/instruments/create" element={<><CreateInstrumentContainer /><Footer /></>} />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/payment"/>

      </Routes>
      <LoginForm  onClose={handleOnClose} visible={visible} />
    </>
  );
};

export default App;
