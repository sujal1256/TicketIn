import React, { useState } from "react";
import { RiMenuFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Avatar from "react-avatar";

import SearchBar from "./SearchBar";
import useCheckSignedIn from "../utils/useCheckSignedIn";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
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
    <div className="bg-red-200 grid grid-cols-[1fr_5fr] p-2 px-5">
      {/* left */}
      <div className="flex justify-center items-center gap-2">
        <RiMenuFill />
        <p className="text-2xl">Logo</p>
      </div>
      <div className="bg-green-300 flex justify-between items-center">
        {/* left icons */}
        <div className="flex gap-3 items-center justify-between">
          <p>Home</p>
          <p>Projects</p>
          {/* <p>Goals</p>
                <p>Teams</p> */}
        </div>
        {loggedInResponse.userLoggedIn ? (
          <div className="flex text-2xl gap-2 items-center">
            <SearchBar />
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
                    className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full"
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
