// import { FiX } from "react-icons/fi";
// import { BsCartX } from "react-icons/bs";
// import { useCart } from "../hooks/CartContext";
// import { useNavigate } from "react-router-dom";
// import { MdDelete } from "react-icons/md";

// interface CartProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
//   const { cartItems, updateQuantity, removeItem, clearCart, getTotalQuantity } =
//     useCart();
//   const navigate = useNavigate();

//   const calculateSubtotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };

//   const handleCheckout = () => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     onClose();
//     navigate("/checkout");
//   };

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       } transition-transform duration-300 z-50`}
//     >
//       {/* Cart Header */}
//       <div className="p-5 flex justify-between items-center border-b bg-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800">
//           Your Cart{" "}
//           <span className="text-blue-500">({getTotalQuantity()})</span>
//         </h2>
//         <button
//           onClick={onClose}
//           className="text-gray-500 hover:text-red-500 transition-colors"
//         >
//           <FiX size={28} />
//         </button>
//       </div>

//       {/* Cart Items */}
//       <div className="p-5 space-y-4 h-[55%] overflow-y-auto">
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div
//               key={item._id}
//               className="flex items-center justify-between gap-4 border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
//             >
//               {/* Item Content */}
//               <div className="flex gap-4 items-center">
//                 <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-semibold text-gray-800 font-nouvelr">
//                     {item.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 font-aeonik">
//                     Unit Price: ₦{item.price}
//                   </p>

//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       onClick={() => updateQuantity(item._id, false)}
//                       className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 font-bold"
//                     >
//                       -
//                     </button>
//                     <span className="text-lg font-semibold text-black">
//                       {item.quantity}
//                     </span>
//                     <button
//                       onClick={() => updateQuantity(item._id, true)}
//                       className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 font-bold"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col items-end">
//                 <p className="text-lg font-bold text-gray-800">
//                   ₦{item.price * item.quantity}
//                 </p>
//                 <button
//                   onClick={() => removeItem(item._id)}
//                   className="text-xl text-red-500 bg-red-100 rounded-full p-2 hover:bg-red-200"
//                 >
//                   <MdDelete />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-center text-gray-400">
//             <span className="text-gray-400">
//               <BsCartX size={180} />
//             </span>
//             <p className="text-lg mb-4">Your cart is empty.</p>
//             <p className="text-sm text-white">
//               Start adding items to see them here.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Cart Footer */}
//       {cartItems.length > 0 && (
//         <div className="p-5 border-t bg-gray-100">
//           {/* <div className="flex justify-between items-center mb-3 ">
//             <p className="text-lg font-semibold text-gray-700">Items</p>
//             <span className="text-blue-500 flex gap-1">
//               <p className="text-gray-700 font-medium font-lato ">qty</p>
//               <p className="mt-1"> ({getTotalQuantity()})</p>
//             </span>
//           </div> */}
//           <div className="flex justify-between items-center mb-3">
//             <p className="text-lg font-semibold text-gray-700">Total</p>
//             <p className="text-xl font-bold text-green-500 flex gap-1">
//               <span className="text-gray-700 font-medium"> ₦</span>
//               {calculateSubtotal()}
//             </p>
//           </div>
//           <div className="flex gap-3 md:flex-row flex-col">
//             <button
//               onClick={clearCart}
//               className="md:w-1/2 w-full bg-red-500 text-white py-2 rounded-md text-md font-medium hover:bg-red-600 transition-colors"
//             >
//               Clear Cart
//             </button>
//             <button
//               onClick={handleCheckout}
//               className="md:w-1/2 w-full bg-green-500 text-white py-2 rounded-md text-md font-medium hover:bg-green-600 transition-colors"
//             >
//               Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// import { FiX } from "react-icons/fi";
// import { BsCartX } from "react-icons/bs";
// import { useCart } from "../hooks/CartContext";
// import { useNavigate } from "react-router-dom";
// import { MdDelete } from "react-icons/md";
// import { useState, useEffect } from "react";

// // Define the CartItem interface to match your actual structure
// interface CartItem {
//   _id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// interface CartProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
//   const { cartItems, updateQuantity, removeItem, clearCart, getTotalQuantity } =
//     useCart();
//   const navigate = useNavigate();

//   const [quantityInputs, setQuantityInputs] = useState<{
//     [key: number]: string;
//   }>({});

//   const calculateSubtotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };

//   const handleCheckout = () => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     onClose();
//     navigate("/checkout");
//   };

//   const handleQuantityInputChange = (itemId: number, value: string) => {
//     setQuantityInputs({
//       ...quantityInputs,
//       [itemId]: value,
//     });
//   };

//   const handleQuantityInputBlur = (itemId: number) => {
//     const newQuantity = parseInt(quantityInputs[itemId]);
//     if (!isNaN(newQuantity) && newQuantity >= 1) {
//       // Get current quantity
//       const currentItem = cartItems.find((item) => item._id === itemId);
//       if (currentItem) {
//         const currentQuantity = currentItem.quantity;

//         // If new quantity is greater than current quantity, increase
//         if (newQuantity > currentQuantity) {
//           // Call updateQuantity repeatedly to increase to the desired value
//           for (let i = currentQuantity; i < newQuantity; i++) {
//             updateQuantity(itemId, true);
//           }
//         }
//         // If new quantity is less than current quantity, decrease
//         else if (newQuantity < currentQuantity) {
//           // Call updateQuantity repeatedly to decrease to the desired value
//           for (let i = currentQuantity; i > newQuantity; i--) {
//             updateQuantity(itemId, false);
//           }
//         }
//       }
//     } else {
//       // Reset input field to current quantity if invalid input
//       const currentItem = cartItems.find((item) => item._id === itemId);
//       if (currentItem) {
//         setQuantityInputs({
//           ...quantityInputs,
//           [itemId]: currentItem.quantity.toString(),
//         });
//       }
//     }
//   };

//   const handleQuantityInputKeyDown = (
//     e: React.KeyboardEvent,
//     itemId: number
//   ) => {
//     if (e.key === "Enter") {
//       handleQuantityInputBlur(itemId);
//     }
//   };

//   // Initialize quantity inputs when cart items change
//   useEffect(() => {
//     const newInputs: { [key: number]: string } = {};
//     cartItems.forEach((item) => {
//       newInputs[item._id] = item.quantity.toString();
//     });
//     setQuantityInputs(newInputs);
//   }, [cartItems.length]);

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       } transition-transform duration-300 z-50`}
//     >
//       {/* Cart Header */}
//       <div className="p-5 flex justify-between items-center border-b bg-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800">
//           Your Cart{" "}
//           <span className="text-blue-500">({getTotalQuantity()})</span>
//         </h2>
//         <button
//           onClick={onClose}
//           className="text-gray-500 hover:text-red-500 transition-colors"
//         >
//           <FiX size={28} />
//         </button>
//       </div>

