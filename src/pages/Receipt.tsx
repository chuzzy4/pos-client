// import { useLocation } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
// import { useRef } from "react";
// import rcplg from "../assets/images/es.png";

// function Receipt() {
//   const location = useLocation();
//   const { order } = location.state || {};

//   const contentRef = useRef<HTMLDivElement>(null);

//   // Handle the print action
//   const handlePrint = useReactToPrint({
//     contentRef,
//   });

//   if (!order) {
//     return <div>Order not found.</div>;
//   }

//   // Get the current date
//   const currentDate = new Date().toLocaleDateString();

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div
//         className="receipt bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full border border-gray-200"
//         ref={contentRef}
//       >
//         {/* Logo and Header */}
//         <div className="text-center mb-6">
//           <img src={rcplg} alt="Company Logo" className="mx-auto mb-4 h-10" />
//           <h1 className="text-2xl font-bold text-gray-800">Receipt</h1>
//           <p className="text-sm text-gray-500">{currentDate}</p>
//         </div>

//         {/* Customer Details */}
//         <div className="mb-6">
//           <h3 className="text-lg font-bold text-gray-700">Customer Details</h3>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Name:</span> {order.customerName}
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Address:</span> {order.address}
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Phone:</span> {order.phoneNumber}
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Payment Method:</span>{" "}
//             {order.paymentMethod}
//           </p>
//         </div>

//         {/* Order Summary */}
//         <div className="mb-6">
//           <h3 className="text-lg font-bold text-gray-700">Order Summary</h3>
//           <ul className="text-sm text-gray-600 border-t border-gray-200">
//             {order.products.map((product: any) => (
//               <li
//                 key={product.productId}
//                 className="flex justify-between py-2 border-b last:border-b-0 border-gray-200"
//               >
//                 <span>
//                   {product.name} (x{product.quantity})
//                 </span>
//                 <span> ₦{product.total.toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-between text-gray-800 text-lg font-bold mt-4">
//             <span>Total:</span>
//             <span>₦{order.totalAmount.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* Footer with Print Button */}
//         <div className="mt-8 text-center">
//           <p className="text-sm text-gray-500 mb-4">
//             Thank you for shopping with us!
//           </p>
//           <button
//             onClick={() => handlePrint()}
//             className="bg-blue-600 text-white font-medium py-2 px-4 rounded shadow hover:bg-blue-700 transition"
//           >
//             Print Receipt
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Receipt;

// import { useLocation } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
// import { useRef } from "react";
// import rcplg from "../assets/images/es.png";
// import { QRCodeSVG } from "qrcode.react"; // Use QRCodeSVG

// function Receipt() {
//   const location = useLocation();
//   const { order } = location.state || {};

//   const contentRef = useRef<HTMLDivElement>(null);

//   // Handle the print action
//   const handlePrint = useReactToPrint({
//     contentRef,
//   });

//   if (!order) {
//     return <div>Order not found.</div>;
//   }

//   // Get the current date
//   const currentDate = new Date().toLocaleDateString();

//   // Hardcoded supermarket details
//   const supermarketDetails = {
//     name: "SuperMart",
//     address: "123 Main Street, Cityville",
//     phone: "+123 456 7890",
//     email: "info@supermart.com",
//     website: "www.supermart.com",
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div
//         className="receipt bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full border border-gray-200"
//         ref={contentRef}
//       >
//         {/* Logo and Header */}
//         <div className="text-center mb-6">
//           <img src={rcplg} alt="Company Logo" className="mx-auto mb-4 h-10" />
//           <h1 className="text-2xl font-bold text-gray-800">Receipt</h1>
//           <p className="text-sm text-gray-500">{currentDate}</p>
//         </div>

//         {/* Supermarket Details */}
//         <div className="mb-6">
//           <h3 className="text-lg font-bold text-gray-700">
//             Supermarket Details
//           </h3>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Name:</span> {supermarketDetails.name}
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Address:</span>{" "}
//             {supermarketDetails.address}
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Phone:</span>{" "}
//             {supermarketDetails.phone}
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Email:</span>{" "}
//             {supermarketDetails.email}
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Website:</span>{" "}
//             {supermarketDetails.website}
//           </p>
//         </div>

