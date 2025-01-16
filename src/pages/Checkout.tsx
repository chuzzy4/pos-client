// import { useState, useEffect } from "react";
// import apiClient from "../utils/apiClient"; // Assuming this is your API client
// import { useNavigate } from "react-router-dom";

// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// function Checkout() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [customerName, setCustomerName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the cart items from localStorage
//     const cart = JSON.parse(
//       localStorage.getItem("cartItems") || "[]"
//     ) as CartItem[];
//     setCartItems(cart);

//     // Calculate the total amount
//     const total = cart.reduce(
//       (acc: number, item) => acc + item.price * item.quantity,
//       0
//     );
//     setTotalAmount(total);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const products = cartItems.map(item => ({
//       productId: item._id,
//       quantity: item.quantity,
//       name: item.name,
//       price: item.price,
//       total: item.price * item.quantity,
//     }));

//     const orderData = {
//       customerName,
//       address,
//       phoneNumber,
//       paymentMethod,
//       products,
//       totalAmount,
//     };

//     try {
//       const response = await apiClient.post("/orders", orderData);
//       navigate("/receipt", { state: { order: response.data.order } }); // Pass order to receipt page
//     } catch (error) {
//       console.error("Error submitting order:", error);
//     }
//   };

//   return (
//     // <div className="checkout">
//     //   <h3>Order Summary</h3>
//     //   <ul>
//     //     {cartItems.map(item => (
//     //       <li key={item._id}>
//     //         {item.name} (x{item.quantity}) - ${item.price * item.quantity}
//     //       </li>
//     //     ))}
//     //   </ul>
//     //   <div>Total: ${totalAmount}</div>

//     //   <form onSubmit={handleSubmit}>
//     //     <label>Name:</label>
//     //     <input
//     //       type="text"
//     //       value={customerName}
//     //       onChange={e => setCustomerName(e.target.value)}
//     //       required
//     //     />
//     //     <label>Address:</label>
//     //     <input
//     //       type="text"
//     //       value={address}
//     //       onChange={e => setAddress(e.target.value)}
//     //       required
//     //     />
//     //     <label>Phone Number:</label>
//     //     <input
//     //       type="text"
//     //       value={phoneNumber}
//     //       onChange={e => setPhoneNumber(e.target.value)}
//     //       required
//     //     />
//     //     <label>Payment Method:</label>
//     //     <select
//     //       value={paymentMethod}
//     //       onChange={e => setPaymentMethod(e.target.value)}
//     //       required
//     //     >
//     //       <option value="*">Select Payment Method</option>
//     //       <option value="Cash">Cash</option>
//     //       <option value="Debit Card">Debit Card</option>
//     //       <option value="Split Payment">Split Payment</option>
//     //     </select>
//     //     <button type="submit">Place Order</button>
//     //   </form>
//     // </div>

//     <div className="checkout p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
//       <h3 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h3>
//       <ul className="mb-4">
//         {cartItems.map(item => (
//           <li key={item._id} className="text-gray-700">
//             {item.name} (x{item.quantity}) -{" "}
//             <strong>${item.price * item.quantity}</strong>
//           </li>
//         ))}
//       </ul>
//       <div className="text-lg font-semibold mb-4">
//         Total: <span className="text-blue-600">${totalAmount}</span>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="block text-gray-700">Name:</label>
//         <input
//           className="w-full p-2 border rounded-md"
//           type="text"
//           value={customerName}
//           onChange={e => setCustomerName(e.target.value)}
//           required
//         />
//         <label className="block text-gray-700">Address:</label>
//         <input
//           className="w-full p-2 border rounded-md"
//           type="text"
//           value={address}
//           onChange={e => setAddress(e.target.value)}
//           required
//         />
//         <label className="block text-gray-700">Phone Number:</label>
//         <input
//           className="w-full p-2 border rounded-md"
//           type="text"
//           value={phoneNumber}
//           onChange={e => setPhoneNumber(e.target.value)}
//           required
//         />
//         <label className="block text-gray-700">Payment Method:</label>
//         <select
//           className="w-full p-2 border rounded-md"
//           value={paymentMethod}
//           onChange={e => setPaymentMethod(e.target.value)}
//           required
//         >
//           <option value="">Select Payment Method</option>
//           <option value="Cash">Cash</option>
//           <option value="Debit Card">Debit Card</option>
//           <option value="Split Payment">Split Payment</option>
//         </select>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Checkout;

