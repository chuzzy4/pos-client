// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import apiClient from "../utils/apiClient";

// const SignUp: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await apiClient.post("/auth/signup", formData);
//       alert("Signup successful! Redirecting to login...");
//       navigate("/login");
//     } catch (error) {
//       alert("Signup failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <input
//         id="name"
//         placeholder="Full Name"
//         value={formData.name}
//         onChange={handleChange}
//       />
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
//         Sign Up
//       </button>
//     </form>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";
import ssg from "../assets/images/sss.jpg"; // Replace with your image

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post("/auth/signup", formData);
      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Section: Form */}
        <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Join now and start managing your POS and inventory seamlessly.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              id="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
        {/* Right Section: Image */}
        <div className="hidden sm:block w-1/2 bg-blue-500 rounded-lg overflow-hidden">
          <img
            src={ssg} // Replace with your image URL
            alt="Signup illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
