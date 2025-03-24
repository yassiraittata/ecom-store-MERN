import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { useLogoutMutation } from "../../store/api/usersApiSlice";
import { logout } from "../../store/features/auth/authSlice";

import "./Navigation.css";

export default function Navigation() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  function toggleDropDown() {
    setDropDownOpen((value) => !value);
  }

  function toggleSideBar() {
    setShowSideBar((value) => !value);
  }

  function closeSideBar() {
    setShowSideBar(false);
  }

  async function logoutHandler() {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav
      style={{ zIndex: 999 }}
      className={`${
        showSideBar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between  text-black bg-gradient-to-b from-[#fddb92] to-[#d1fdff] w-[4%] hover:w-[15%] h-[100vh] fixed shadow-md pb-2`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4 mt-[5rem]">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2 hover:bg-gray-100 p-4"
        >
          <AiOutlineHome size={26} className="mr-3" />
          <span className="hidden nav-item-name">Home</span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2 hover:bg-gray-100 p-4"
        >
          <AiOutlineShopping size={26} className="mr-3" />
          <span className="hidden nav-item-name">Shop</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2 hover:bg-gray-100 p-4"
        >
          <AiOutlineShoppingCart size={26} className="mr-3" />
          <span className="hidden nav-item-name">Cart</span>
        </Link>
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2 hover:bg-gray-100 p-4"
        >
          <FaHeart size={26} className="mr-3" />
          <span className="hidden nav-item-name">Favorites</span>
        </Link>
      </div>
      <div className="relative px-3">
        <button
          onClick={toggleDropDown}
          className="flex items-center justify-between text-gray-800 focus:outline-none w-full"
        >
          {userInfo ? <span>{userInfo.username}</span> : <></>}
          {userInfo && (
            <span
              className={`ml-1 mt-1 ${
                dropDownOpen ? "transform rotate-180" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          )}
        </button>
        {dropDownOpen && userInfo && (
          <ul
            className={`absolute nav-item-name  right-0 bg-white text-gray-600 font-medium shadow-md rounded-md overflow-hidden min-w-[10rem] text-center space-y-2 -bottom-full mb-12`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productslist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorieslist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderslist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/Profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block px-4 py-2 hover:bg-gray-100 w-full cursor-pointer"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2 hover:bg-gray-100 p-4"
            >
              <AiOutlineLogin size={26} className="mr-3" />
              <span className="hidden nav-item-name">Login</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2 hover:bg-gray-100 p-4"
            >
              <AiOutlineUserAdd size={26} className="mr-3" />
              <span className="hidden nav-item-name">Register</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
