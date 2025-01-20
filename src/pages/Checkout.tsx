// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import apiClient from "../utils/apiClient";
// import { useNavigate } from "react-router-dom";

// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// // function Checkout() {
// //   const [cartItems, setCartItems] = useState<CartItem[]>([]);
// //   const [customerName, setCustomerName] = useState("");
// //   const [address, setAddress] = useState("");
// //   const [phoneNumber, setPhoneNumber] = useState("");
// //   const [paymentMethod, setPaymentMethod] = useState("");
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [loading, setLoading] = useState(false); // Loading state
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const cart = JSON.parse(
// //       localStorage.getItem("cartItems") || "[]"
// //     ) as CartItem[];
// //     setCartItems(cart);

// //     const total = cart.reduce(
// //       (acc, item) => acc + item.price * item.quantity,
// //       0
// //     );
// //     setTotalAmount(total);
// //   }, []);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true); // Enable loading state

// //     const products = cartItems.map(item => ({
// //       productId: item._id,
// //       quantity: item.quantity,
// //       name: item.name,
// //       price: item.price,
// //       total: item.price * item.quantity,
// //     }));

// //     const orderData = {
// //       customerName,
// //       address,
// //       phoneNumber,
// //       paymentMethod,
// //       products,
// //       totalAmount,
// //     };

// //     try {
// //       const response = await apiClient.post("/orders", orderData);
// //       toast.success("Order placed successfully!"); // Show success toast
// //       setLoading(false); // Disable loading state
// //       navigate("/receipt", { state: { order: response.data.order } });
// //     } catch (error) {
// //       console.error("Error submitting order:", error);
// //       toast.error("Failed to place the order. Please try again."); // Show error toast
// //       setLoading(false); // Disable loading state
// //     }
// //   };

// //   return (
// //     <div className="checkout max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6 ">
// //       <div className="flex flex-col lg:flex-row gap-8">
// //         <div className="w-full lg:w-1/2">
// //           <h3 className="text-2xl font-bold mb-4 text-gray-800">
// //             ORDER SUMMARY
// //           </h3>
// //           <ul className="space-y-2">
// //             {cartItems.map(item => (
// //               <li
// //                 key={item._id}
// //                 className="flex justify-between text-gray-700 border-b pb-2"
// //               >
// //                 <span>
// //                   {item.name} (x{item.quantity})
// //                 </span>
// //                 <strong> ₦{item.price * item.quantity}</strong>
// //               </li>
// //             ))}
// //           </ul>
// //           <div className="text-lg font-semibold mt-4">
// //             Total: <span className="text-blue-600"> ₦{totalAmount}</span>
// //           </div>
// //         </div>

// //         <div className="w-full lg:w-1/2">
// //           <h3 className="text-2xl font-bold mb-4 text-gray-800">
// //             CUSTOMER DETAILS
// //           </h3>
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div>
// //               <label className="block text-gray-700 mb-1">Name:</label>
// //               <input
// //                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 type="text"
// //                 value={customerName}
// //                 onChange={e => setCustomerName(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-gray-700 mb-1">Address:</label>
// //               <input
// //                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 type="text"
// //                 value={address}
// //                 onChange={e => setAddress(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-gray-700 mb-1">Phone Number:</label>
// //               <input
// //                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 type="text"
// //                 value={phoneNumber}
// //                 onChange={e => setPhoneNumber(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-gray-700 mb-1">
// //                 Payment Method:
// //               </label>
// //               <select
// //                 className="w-full p-2 border rounded-md"
// //                 value={paymentMethod}
// //                 onChange={e => setPaymentMethod(e.target.value)}
// //                 required
// //               >
// //                 <option value="">Select Payment Method</option>
// //                 <option value="Cash">Cash</option>
// //                 <option value="Debit Card">Debit Card</option>
// //                 <option value="Split Payment">Split Payment</option>
// //               </select>
// //             </div>
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className={`w-full py-2 rounded-md transition ${
// //                 loading
// //                   ? "bg-gray-400 cursor-not-allowed"
// //                   : "bg-blue-600 hover:bg-blue-700 text-white"
// //               }`}
// //             >
// //               {loading ? "Placing Order..." : "Place Order"}
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Checkout;

// function Checkout() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cart = JSON.parse(
//       localStorage.getItem("cartItems") || "[]"
//     ) as CartItem[];
//     setCartItems(cart);

//     const total = cart.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//     setTotalAmount(total);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const products = cartItems.map(item => ({
//       productId: item._id,
//       quantity: item.quantity,
//       name: item.name,
//       price: item.price,
//       total: item.price * item.quantity,
//     }));

//     const orderData = {
//       products,
//       totalAmount,
//     };

//     try {
//       const response = await apiClient.post("/orders", orderData);
//       toast.success("Order placed successfully!");
//       setLoading(false);
//       navigate("/receipt", { state: { order: response.data.order } });
//     } catch (error) {
//       console.error("Error submitting order:", error);
//       toast.error("Failed to place the order. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="checkout max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="w-full lg:w-1/2">
//           <h3 className="text-2xl font-bold mb-4 text-gray-800">
//             ORDER SUMMARY
//           </h3>
//           <ul className="space-y-2">
//             {cartItems.map(item => (
//               <li
//                 key={item._id}
//                 className="flex justify-between text-gray-700 border-b pb-2"
//               >
//                 <span>
//                   {item.name} (x{item.quantity})
//                 </span>
//                 <strong> ₦{item.price * item.quantity}</strong>
//               </li>
//             ))}
//           </ul>
//           <div className="text-lg font-semibold mt-4">
//             Total: <span className="text-blue-600"> ₦{totalAmount}</span>
//           </div>
//         </div>

//         <div className="w-full lg:w-1/2">
//           <h3 className="text-2xl font-bold mb-4 text-gray-800">PLACE ORDER</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-2 rounded-md transition ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700 text-white"
//               }`}
//             >
//               {loading ? "Placing Order..." : "Place Order"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    ) as CartItem[];
    setCartItems(cart);

    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const products = cartItems.map(item => ({
      productId: item._id,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      total: item.price * item.quantity,
    }));

    const orderData = {
      products,
      totalAmount,
    };

    try {
      const response = await apiClient.post("/orders", orderData);
      toast.success("Order placed successfully!");
      setLoading(false);
      navigate("/receipt", { state: { order: response.data.order } });
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to place the order. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="checkout max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Checkout
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order Summary */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Order Summary
          </h3>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li
                  key={item._id}
                  className="flex justify-between items-center text-gray-700 border-b pb-3"
                >
                  <span className="text-sm">
                    {item.name} (x{item.quantity})
                  </span>
                  <span className="font-semibold">
                    ₦{(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-lg font-bold mt-6 pt-4 border-t border-gray-200">
              <span>Total:</span>
              <span className="text-blue-600">₦{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Place Order */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Place Order</h3>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md text-lg font-semibold transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
