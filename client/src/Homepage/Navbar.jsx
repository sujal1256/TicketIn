import React, { useState } from "react";
import { RiMenuFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Avatar from "react-avatar";

import SearchBar from "./SearchBar";
import useCheckSignedIn from "../utils/useCheckSignedIn";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [searchParams] = useSearchParams();
  const project = searchParams.get("q");

  const loggedInResponse = useCheckSignedIn();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  async function handleLogout() {
    try {
      const response = await axios.post("api/v1/user/signout");
      window.location.reload();
    } catch (error) {
      console.log("Error while logging out");
    }
  }

  return (
    <div className="bg-slate-50 grid grid-cols-[1fr_5fr] p-2 px-5 shadow-sm">
      {/* left */}
      <div className="flex items-center gap-4 justify-around">
        {/* <RiMenuFill className="size-5"/> */}
        <img
          className="h-auto mix-blend-multiply w-3/5"
          src={"../../public/photos/Logo.png"}
          alt="logo"
        />
      </div>
      <div className="flex justify-between items-center">
        {/* left icons */}
        <div className="flex gap-5 items-center justify-between ml-4">
          <Link to={"/"}>Home</Link>
          <Link to={`${project ? `/pricing?q=${project}` : "/pricing"}`}>
            Pricing
          </Link>
        </div>
        {loggedInResponse.userLoggedIn ? (
          <div className="flex text-2xl gap-3 items-center">
            {/* <SearchBar /> */}

            {project && (
              <Link
                className="border text-sm p-2 px-3 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white duration-500 rounded"
                to={`${project ? `/pricing?q=${project}` : "/pricing"}`}
              >
                Upgrade
              </Link>
            )}
            <IoIosNotifications />
            <IoIosHelpCircle />
            <IoIosSettings />
            <div className="relative">
              {/* Avatar with click event to show/hide dropdown */}
              <Avatar
                name={loggedInResponse.user?.data?.data?.username}
                size="44"
                className="rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />

              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 border"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-5">
            <Link to={"signin"} className="bg-violet-500 p-3 rounded-xl">
              Signin
            </Link>
            <Link to={"signup"} className="bg-violet-500 p-3 rounded-xl">
              Signup
            </Link>
          </div>
        )}
      </div>

      {/* right */}
      <div></div>
    </div>
  );
}

export default Navbar;
