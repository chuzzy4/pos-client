// import { useState, useEffect } from "react";
// import apiClient from "../utils/apiClient";
// import { format } from "date-fns";
// import { AiOutlineInbox } from "react-icons/ai";

// // Define the structure of an Order
// interface Order {
//   _id: string;
//   customerName: string;
//   address: string;
//   phoneNumber: string;
//   paymentMethod: string;
//   products: { quantity: number; price: number; total: number }[];
//   totalAmount: number;
//   status: string;
//   createdAt: string;
// }

// const Orders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dateFilter, setDateFilter] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await apiClient.get<Order[]>("/orders");
//         setOrders(response.data);
//         setFilteredOrders(response.data); // Initialize filtered orders
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Handle search and date filter
//   useEffect(() => {
//     let updatedOrders = orders;

//     if (searchQuery) {
//       updatedOrders = updatedOrders.filter(order =>
//         order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (dateFilter) {
//       updatedOrders = updatedOrders.filter(
//         order => format(new Date(order.createdAt), "yyyy-MM-dd") === dateFilter
//       );
//     }

//     setFilteredOrders(updatedOrders);
//   }, [searchQuery, dateFilter, orders]);

//   if (loading) {
//     return (
//       <div className="h-screen flex justify-center items-center ">
//         <div className="loader"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Orders</h1>

//       {/* Search and Filter Inputs */}
//       <div className="mb-4 flex space-x-4">
//         <input
//           type="text"
//           placeholder="Search by customer name"
//           value={searchQuery}
//           onChange={e => setSearchQuery(e.target.value)}
//           className="border p-2 rounded w-1/2"
//         />
//         <input
//           type="date"
//           value={dateFilter}
//           onChange={e => setDateFilter(e.target.value)}
//           className="border p-2 rounded w-1/3"
//         />
//       </div>

