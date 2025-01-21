// import { useState, useEffect } from "react";
// import apiClient from "../utils/apiClient";
// import { format } from "date-fns";
// import { AiOutlineInbox } from "react-icons/ai";

// interface Order {
//   _id: string;
//   products: { name: string; quantity: number; price: number; total: number }[];
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
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ordersPerPage] = useState(4);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await apiClient.get<Order[]>("/orders");
//         setOrders(response.data);
//         setFilteredOrders(response.data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     let updatedOrders = orders;

//     if (searchQuery) {
//       updatedOrders = updatedOrders.filter(order =>
//         order._id.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (dateFilter) {
//       updatedOrders = updatedOrders.filter(
//         order => format(new Date(order.createdAt), "yyyy-MM-dd") === dateFilter
//       );
//     }

//     setFilteredOrders(updatedOrders);
//   }, [searchQuery, dateFilter, orders]);

//   // Reset filters
//   const resetFilters = () => {
//     setSearchQuery("");
//     setDateFilter("");
//     setCurrentPage(1); // Reset to the first page
//   };

//   // Pagination logic
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(
//     indexOfFirstOrder,
//     indexOfLastOrder
//   );

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   if (loading) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <div className="loader"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen shadow-xl">
//       <h1 className="md:text-xl text-lg font-bold mb-6 uppercase text-blue-500">
//         Order History
//       </h1>

//       <div className="mb-4 flex flex-wrap gap-4">
//         <input
//           type="text"
//           placeholder="Search by order ID"
//           value={searchQuery}
//           onChange={e => setSearchQuery(e.target.value)}
//           className="border p-2 rounded w-full md:w-1/2"
//         />
//         <input
//           type="date"
//           value={dateFilter}
//           onChange={e => setDateFilter(e.target.value)}
//           className="border p-2 rounded w-full md:w-1/3"
//         />
//         <button
//           onClick={resetFilters}
//           className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition w-full md:w-auto"
//         >
//           Reset Filters
//         </button>
//       </div>

//       {filteredOrders.length === 0 ? (
//         <div className="h-96 flex flex-col justify-center items-center text-center bg-gray-50 rounded-lg shadow-md p-6">
//           <AiOutlineInbox className="text-7xl text-red-500 mb-4" />
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
//           {currentOrders.map(order => (
//             <div
//               key={order._id}
//               className="border border-orange-400 rounded-md p-4 bg-white flex flex-col md:flex-row justify-between items-start md:items-center"
//             >
//               <div className="mb-4 md:mb-0">
//                 <p className="font-bold text-lg">Order Id: #{order._id}</p>
//                 <p className="text-gray-600">Sold: {order.products.length}</p>
//                 <p className="text-gray-500">
//                   Date: {format(new Date(order.createdAt), "MMM dd, yyyy")}
//                 </p>
//               </div>
//               <div className="text-left md:text-right ">
//                 <p className="font-bold text-green-500 text-lg">
//                   ₦{order.totalAmount.toFixed(2)}
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

//       {/* Pagination */}
//       <div className="flex justify-center mt-6">
//         {Array.from(
//           { length: Math.ceil(filteredOrders.length / ordersPerPage) },
//           (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => paginate(i + 1)}
//               className={`mx-1 px-4 py-2 rounded-md ${
//                 currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               {i + 1}
//             </button>
//           )
//         )}
//       </div>

//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-2xl w-11/12 md:w-4/5 max-w-2xl p-8">
//             {/* Modal Header */}
//             <div className="mb-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase text-center">
//                 Order Details
//               </h2>
//               <p className="text-sm text-gray-500 text-center">
//                 Detailed information about the selected order.
//               </p>
//             </div>

//             {/* Order Information Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm font-medium text-gray-600">Order ID</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   {selectedOrder._id}
//                 </p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm font-medium text-gray-600">Status</p>
//                 <p
//                   className={`text-lg font-semibold ${
//                     selectedOrder.status === "Successful"
//                       ? "text-green-600"
//                       : "text-yellow-600"
//                   }`}
//                 >
//                   {selectedOrder.status}
//                 </p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm font-medium text-gray-600">
//                   Total Amount
//                 </p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   ₦{selectedOrder.totalAmount.toFixed(2)}
//                 </p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm font-medium text-gray-600">Date</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   {format(new Date(selectedOrder.createdAt), "MMM dd, yyyy")}
//                 </p>
//               </div>
//             </div>

//             {/* Products Section */}
//             <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
//               Products
//             </h3>
//             <div className="overflow-x-auto rounded-lg shadow-sm">
//               <table className="min-w-full bg-white">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Product
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Quantity
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Total
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {selectedOrder.products.map((product, index) => (
//                     <tr
//                       key={index}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 text-sm font-medium text-gray-800">
//                         {product.name}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         ₦{product.price.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         {product.quantity}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         ₦{product.total.toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Close Button */}
//             <div className="mt-6 flex justify-end">
//               <button
//                 className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
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
  products: { name: string; quantity: number; price: number; total: number }[];
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
        // Sort orders by createdAt in descending order (newest first)
        const sortedOrders = response.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
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
        order._id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (dateFilter) {
      updatedOrders = updatedOrders.filter(
        order => format(new Date(order.createdAt), "yyyy-MM-dd") === dateFilter
      );
    }

    setFilteredOrders(updatedOrders);
  }, [searchQuery, dateFilter, orders]);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setDateFilter("");
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen shadow-xl">
      <h1 className="md:text-xl text-lg font-bold mb-6 uppercase text-blue-500">
        Order History
      </h1>

      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by order ID"
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
        <button
          onClick={resetFilters}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition w-full md:w-auto"
        >
          Reset Filters
        </button>
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
              <div className="text-left md:text-right ">
                <p className="font-bold text-green-500 text-lg">
                  ₦{order.totalAmount.toFixed(2)}
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
          <div className="bg-white rounded-lg shadow-2xl w-11/12 md:w-4/5 max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase text-center">
                Order Details
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Detailed information about the selected order.
              </p>
            </div>

            {/* Order Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Order ID</p>
                <p className="text-lg font-semibold text-gray-800">
                  {selectedOrder._id}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p
                  className={`text-lg font-semibold ${
                    selectedOrder.status === "Successful"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {selectedOrder.status}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">
                  Total Amount
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  ₦{selectedOrder.totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {format(new Date(selectedOrder.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
            </div>

            {/* Products Section */}
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Products
            </h3>
            <div className="overflow-x-auto rounded-lg shadow-sm">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedOrder.products.map((product, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        ₦{product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        ₦{product.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
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