//       {/* Cart Items */}
//       <div className="p-5 space-y-4 h-[55%] overflow-y-auto">
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div
//               key={item._id}
//               className="flex items-center justify-between gap-4 border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
//             >
//               {/* Item Content */}
//               <div className="flex gap-4 items-center">
//                 <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-semibold text-gray-800 font-nouvelr">
//                     {item.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 font-aeonik">
//                     Unit Price: ₦{item.price}
//                   </p>

//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       onClick={() => updateQuantity(item._id, false)}
//                       className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 font-bold"
//                     >
//                       -
//                     </button>

//                     {/* Quantity input field */}
//                     <input
//                       type="number"
//                       min="1"
//                       value={quantityInputs[item._id] || item.quantity}
//                       onChange={(e) =>
//                         handleQuantityInputChange(item._id, e.target.value)
//                       }
//                       onBlur={() => handleQuantityInputBlur(item._id)}
//                       onKeyDown={(e) => handleQuantityInputKeyDown(e, item._id)}
//                       className="w-16 text-center border rounded-md py-1 px-2 text-lg font-semibold"
//                     />

//                     <button
//                       onClick={() => updateQuantity(item._id, true)}
//                       className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 font-bold"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col items-end">
//                 <p className="text-lg font-bold text-gray-800">
//                   ₦{item.price * item.quantity}
//                 </p>
//                 <button
//                   onClick={() => removeItem(item._id)}
//                   className="text-xl text-red-500 bg-red-100 rounded-full p-2 hover:bg-red-200"
//                 >
//                   <MdDelete />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-center text-gray-400">
//             <span className="text-gray-400">
//               <BsCartX size={180} />
//             </span>
//             <p className="text-lg mb-4">Your cart is empty.</p>
//             <p className="text-sm text-white">
//               Start adding items to see them here.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Cart Footer */}
//       {cartItems.length > 0 && (
//         <div className="p-5 border-t bg-gray-100">
//           <div className="flex justify-between items-center mb-3">
//             <p className="text-lg font-semibold text-gray-700">Total</p>
//             <p className="text-xl font-bold text-green-500 flex gap-1">
//               <span className="text-gray-700 font-medium"> ₦</span>
//               {calculateSubtotal()}
//             </p>
//           </div>
//           <div className="flex gap-3 md:flex-row flex-col">
//             <button
//               onClick={clearCart}
//               className="md:w-1/2 w-full bg-red-500 text-white py-2 rounded-md text-md font-medium hover:bg-red-600 transition-colors"
//             >
//               Clear Cart
//             </button>
//             <button
//               onClick={handleCheckout}
//               className="md:w-1/2 w-full bg-green-500 text-white py-2 rounded-md text-md font-medium hover:bg-green-600 transition-colors"
//             >
//               Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// UPDATED VERSION

