import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigator = useNavigate();

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      if (!user) {
        throw new Error("Not Login 1");
      }

      const res = await axios.post(
        "http://localhost:3000/logout",
        {
          redirect: "follow",
        },
        { withCredentials: true }
      );

      // console.log(res);
      if (res.statusText) {
        dispatch(removeUser());
        // console.log("remove");
        return navigator("/login");
      }
    } catch (error) {
      console.log("Error : " + error.message);
    }
  };

  return (
    <div className="navbar rounded-xl relative   bg-base-300">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link to={"/feed"}>Feed</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">D-Match</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        {user ? (
          <button
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            className="cursor-pointer mx-2.5 "
          >
            <img
              alt="User Photo"
              className="h-8 w-8 mx-2 rounded-full"
              src={user.photoURL}
            ></img>
            {isOpen && (
              <button
                onClick={handleLogOut}
                className="btn btn-error rounded-2xl my-2 z-50 absolute right-0"
              >
                Log Out
              </button>
            )}
          </button>
        ) : (
          <button className="btn btn-active btn-sm mx-2.5 btn-link">
            <Link to={"/signUp"}>Sign Up</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