// import { useState, useEffect } from "react";
// import apiClient from "../utils/apiClient"; // Assuming this is your API client
// import { useNavigate } from "react-router-dom";

// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// function Checkout() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [customerName, setCustomerName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cart = JSON.parse(
//       localStorage.getItem("cartItems") || "[]"
//     ) as CartItem[];
//     setCartItems(cart);

//     const total = cart.reduce(
//       (acc: number, item) => acc + item.price * item.quantity,
//       0
//     );
//     setTotalAmount(total);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const products = cartItems.map(item => ({
//       productId: item._id,
//       quantity: item.quantity,
//       name: item.name,
//       price: item.price,
//       total: item.price * item.quantity,
//     }));

//     const orderData = {
//       customerName,
//       address,
//       phoneNumber,
//       paymentMethod,
//       products,
//       totalAmount,
//     };

//     try {
//       const response = await apiClient.post("/orders", orderData);
//       navigate("/receipt", { state: { order: response.data.order } });
//     } catch (error) {
//       console.error("Error submitting order:", error);
//     }
//   };

//   return (
//     <div className="checkout max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6 ">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Order Summary */}
//         <div className="w-full lg:w-1/2">
//           <h3 className="text-2xl font-bold mb-4 text-gray-800">
//             Order Summary
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
//                 <strong>${item.price * item.quantity}</strong>
//               </li>
//             ))}
//           </ul>
//           <div className="text-lg font-semibold mt-4">
//             Total: <span className="text-blue-600">${totalAmount}</span>
//           </div>
//         </div>

//         {/* Checkout Form */}
//         <div className="w-full lg:w-1/2">
//           <h3 className="text-2xl font-bold mb-4 text-gray-800">
//             Customer Details
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 mb-1">Name:</label>
//               <input
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 type="text"
//                 value={customerName}
//                 onChange={e => setCustomerName(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">Address:</label>
//               <input
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 type="text"
//                 value={address}
//                 onChange={e => setAddress(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">Phone Number:</label>
//               <input
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 type="text"
//                 value={phoneNumber}
//                 onChange={e => setPhoneNumber(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">
//                 Payment Method:
//               </label>
//               <select
//                 className="w-full p-2 border rounded-md"
//                 value={paymentMethod}
//                 onChange={e => setPaymentMethod(e.target.value)}
//                 required
//               >
//                 <option value="">Select Payment Method</option>
//                 <option value="Cash">Cash</option>
//                 <option value="Debit Card">Debit Card</option>
//                 <option value="Split Payment">Split Payment</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//             >
//               Place Order
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
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state
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
    setLoading(true); // Enable loading state

    const products = cartItems.map(item => ({
      productId: item._id,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      total: item.price * item.quantity,
    }));

    const orderData = {
      customerName,
      address,
      phoneNumber,
      paymentMethod,
      products,
      totalAmount,
    };

    try {
      const response = await apiClient.post("/orders", orderData);
      toast.success("Order placed successfully!"); // Show success toast
      setLoading(false); // Disable loading state
      navigate("/receipt", { state: { order: response.data.order } });
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to place the order. Please try again."); // Show error toast
      setLoading(false); // Disable loading state
    }
  };

  return (
    <div className="checkout max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6 ">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            ORDER SUMMARY
          </h3>
          <ul className="space-y-2">
            {cartItems.map(item => (
              <li
                key={item._id}
                className="flex justify-between text-gray-700 border-b pb-2"
              >
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <strong>${item.price * item.quantity}</strong>
              </li>
            ))}
          </ul>
          <div className="text-lg font-semibold mt-4">
            Total: <span className="text-blue-600">${totalAmount}</span>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            CUSTOMER DETAILS
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name:</label>
              <input
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Address:</label>
              <input
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone Number:</label>
              <input
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Payment Method:
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Split Payment">Split Payment</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md transition ${
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
  );
}

export default Checkout;