// import { FiX } from "react-icons/fi";
// import { BsCartX } from "react-icons/bs";
// import { useCart } from "../hooks/CartContext";
// import { useNavigate } from "react-router-dom";
// import { MdDelete } from "react-icons/md";
// import { useState, useEffect } from "react";

// interface CartProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
//   // Use the CartItem type from your actual CartContext instead of redeclaring it
//   const { cartItems, updateQuantity, removeItem, clearCart, getTotalQuantity } =
//     useCart();
//   const navigate = useNavigate();

//   // Use number keys for the quantityInputs object to match the _id type
//   const [quantityInputs, setQuantityInputs] = useState<{
//     [key: number]: string;
//   }>({});

//   const calculateSubtotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };

//   const handleCheckout = () => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     onClose();
//     navigate("/checkout");
//   };

//   const handleQuantityInputChange = (itemId: number, value: string) => {
//     setQuantityInputs({
//       ...quantityInputs,
//       [itemId]: value,
//     });
//   };

//   const handleQuantityInputBlur = (itemId: number) => {
//     const newQuantity = parseInt(quantityInputs[itemId]);
//     if (!isNaN(newQuantity) && newQuantity >= 1) {
//       // Get current quantity
//       const currentItem = cartItems.find((item) => item._id === itemId);
//       if (currentItem) {
//         const currentQuantity = currentItem.quantity;

//         // If new quantity is greater than current quantity, increase
//         if (newQuantity > currentQuantity) {
//           // Call updateQuantity repeatedly to increase to the desired value
//           for (let i = currentQuantity; i < newQuantity; i++) {
//             updateQuantity(itemId, true);
//           }
//         }
//         // If new quantity is less than current quantity, decrease
//         else if (newQuantity < currentQuantity) {
//           // Call updateQuantity repeatedly to decrease to the desired value
//           for (let i = currentQuantity; i > newQuantity; i--) {
//             updateQuantity(itemId, false);
//           }
//         }
//       }
//     } else {
//       // Reset input field to current quantity if invalid input
//       const currentItem = cartItems.find((item) => item._id === itemId);
//       if (currentItem) {
//         setQuantityInputs({
//           ...quantityInputs,
//           [itemId]: currentItem.quantity.toString(),
//         });
//       }
//     }
//   };

//   const handleQuantityInputKeyDown = (
//     e: React.KeyboardEvent,
//     itemId: number
//   ) => {
//     if (e.key === "Enter") {
//       handleQuantityInputBlur(itemId);
//     }
//   };

