// import { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import apiClient from "../utils/apiClient"; // Import API client

// const Inventory = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [products, setProducts] = useState<any[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   // Fetch categories and products
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productResponse = await apiClient.get("/products");
//         console.log("API Response Data:", productResponse.data); // Debugging
//         const productData = productResponse.data.products; // Access 'products' array
//         setProducts(productData);

//         // Extract unique categories from products
//         const uniqueCategories: string[] = Array.from(
//           new Set(productData.map((product: any) => product.category))
//         );
//         setCategories(["All", ...uniqueCategories]);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter products by selected category
//   const filteredProducts =
//     selectedCategory === "All"
//       ? products
//       : products.filter(
//           (product: any) => product.category === selectedCategory
//         );

//   // Generate PDF
//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Title
//     doc.setFontSize(16);
//     doc.text("Inventory Report", 10, 10);
//     doc.setFontSize(12);
//     doc.text(`Category: ${selectedCategory}`, 10, 20);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);

//     // Table
//     const tableData = filteredProducts.map(product => [
//       product.name,
//       product.category,
//       product.quantity,
//     ]);
//     doc.autoTable({
//       head: [["Name", "Category", "Quantity"]],
//       body: tableData,
//       startY: 40,
//     });

//     // Save the PDF
//     doc.save("inventory-report.pdf");
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Inventory Report</h1>

//       <div className="mb-4">
//         <label className="font-semibold mr-2">Select Category:</label>
//         <select
//           value={selectedCategory}
//           onChange={e => setSelectedCategory(e.target.value)}
//           className="border p-2 rounded-md"
//         >
//           {categories.map(category => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         onClick={generatePDF}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//       >
//         Download PDF
//       </button>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Products:</h2>
//         <ul>
//           {filteredProducts.map((product: any) => (
//             <li key={product._id}>
//               {product.name} - Quantity: {product.quantity}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Inventory;

// import { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import apiClient from "../utils/apiClient";

// const Inventory = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [products, setProducts] = useState<any[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productResponse = await apiClient.get("/products");
//         const productData = productResponse.data.products;
//         setProducts(productData);

//         const uniqueCategories: string[] = Array.from(
//           new Set(productData.map((product: any) => product.category))
//         );
//         setCategories(["All", ...uniqueCategories]);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredProducts =
//     selectedCategory === "All"
//       ? products
//       : products.filter(
//           (product: any) => product.category === selectedCategory
//         );

//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Logo
//     const logoUrl = "/fg.jpeg"; // Replace with your logo path
//     const imgWidth = 30; // Desired width in mm
//     const imgHeight = imgWidth / 2; // Maintain aspect ratio (2:1 example)

//     doc.addImage(logoUrl, "PNG", 10, 10, imgWidth, imgHeight);

//     // Title
//     const pageWidth = doc.internal.pageSize.getWidth();
//     doc.setFontSize(16);
//     doc.text("Inventory Report", pageWidth / 2, 20, { align: "center" });
//     doc.setFontSize(12);
//     doc.text(`Category: ${selectedCategory}`, pageWidth / 2, 30, {
//       align: "center",
//     });
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, 40, {
//       align: "center",
//     });

//     // Table
//     const tableData = filteredProducts.map(product => [
//       product.name,
//       product.category,
//       product.price,
//       product.quantity,
//     ]);
//     doc.autoTable({
//       head: [["Name", "Category", "Price (#)", "Quantity"]],
//       body: tableData,
//       startY: 50,
//       theme: "grid",
//       styles: { font: "helvetica" },
//       headStyles: { fillColor: [41, 128, 185], textColor: 255 },
//     });

//     // Footer
//     doc.setFontSize(10);
//     doc.text(
//       "© Enymaz Ventures",
//       pageWidth / 2,
//       doc.internal.pageSize.height - 10,
//       {
//         align: "center",
//       }
//     );

//     doc.save("inventory-report.pdf");
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Inventory Report
//         </h1>

//         <div className="mb-6">
//           <label className="block font-medium text-gray-700 mb-2">
//             Select Category:
//           </label>
//           <select
//             value={selectedCategory}
//             onChange={e => setSelectedCategory(e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
//           >
//             {categories.map(category => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           onClick={generatePDF}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Download PDF
//         </button>

//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//             Products:
//           </h2>
//           <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="py-2 px-4 text-left">Name</th>
//                 <th className="py-2 px-4 text-left">Category</th>
//                 <th className="py-2 px-4 text-left">Price (₦)</th>
//                 <th className="py-2 px-4 text-left">Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map(product => (
//                 <tr key={product._id} className="border-t border-gray-200">
//                   <td className="py-2 px-4">{product.name}</td>
//                   <td className="py-2 px-4">{product.category}</td>
//                   <td className="py-2 px-4">₦{product.price}</td>
//                   <td className="py-2 px-4">{product.quantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inventory;

import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import apiClient from "../utils/apiClient";
import ey from "../assets/images/ey.png";

const Inventory = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await apiClient.get("/products");
        const productData = productResponse.data.products;
        setProducts(productData);

        const uniqueCategories: string[] = Array.from(
          new Set(productData.map((product: any) => product.category))
        );
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product: any) => product.category === selectedCategory
        );

  const generatePDF = () => {
    const doc = new jsPDF();

    // Logo
    const logoUrl = ey; // Replace with your logo path
    const imgWidth = 30; // Desired width in mm
    const imgHeight = imgWidth / 2; // Maintain aspect ratio (2:1 example)

    doc.addImage(logoUrl, "PNG", 10, 10, imgWidth, imgHeight);

    // Title
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(16);
    doc.text("Inventory Report", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Category: ${selectedCategory}`, pageWidth / 2, 30, {
      align: "center",
    });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, 40, {
      align: "center",
    });

    // Table
    const tableData = filteredProducts.map(product => [
      product.name,
      product.category,
      product.price,
      product.quantity,
    ]);
    doc.autoTable({
      head: [["Name", "Category", "Price (#)", "Quantity"]],
      body: tableData,
      startY: 50,
      theme: "grid",
      styles: { font: "helvetica" },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });

    // Footer
    doc.setFontSize(10);
    doc.text(
      "© Enymaz Ventures",
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      {
        align: "center",
      }
    );

    doc.save("inventory-report.pdf");
  };

  return (
    <div className="p-4 sm:p-6 bg-gra-100 min-h-screen ">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl text-blue-500 font-nouvelr mb-4">
          Inventory Report
        </h1>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2 font-nouvelr">
            Select Category:
          </label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Download PDF
        </button>

        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 font-nouvelr">
            Products
          </h2>
          <div className="overflow-x-hidden overflow-hidden">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left text-sm sm:text-base">
                    Name
                  </th>
                  <th className="py-2 px-4 text-left text-sm sm:text-base">
                    Category
                  </th>
                  <th className="py-2 px-4 text-left text-sm sm:text-base">
                    Price (₦)
                  </th>
                  <th className="py-2 px-4 text-left text-sm sm:text-base">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr
                    key={product._id}
                    className="border-t border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-2 px-4 text-sm sm:text-base">
                      {product.name}
                    </td>
                    <td className="py-2 px-4 text-sm sm:text-base">
                      {product.category}
                    </td>
                    <td className="py-2 px-4 text-sm sm:text-base">
                      ₦{product.price}
                    </td>
                    <td className="py-2 px-4 text-sm sm:text-base">
                      {product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
