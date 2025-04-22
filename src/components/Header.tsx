import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";
import { BsBoxSeamFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi2";
import { GoGraph } from "react-icons/go";
import { MdOutlineInventory } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Cart from "./Cart";
import { jwtDecode } from "jwt-decode";
import lg from "../assets/images/em.png";

interface User {
  username: string;
  email: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const token = localStorage.getItem("token");
  let user: User | null = null;

  // Decode the token if it exists
  if (token) {
    try {
      user = jwtDecode<User>(token);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const links = [
    { name: "Home", path: "/", icon: <HiHome /> },
    {
      name: "Orders",
      path: "/orders",
      icon: <BsBoxSeamFill className="text-yellow-500" />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <GoGraph className="text-green-500" />,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: <MdOutlineInventory className="text-blue-500" />,
    },
    {
      name: "New Items",
      path: "/form",
      icon: <AiOutlineForm className="text-orange-500" />,
    },
  ];

  return (
    <header className="bg-gray-800 text-white flex justify-between items-center px-4 py-4 sticky top-0 z-50">
      <h4 className="text-xl font-black uppercase">
        {/* {user?.username ?? "Menu"} */}
        <img src={lg} alt="" className="object-cover h-10" />
      </h4>
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <FaTimes className="text-red-500 text-3xl" />
        ) : (
          <GiHamburgerMenu className="text-3xl" />
        )}
      </button>

      {isMobileMenuOpen && (
        <nav className="absolute top-16 left-0 w-1/2 h-screen  bg-gray-800 p-4 z-40 font-lato">
          <ul className="space-y-8">
            {links.map((link) => (
              <li key={link.name} onClick={() => setIsMobileMenuOpen(false)}>
                <Link
                  to={link.path}
                  className="flex items-center gap-2 text-lg hover:bg-gray-600 p-2 rounded-md"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  toggleCart();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-lg hover:bg-gray-600 p-2 rounded-md"
              >
                🛒 Cart
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-2 text-lg hover:bg-red-600 p-2 rounded-md"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <FiLogOut className="text-xl" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
      {user ? (
        <div className="md:flex hidden items-center gap-4">
          <div className="bg-blue-600 w-10 h-10 pt-1 flex items-center justify-center text-white rounded-full text-lg">
            {user.username?.[0]?.toUpperCase()}
          </div>
          <span>{user.email}</span>
        </div>
      ) : (
        <span>Not logged in</span>
      )}
      {/* Cart Sliding Panel */}
      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </header>
  );
};

export default Header;