//   // Initialize quantity inputs when cart items change
//   useEffect(() => {
//     const newInputs: { [key: number]: string } = {};
//     cartItems.forEach((item) => {
//       newInputs[item._id] = item.quantity.toString();
//     });
//     setQuantityInputs(newInputs);
//   }, [cartItems.length]);

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       } transition-transform duration-300 z-50`}
//     >
//       {/* Cart Header */}
//       <div className="p-5 flex justify-between items-center border-b bg-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800">
//           Your Cart{" "}
//           <span className="text-blue-500">({getTotalQuantity()})</span>
//         </h2>
//         <button
//           onClick={onClose}
//           className="text-gray-500 hover:text-red-500 transition-colors"
//         >
//           <FiX size={28} />
//         </button>
//       </div>

//       {/* Cart Items */}
//       <div className="p-5 space-y-4 h-[55%] overflow-y-auto">
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div
//               key={item._id}
//               className="flex items-center justify-between gap-4 border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
//             >
//               {/* Item Content */}
//               <div className="flex gap-4 items-center">
//                 <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-semibold text-gray-800 font-nouvelr">
//                     {item.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 font-aeonik">
//                     Unit Price: ₦{item.price}
//                   </p>

//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       onClick={() => updateQuantity(item._id, false)}
//                       className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 font-bold"
//                     >
//                       -
//                     </button>

//                     {/* Quantity input field */}
//                     <input
//                       type="number"
//                       min="1"
//                       value={quantityInputs[item._id] || item.quantity}
//                       onChange={(e) =>
//                         handleQuantityInputChange(item._id, e.target.value)
//                       }
//                       onBlur={() => handleQuantityInputBlur(item._id)}
//                       onKeyDown={(e) => handleQuantityInputKeyDown(e, item._id)}
//                       className="w-16 text-center border rounded-md py-1 px-2 text-lg font-semibold"
//                     />

//                     <button
//                       onClick={() => updateQuantity(item._id, true)}
//                       className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 font-bold"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col items-end">
//                 <p className="text-lg font-bold text-gray-800 font-lato">
//                   ₦{item.price * item.quantity}
//                 </p>
//                 <button
//                   onClick={() => removeItem(item._id)}
//                   className="text-xl text-red-500 bg-red-100 rounded-full p-2 hover:bg-red-200"
//                 >
//                   <MdDelete />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-center text-gray-400">
//             <span className="text-gray-400">
//               <BsCartX size={180} />
//             </span>
//             <p className="text-lg mb-4">Your cart is empty.</p>
//             <p className="text-sm text-white">
//               Start adding items to see them here.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Cart Footer */}
//       {cartItems.length > 0 && (
//         <div className="p-5 border-t bg-gray-100">
//           <div className="flex justify-between items-center mb-3">
//             <p className="text-lg font-semibold text-gray-700 font-nouvelr">
//               Total
//             </p>
//             <p className="text-xl font-bold text-green-500 flex gap-1 font-lato">
//               <span className="text-gray-700 font-medium font-nouvelr"> ₦</span>
//               {calculateSubtotal()}
//             </p>
//           </div>
//           <div className="flex gap-3 md:flex-row flex-col">
//             <button
//               onClick={clearCart}
//               className="md:w-1/2 w-full font-nouvelr bg-red-500 text-white py-2 rounded-md text-md font-medium hover:bg-red-600 transition-colors"
//             >
//               Clear Cart
//             </button>
//             <button
//               onClick={handleCheckout}
//               className="md:w-1/2 w-full bg-green-500 text-white py-2 rounded-md text-md font-medium hover:bg-green-600 transition-colors font-nouvelr"
//             >
//               Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import { FiX } from "react-icons/fi";
import { BsCartX } from "react-icons/bs";
import { useCart } from "../hooks/CartContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  // Use the CartItem type from your actual CartContext instead of redeclaring it
  const { cartItems, updateQuantity, removeItem, clearCart, getTotalQuantity } =
    useCart();
  const navigate = useNavigate();

  // Use number keys for the quantityInputs object to match the _id type
  const [quantityInputs, setQuantityInputs] = useState<{
    [key: number]: string;
  }>({});

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    // First save the cart items to localStorage for the checkout page
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Then clear the cart after checkout is initiated
    clearCart();

    // Close the cart drawer
    onClose();

    // Navigate to the checkout page
    navigate("/checkout");
  };

  const handleQuantityInputChange = (itemId: number, value: string) => {
    setQuantityInputs({
      ...quantityInputs,
      [itemId]: value,
    });
  };

  const handleQuantityInputBlur = (itemId: number) => {
    const newQuantity = parseInt(quantityInputs[itemId]);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      // Get current quantity
      const currentItem = cartItems.find((item) => item._id === itemId);
      if (currentItem) {
        const currentQuantity = currentItem.quantity;

        // If new quantity is greater than current quantity, increase
        if (newQuantity > currentQuantity) {
          // Call updateQuantity repeatedly to increase to the desired value
          for (let i = currentQuantity; i < newQuantity; i++) {
            updateQuantity(itemId, true);
          }
        }
        // If new quantity is less than current quantity, decrease
        else if (newQuantity < currentQuantity) {
          // Call updateQuantity repeatedly to decrease to the desired value
          for (let i = currentQuantity; i > newQuantity; i--) {
            updateQuantity(itemId, false);
          }
        }
      }
    } else {
      // Reset input field to current quantity if invalid input
      const currentItem = cartItems.find((item) => item._id === itemId);
      if (currentItem) {
        setQuantityInputs({
          ...quantityInputs,
          [itemId]: currentItem.quantity.toString(),
        });
      }
    }
  };

  const handleQuantityInputKeyDown = (
    e: React.KeyboardEvent,
    itemId: number
  ) => {
    if (e.key === "Enter") {
      handleQuantityInputBlur(itemId);
    }
  };

  // Initialize quantity inputs when cart items change
  useEffect(() => {
    const newInputs: { [key: number]: string } = {};
    cartItems.forEach((item) => {
      newInputs[item._id] = item.quantity.toString();
    });
    setQuantityInputs(newInputs);
  }, [cartItems.length]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      {/* Cart Header */}
      <div className="p-5 flex justify-between items-center border-b bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Cart{" "}
          <span className="text-blue-500">({getTotalQuantity()})</span>
        </h2>
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
          cartItems.map((item) => (
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
                  <h3 className="text-sm font-semibold text-gray-800 font-nouvelr">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-aeonik">
                    Unit Price: ₦{item.price}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, false)}
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 font-bold"
                    >
                      -
                    </button>

                    {/* Quantity input field */}
                    <input
                      type="number"
                      min="1"
                      value={quantityInputs[item._id] || item.quantity}
                      onChange={(e) =>
                        handleQuantityInputChange(item._id, e.target.value)
                      }
                      onBlur={() => handleQuantityInputBlur(item._id)}
                      onKeyDown={(e) => handleQuantityInputKeyDown(e, item._id)}
                      className="w-16 text-center border rounded-md py-1 px-2 text-lg font-semibold"
                    />

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
                <p className="text-lg font-bold text-gray-800 font-lato">
                  ₦{item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-xl text-red-500 bg-red-100 rounded-full p-2 hover:bg-red-200"
                >
                  <MdDelete />
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
            <p className="text-lg font-semibold text-gray-700 font-nouvelr">
              Total
            </p>
            <p className="text-xl font-bold text-green-500 flex gap-1 font-lato">
              <span className="text-gray-700 font-medium font-nouvelr"> ₦</span>
              {calculateSubtotal()}
            </p>
          </div>
          <div className="flex gap-3 md:flex-row flex-col">
            <button
              onClick={clearCart}
              className="md:w-1/2 w-full font-nouvelr bg-red-500 text-white py-2 rounded-md text-md font-medium hover:bg-red-600 transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="md:w-1/2 w-full bg-green-500 text-white py-2 rounded-md text-md font-medium hover:bg-green-600 transition-colors font-nouvelr"
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
