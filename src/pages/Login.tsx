// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import apiClient from "../utils/apiClient";
// import { AxiosError } from "axios";

// const Login: React.FC = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     console.log("Form data being sent:", formData);

//     try {
//       const { data } = await apiClient.post("/auth/login", formData);

//       console.log("Response from server:", data);

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         navigate("/"); // Redirect to dashboard
//       } else {
//         alert("Login failed. No token received.");
//       }
//     } catch (error) {
//       // Handle errors
//       if (error instanceof AxiosError) {
//         console.error("Axios error response:", error.response?.data);
//         alert(
//           error.response?.data.message || "Login failed. Please try again."
//         );
//       } else {
//         console.error("Unexpected error:", error);
//         alert("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <input
//         id="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//       />
//       <input
//         id="password"
//         placeholder="Password"
//         type="password"
//         value={formData.password}
//         onChange={handleChange}
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";
import { AxiosError } from "axios";
import ssg from "../assets/images/sss.jpg"; // Import your image
import bh from "../assets/images/lgh.png";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await apiClient.post("/auth/login", formData);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/"); // Redirect to dashboard
      } else {
        alert("Login failed. No token received.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(
          error.response?.data.message || "Login failed. Please try again."
        );
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Section: Form */}
        <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center space-y-8">
          <div className="flex justify-center ">
            <img src={bh} alt="" className="h-10" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-800 text-center">
            Welcome Back!
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Access your POS and inventory system to manage products, sales, and
            stock effectively.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              required
            />
            <input
              id="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        {/* Right Section: Image */}
        <div className="hidden sm:block w-1/2 bg-blue-500 rounded-lg overflow-hidden">
          <img
            src={ssg} // Replace with your image URL
            alt="Login illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
