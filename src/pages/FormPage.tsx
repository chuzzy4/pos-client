import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../utils/apiClient";
import sdd from "../assets/images/sss.jpg";

const FormPage = () => {
  const [productName, setProductName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || quantity <= 0 || price <= 0 || !category || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("quantity", quantity.toString());
    formData.append("price", price.toString());
    formData.append("category", category);
    formData.append("image", image);

    setLoading(true);
    try {
      const response = await apiClient.post("/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message || "Product added successfully!");
      setProductName("");
      setQuantity(0);
      setPrice(0);
      setCategory("");
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center md:min-h-screen p-4 sm:p-8 bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 sm:mb-6">
            New Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-gray-700 font-medium">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={e => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                placeholder="Enter quantity"
                className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Price</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Select Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="Biscuits">Biscuits</option>
                <option value="Candy">Candy</option>
                <option value="Soap">Soap</option>
                <option value="Beverages">Beverages</option>
                <option value="Noodles">Noodles</option>
                <option value="Cigarettes">Cigarettes</option>
                <option value="Insecticides"> Insecticides </option>
                <option value="Drinks"> Drinks </option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-shadow shadow-md hover:shadow-lg flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    border: "2px solid #ffffff",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 0.75s linear infinite",
                  }}
                ></span>
              ) : (
                "Add Product"
              )}
            </button>
          </form>
        </div>

        {/* Right Image Section */}

        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 text-white items-center justify-center">
          <div className="text-center p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              Showcase Your Product
            </h3>
            <p className="text-sm sm:text-lg">
              Add new products to your inventory and grow your business!
            </p>
            <div className="mt-6">
              <img
                src={sdd}
                alt="Product Placeholder"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
};

export default FormPage;
