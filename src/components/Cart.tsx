import { FiX } from "react-icons/fi";
import { BsCartX } from "react-icons/bs";
import { useCart } from "../hooks/CartContext";
import { useNavigate } from "react-router-dom";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeItem, clearCart, getTotalQuantity } =
    useCart();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    onClose();
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      {/* Cart Header */}
      <div className="p-5 flex justify-between items-center border-b bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <FiX size={28} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-5 space-y-4 h-[55%] overflow-y-auto">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4 border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Item Content */}
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Unit Price: ₦{item.price}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, false)}
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 font-bold"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, true)}
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-lg font-bold text-gray-800">
                  ₦{item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-center text-gray-400">
            <span className="text-gray-400">
              <BsCartX size={180} />
            </span>
            <p className="text-lg mb-4">Your cart is empty.</p>
            <p className="text-sm text-white">
              Start adding items to see them here.
            </p>
          </div>
        )}
      </div>

      {/* Cart Footer */}
      {cartItems.length > 0 && (
        <div className="p-5 border-t bg-gray-100">
          <div className="flex justify-between items-center mb-3">
            <p>Items</p>
            <span className="text-blue-500 flex gap-1">
              <p className="text-gray-700">QTY</p> ({getTotalQuantity()})
            </span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-lg font-semibold text-gray-700">Total</p>
            <p className="text-xl font-bold text-green-500 flex gap-1">
              <span className="text-gray-700 font-medium"> ₦</span>
              {calculateSubtotal()}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearCart}
              className="w-1/2 bg-red-500 text-white py-2 rounded-md text-sm font-medium hover:bg-red-800 transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="w-1/2 bg-green-500 text-white py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
