// import { useLocation } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
// import { useRef } from "react";

// function Receipt() {
//   const location = useLocation();
//   const { order } = location.state || {};

//   const contentRef = useRef<HTMLDivElement>(null);

//   // Handle the print action
//   const handlePrint = useReactToPrint({
//     contentRef, // Pass the ref directly here
//   });

//   if (!order) {
//     return <div>Order not found.</div>;
//   }

//   return (
//     <div className="receipt" ref={contentRef}>
//       <h1>Receipt</h1>
//       <h3>Customer Details</h3>
//       <p>Name: {order.customerName}</p>
//       <p>Address: {order.address}</p>
//       <p>Phone: {order.phoneNumber}</p>
//       <p>Payment Method: {order.paymentMethod}</p>

//       <h3>Order Summary</h3>
//       <ul>
//         {order.products.map((product: any) => (
//           <li key={product.productId}>
//             {product.name} (x{product.quantity}) - ${product.total}
//           </li>
//         ))}
//       </ul>

//       <div>Total: ${order.totalAmount}</div>

//       {/* Wrap handlePrint in an anonymous function */}
//       <button onClick={() => handlePrint()}>Print Receipt</button>
//     </div>
//   );
// }

// export default Receipt;

import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div
        className="receipt bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full border border-gray-200"
        ref={contentRef}
      >
        {/* Logo and Header */}
        <div className="text-center mb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsScWYmyfPv3XdkNdEFVJ1wlDKMOgcSWUcg&s"
            alt="Company Logo"
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Receipt</h1>
          <p className="text-sm text-gray-500">{currentDate}</p>
        </div>

        {/* Customer Details */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-700">Customer Details</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Name:</span> {order.customerName}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Address:</span> {order.address}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Phone:</span> {order.phoneNumber}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Payment Method:</span>{" "}
            {order.paymentMethod}
          </p>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-700">Order Summary</h3>
          <ul className="text-sm text-gray-600 border-t border-gray-200">
            {order.products.map((product: any) => (
              <li
                key={product.productId}
                className="flex justify-between py-2 border-b last:border-b-0 border-gray-200"
              >
                <span>
                  {product.name} (x{product.quantity})
                </span>
                <span>${product.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-gray-800 text-lg font-bold mt-4">
            <span>Total:</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer with Print Button */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Thank you for shopping with us!
          </p>
          <button
            onClick={() => handlePrint()}
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded shadow hover:bg-blue-700 transition"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
