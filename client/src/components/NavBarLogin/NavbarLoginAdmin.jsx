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
    <div className="w-full shadow-lg sticky top-0 bg-white z-10 px-10 py-5">
      {admin.length>0 &&
      <div className="md:flex flex-row justify-between items-center"> 
        <Link to="/">
          <img src={Logo} className="w-14" />
        </Link>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none"
          onClick={() => {setearStates("Instruments")}}
        >
          <p>Instruments</p>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none"
          onClick={() => {setearStates("Users")}}
        >
          <p>Users</p>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none"
          onClick={() => {setearStates("Categories")}}
        >
              <p>Categorys</p>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none"
          onClick={() => {setearStates("Admins")}}
        >
          <p>Admins</p>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none"
        onClick={() => {setearStates("Historyshops")}}
        >
          <p>Historyshops</p>
        </li>

        <li className="font-bold cursor-pointer transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none">
          <Link to="">
            <p>About US</p>
          </Link>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none">
          <Link to="/user/Profile">
            <p>Profile</p>
          </Link>
        </li>

        <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell list-none">
          <Link onClick={() => {
              window.localStorage.removeItem("dataUser");
              navigate("/");
            }}
            to="/user/Profile">
              <p>Log out</p>
          </Link>
        </li>

        <li className=" py-1 text-1xl text-secondary text-lg underline lg:inline-block">
          <Link to="/user/Profile">
            <h2 >
              {`Welcome ${admin[0].userName}`}
            </h2>
          </Link>
        </li>
      </div>
      }
    </div>

  );
}