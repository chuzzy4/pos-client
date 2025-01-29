import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "./Cart";
import { AiOutlineForm } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import { MdOutlineInventory } from "react-icons/md";
import { BsBoxSeamFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi2";

const Sidebar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const links = [
    {
      name: "Home",
      path: "/",
      icon: (
        <span>
          <HiHome />
        </span>
      ),
    },
    {
      name: "Orders",
      path: "/orders",
      icon: (
        <span>
          <BsBoxSeamFill className="text-yellow-500" />
        </span>
      ),
    },
    {
      name: "New Items",
      path: "/form",
      icon: (
        <span className="text-orange-500">
          <AiOutlineForm />
        </span>
      ),
    },
  ];

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white h-screen hidden md:flex flex-col justify-between p-4 sticky top-0 z-50 font-nouvelr">
        {/* Navigation Links */}
        <nav>
          <ul className="space-y-8 mt-10">
            {links.map(link => (
              <li key={link.name} onClick={closeCart}>
                <Link
                  to={link.path}
                  className="flex items-center gap-2 text-lg hover:bg-gray-700 p-2 rounded-md"
                >
                  <span>{link.icon}</span>
                  <span> {link.name}</span>
                </Link>
              </li>
            ))}
            {/* Cart Link */}
            <li>
              <button
                onClick={toggleCart}
                className="flex items-center gap-2 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <span>🛒</span>
                Cart
              </button>
            </li>
            <Link
              to={"/analytics"}
              className="flex items-center gap-2 text-lg hover:bg-gray-700 p-2 rounded-md"
              onClick={closeCart}
            >
              <span className="text-green-500">
                {" "}
                <GoGraph />
              </span>
              Analytics
            </Link>
            <Link
              to={"/inventory"}
              className="flex items-center gap-2 text-lg hover:bg-gray-700 p-2 rounded-md"
              onClick={closeCart}
            >
              <span className="text-blue-500">
                {" "}
                <MdOutlineInventory />
              </span>
              Inventory
            </Link>
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          className="flex items-center gap-2 text-lg hover:bg-red-700 p-2 rounded-md mt-auto"
          onClick={logout}
        >
          <span className="text-xl">
            <FiLogOut />
          </span>
          Logout
        </button>
      </aside>

      {/* Cart Sliding Panel */}
      <Cart isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
};

export default Sidebar;