//       {filteredOrders.length === 0 ? (
//         <div className="h-96 flex flex-col justify-center items-center text-center bg-gray-50 rounded-lg shadow-md p-6">
//           {/* <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-16 w-16 text-red-500 mb-4"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="12" cy="12" r="10" />
//             <line x1="12" y1="8" x2="12" y2="12" />
//             <line x1="12" y1="16" x2="12.01" y2="16" />
//           </svg> */}
//           <AiOutlineInbox className="text-7xl text-red-500" />
//           <h2 className="text-xl font-semibold text-gray-700">
//             No Orders Found
//           </h2>
//           <p className="text-gray-500 mt-2">
//             You haven’t placed any orders yet. Start exploring and place your
//             first order!
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {filteredOrders.map(order => (
//             <div
//               key={order._id}
//               className="border border-orange-400 rounded-md p-4 bg-white flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-bold text-lg">Order Id: #{order._id}</p>
//                 <p className="text-gray-600">Sold: {order.products.length}</p>
//                 <p className="text-gray-500">
//                   Date: {format(new Date(order.createdAt), "MMM dd, yyyy")}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-gray-600">Customer: {order.customerName}</p>
//                 <p className="font-bold text-green-500 text-lg">
//                   ${order.totalAmount.toFixed(2)}
//                 </p>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
//                   onClick={() => setSelectedOrder(order)}
//                 >
//                   View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal for Order Details */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-2xl p-8">
//             <div className="mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//                 Order Details
//               </h2>
//               <p className="text-sm text-gray-500">
//                 Here are the details of the selected order.
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
//               <div>
//                 <p className="font-medium">Order ID:</p>
//                 <p className="text-gray-600">{selectedOrder._id}</p>
//               </div>
//               <div>
//                 <p className="font-medium">Customer Name:</p>
//                 <p className="text-gray-600">{selectedOrder.customerName}</p>
//               </div>
//               <div>
//                 <p className="font-medium">Address:</p>
//                 <p className="text-gray-600">{selectedOrder.address}</p>
//               </div>
//               <div>
//                 <p className="font-medium">Phone Number:</p>
//                 <p className="text-gray-600">{selectedOrder.phoneNumber}</p>
//               </div>
//               <div>
//                 <p className="font-medium">Payment Method:</p>
//                 <p className="text-gray-600">{selectedOrder.paymentMethod}</p>
//               </div>
//               <div>
//                 <p className="font-medium">Status:</p>
//                 <p
//                   className={`${
//                     selectedOrder.status === "Pending"
//                       ? "text-yellow-500"
//                       : "text-green-500"
//                   } font-semibold`}
//                 >
//                   {selectedOrder.status}
//                 </p>
//               </div>
//               <div>
//                 <p className="font-medium">Total Amount:</p>
//                 <p className="text-gray-600"># {selectedOrder.totalAmount}</p>
//               </div>
//               <div>
//                 <p className="font-medium">Date:</p>
//                 <p className="text-gray-600">
//                   {format(new Date(selectedOrder.createdAt), "MMM dd, yyyy")}
//                 </p>
//               </div>
//             </div>

//             <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
//               Products
//             </h3>
//             <div className="border rounded-lg p-4 bg-gray-50">
//               <ul className="space-y-3">
//                 {selectedOrder.products.map((product, index) => (
//                   <li
//                     key={index}
//                     className="flex justify-between items-center border-b pb-2 last:border-b-0"
//                   >
//                     <div>
//                       <p className="text-sm text-gray-800 font-medium">
//                         Price: ${product.price.toFixed(2)}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-800 font-medium">
//                         Quantity: {product.quantity}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-800 font-medium">
//                         Total: ${product.total.toFixed(2)}
//                       </p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//                 onClick={() => setSelectedOrder(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

import { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import { format } from "date-fns";
import { AiOutlineInbox } from "react-icons/ai";

interface Order {
  _id: string;
  customerName: string;
  address: string;
  phoneNumber: string;
  paymentMethod: string;
  products: { quantity: number; price: number; total: number }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get<Order[]>("/orders");
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let updatedOrders = orders;

    if (searchQuery) {
      updatedOrders = updatedOrders.filter(order =>
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (dateFilter) {
      updatedOrders = updatedOrders.filter(
        order => format(new Date(order.createdAt), "yyyy-MM-dd") === dateFilter
      );
    }

    setFilteredOrders(updatedOrders);
  }, [searchQuery, dateFilter, orders]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by customer name"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="h-96 flex flex-col justify-center items-center text-center bg-gray-50 rounded-lg shadow-md p-6">
          <AiOutlineInbox className="text-7xl text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            No Orders Found
          </h2>
          <p className="text-gray-500 mt-2">
            You haven’t placed any orders yet. Start exploring and place your
            first order!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div
              key={order._id}
              className="border border-orange-400 rounded-md p-4 bg-white flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="mb-4 md:mb-0">
                <p className="font-bold text-lg">Order Id: #{order._id}</p>
                <p className="text-gray-600">Sold: {order.products.length}</p>
                <p className="text-gray-500">
                  Date: {format(new Date(order.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-gray-600">Customer: {order.customerName}</p>
                <p className="font-bold text-green-500 text-lg">
                  ${order.totalAmount.toFixed(2)}
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
                  onClick={() => setSelectedOrder(order)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-4/5 max-w-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Order Details
              </h2>
              <p className="text-sm text-gray-500">
                Here are the details of the selected order.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
              <div>
                <p className="font-medium">Order ID:</p>
                <p className="text-gray-600">{selectedOrder._id}</p>
              </div>
              <div>
                <p className="font-medium">Customer Name:</p>
                <p className="text-gray-600">{selectedOrder.customerName}</p>
              </div>
              <div>
                <p className="font-medium">Address:</p>
                <p className="text-gray-600">{selectedOrder.address}</p>
              </div>
              <div>
                <p className="font-medium">Phone Number:</p>
                <p className="text-gray-600">{selectedOrder.phoneNumber}</p>
              </div>
              <div>
                <p className="font-medium">Payment Method:</p>
                <p className="text-gray-600">{selectedOrder.paymentMethod}</p>
              </div>
              <div>
                <p className="font-medium">Status:</p>
                <p
                  className={`${
                    selectedOrder.status === "Pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  } font-semibold`}
                >
                  {selectedOrder.status}
                </p>
              </div>
              <div>
                <p className="font-medium">Total Amount:</p>
                <p className="text-gray-600"># {selectedOrder.totalAmount}</p>
              </div>
              <div>
                <p className="font-medium">Date:</p>
                <p className="text-gray-600">
                  {format(new Date(selectedOrder.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
              Products
            </h3>
            <div className="border rounded-lg p-4 bg-gray-50">
              <ul className="space-y-3">
                {selectedOrder.products.map((product, index) => (
                  <li
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm text-gray-800 font-medium">
                        Price: ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 font-medium">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 font-medium">
                        Total: ${product.total.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
