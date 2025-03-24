import React, { useState } from "react";
import { RiMenuFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Avatar from "react-avatar";
import SearchBar from "./SearchBar";
import useCheckSignedIn from "../utils/useCheckSignedIn";
import { Link, useSearchParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/userSlice";

function Navbar() {
  const [searchParams] = useSearchParams();
  const project = searchParams.get("q");
  useCheckSignedIn();
  const user = useSelector((store) => store.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  async function handleLogout() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/signout",
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("accessToken");
      document.cookie = `accessToken=${null}`;
      dispatch(removeUser());
      navigate("/signin")
    } catch (error) {
      console.error("Error while logging out", error);
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-auto"
                src={"/photos/Logo.png"}
                alt="TicketIn Logo"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                to={"/"}
                className="border-transparent text-gray-700 hover:text-purple-700 inline-flex items-center px-1 pt-1 border-b-2 hover:border-purple-500 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to={`${project ? `/pricing?q=${project}` : "/pricing"}`}
                className="border-transparent text-gray-700 hover:text-purple-700 inline-flex items-center px-1 pt-1 border-b-2 hover:border-purple-500 text-sm font-medium"
              >
                Pricing
              </Link>
              <Link
                to={"/create-project"}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md px-4 py-2 inline-flex items-center transition-colors duration-200 shadow-sm"
              >
                <span>Create</span>
              </Link>
            </div>
          </div>

          {/* Right side navigation */}
          <div className="flex items-center">
            {/* Search area - Desktop */}
            <div className="hidden md:flex items-center mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm"
                />
              </div>
            </div>

            {user?.user ? (
              <div className="flex items-center space-x-4">
                {/* Upgrade button */}
                {project && (
                  <Link
                    className="hidden md:inline-flex items-center px-3 py-1.5 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-200 text-sm font-medium rounded-md"
                    to={`${project ? `/pricing?q=${project}` : "/pricing"}`}
                  >
                    Upgrade
                  </Link>
                )}

                {/* Avatar with Dropdown */}
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <Avatar
                        name={
                          user.user?.username || "User"
                        }
                        size="40"
                        round={true}
                        className="cursor-pointer"
                      />
                      <IoMdArrowDropdown className="ml-1 text-gray-500" />
                    </button>
                  </div>

                  {/* Dropdown panel */}
                  {showDropdown && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.user?.username ||
                            "User"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user?.user?.email ||
                            "user@example.com"}
                        </p>
                      </div>
                      <div className="border-t border-gray-100"></div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="inline-flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-md shadow-sm text-sm font-medium hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="flex md:hidden ml-4">
              <button
                onClick={toggleMobileMenu}
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              >
                <RiMenuFill className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {showMobileMenu && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 hover:border-purple-300 hover:text-gray-800"
            >
              Home
            </Link>
            <Link
              to={`${project ? `/pricing?q=${project}` : "/pricing"}`}
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 hover:border-purple-300 hover:text-gray-800"
            >
              Pricing
            </Link>
          </div>

          {/* Mobile search
          <div className="pt-2 pb-3 px-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm"
              />
            </div>
          </div> */}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
