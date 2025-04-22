import { useState } from "react";
import { MdDelete } from "react-icons/md";
// import img from "../assets/images.jpeg";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 250,
      quantity: 1,
      category: "Electronics",
      // image: img,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 150,
      quantity: 2,
      category: "Wearables",
      // image: img,
    },
  ]);

  const handleQuantityChange = (id: number, type: "increase" | "decrease") => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl relative">
        {/* Decorative Graphics */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl opacity-40"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-orange-600">Your Cart</h2>
          <button
            onClick={handleClearCart}
            className="text-gray-500 hover:text-red-500 text-lg font-bold"
          >
            Clear All
          </button>
        </div>

        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  {/* <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  /> */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.category} - ${item.price} each
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                    className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-semibold text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, "increase")}
                    className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-bold text-gray-700">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 font-semibold">
            Your cart is empty.
          </p>
        )}

        {/* Summary Section */}
        {cartItems.length > 0 && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-gray-700 font-semibold">
                ${calculateTotal()}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">Tax (10%)</span>
              <span className="text-gray-700 font-semibold">
                ${(calculateTotal() * 0.1).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-lg font-bold text-gray-800">
                ${(calculateTotal() * 1.1).toFixed(2)}
              </span>
            </div>
            <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-shadow shadow-lg hover:shadow-xl">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
