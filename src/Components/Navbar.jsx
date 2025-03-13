import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { removeUser } from "../utils/UserSlice";

const Navbar = () => {

  const user = useSelector((store)=> store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout(){
    axios.post(BASE_URL + "/logout",{},{withCredentials:true})
    .then((res)=>{
      dispatch(removeUser())
      navigate("/login")
    })
  }

  return (
    <div className="navbar bg-gray-800 text-white px-4 md:px-10 py-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost  md:px-4 px-2 md:text-xl"> 🧑‍💻 DevTinder</Link>
      </div>
      {
        user && 
      <div className="flex-none flex items-center gap-4 text-white">
        <div className="text-xs w-24"> Welcome, {user?.username}</div>
        <div className="dropdown dropdown-end text-black">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections"> Connections</Link>
            </li>
            <li>
              <Link to="/requests"> Requests</Link>
            </li>
            <li>
              <Link onClick={handleLogout}> Logout </Link>
            </li>
          </ul>
        </div>
      </div>
      }
    </div>
  );
};

export default Navbar;