//         {/* Order Summary */}
//         <div className="mb-6">
//           <h3 className="text-lg font-bold text-gray-700">Order Summary</h3>
//           <ul className="text-sm text-gray-600 border-t border-gray-200">
//             {order.products.map((product: any) => (
//               <li
//                 key={product.productId}
//                 className="flex justify-between py-2 border-b last:border-b-0 border-gray-200"
//               >
//                 <span>
//                   {product.name} (x{product.quantity})
//                 </span>
//                 <span> ₦{product.total.toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-between text-gray-800 text-lg font-bold mt-4">
//             <span>Total:</span>
//             <span>₦{order.totalAmount.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="mt-8 text-center">
//           <QRCodeSVG
//             value={`Order ID: ${
//               order._id
//             }\nTotal Amount: ₦${order.totalAmount.toFixed(2)}`}
//             size={128}
//             level="H"
//             includeMargin={true}
//           />
//           <p className="text-sm text-gray-500 mt-2">
//             Scan this QR code for order details.
//           </p>
//         </div>

//         {/* Footer with Print Button */}
//         <div className="mt-8 text-center">
//           <p className="text-sm text-gray-500 mb-4">
//             Thank you for shopping with us!
//           </p>
//           <button
//             onClick={() => handlePrint()} // Fix: Wrap handlePrint in an arrow function
//             className="bg-blue-600 text-white font-medium py-2 px-4 rounded shadow hover:bg-blue-700 transition"
//           >
//             Print Receipt
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Receipt;

import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import rcplg from "../assets/images/es.png";
import { QRCodeSVG } from "qrcode.react";

function Receipt() {
  const location = useLocation();
  const { order } = location.state || {};

  const contentRef = useRef<HTMLDivElement>(null);

  // Handle the print action
  const handlePrint = useReactToPrint({
    contentRef,
  });

  if (!order) {
    return <div>Order not found.</div>;
  }

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  // Hardcoded supermarket details
  const supermarketDetails = {
    name: "SuperMart",
    address: [
      "15 Vaughan street, ebutemetta",
      "11 brickfield road, ebutemetta",
    ],
    phone: "+123 456 7890",
    email: "info@supermart.com",
    website: "www.supermart.com",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div
        className="receipt bg-white shadow-lg rounded-lg p-6 max-w-sm w-full border border-gray-200"
        ref={contentRef}
      >
        {/* Logo and Header */}
        <div className="text-center mb-4">
          <img src={rcplg} alt="Company Logo" className="mx-auto mb-2 h-8" />
          <h1 className="text-xl font-bold text-gray-800">
            {supermarketDetails.name}
          </h1>
          <p className="text-xs text-gray-500">
            {supermarketDetails.address[0]}
          </p>
          <p className="text-xs text-gray-500">
            {supermarketDetails.address[1]}
          </p>
          <p className="text-xs text-gray-500">{supermarketDetails.phone}</p>
          <p className="text-xs text-gray-500">{supermarketDetails.email}</p>
          <p className="text-xs text-gray-500">{supermarketDetails.website}</p>
          <p className="text-xs text-gray-500">{currentDate}</p>
        </div>

        {/* Order Summary */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-700 text-center mb-2">
            Order Summary
          </h3>
          <table className="w-full text-sm border border-gray-200 shadow-sm">
            <thead>
              <tr className="bg-blue-100">
                <th className="py-1 px-2 text-left">Item</th>
                <th className="py-1 px-2 text-right">Qty</th>
                <th className="py-1 px-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product: any) => (
                <tr
                  key={product.productId}
                  className="border-b border-gray-200"
                >
                  <td className="py-1 px-2">{product.name}</td>
                  <td className="py-1 px-2 text-right">{product.quantity}</td>
                  <td className="py-1 px-2 text-right">
                    ₦{product.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between text-gray-800 font-bold mt-2">
            <span>Total:</span>
            <span>₦{order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* QR Code */}
        <div className="mt-4 text-center items-center flex justify-center flex-col">
          <QRCodeSVG
            value={`Order ID: ${
              order._id
            }\nTotal Amount: ₦${order.totalAmount.toFixed(2)}`}
            size={100}
            level="H"
            includeMargin={true}
          />
          <p className="text-xs text-gray-500 mt-1">
            Scan this QR code for order details.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 mb-2">
            Thank you for shopping with us!
          </p>
          <button
            onClick={() => handlePrint()}
            className="bg-blue-600 text-white font-medium py-1 px-3 rounded shadow hover:bg-blue-700 transition text-sm"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
