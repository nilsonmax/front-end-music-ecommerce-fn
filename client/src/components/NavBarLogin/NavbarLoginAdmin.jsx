import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/Logo.png";
import { getAdminId } from "../../redux/action/adminsActions";

export default function NavBarLoginAdmin({setearStates}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("dataUser");
  const admin=useSelector((state) => state.admins.admin)
  useEffect(() => {
    if(admin.length<1){
    dispatch(getAdminId(token));}else{
    }
  }, []);

  return (
    <div className="w-full shadow-lg sticky top-0 z-10 px-10 py-5 bg-black text-white">
      {admin.length>0 &&
      <div className="md:flex flex-row justify-between items-center"> 
        <Link to="/">
          <img src={Logo} className="w-14" />
        </Link>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none cursor-pointer"
          onClick={() => {setearStates("Instruments")}}
        >
          <p>Instruments</p>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none cursor-pointer"
          onClick={() => {setearStates("Users")}}
        >
          <p>Users</p>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none cursor-pointer"
          onClick={() => {setearStates("Categories")}}
        >
              <p>Categories</p>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none cursor-pointer"
          onClick={() => {setearStates("Admins")}}
        >
          <p>Admins</p>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none cursor-pointer"
        onClick={() => {setearStates("Historyshops")}}
        >
          <p>Historyshops</p>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none cursor-pointer"
        onClick={() => {setearStates("Profile")}}
        >
          <p>Profile</p>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none cursor-pointer">
          <div onClick={() => {
              window.localStorage.removeItem("dataUser");
              navigate("/");
            }}>
              <p>Log out</p>
          </div>
        </li>

        <li className=" py-1 text-1xl no-underline list-none lg:inline-block"
        onClick={() => {setearStates("Profile")}}>
            <h2 className="cursor-pointer box-decoration-slice bg-gradient-to-r from-primary to-secondary px-2 rounded-sm text-white">
              {`Welcome ${admin[0].userName}`}
            </h2>
        </li>
      </div>
      }
    </div>

  );
}