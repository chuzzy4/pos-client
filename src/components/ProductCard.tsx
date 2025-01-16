import { useCart } from "../hooks/CartContext";
import { useState } from "react";
import apiClient from "../utils/apiClient"; // Import your axios instance
import Modal from "react-modal";
import { toast } from "react-toastify";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Product {
  _id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

Modal.setAppElement("#root"); // For accessibility (ensures that the modal doesn't block other elements)

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [showActions, setShowActions] = useState(false); // State to manage the actions visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false); // State for restock modal
  const [restockQuantity, setRestockQuantity] = useState<number | string>(""); // State for restock quantity input
  const [isRestocking, setIsRestocking] = useState(false); // Track restocking state

  const handleAddToCart = () => {
    if (product.quantity > 0) {
      const cartItem = { ...product, quantity: 1 };
      addToCart(cartItem);
    }
  };

  const handleRestock = async () => {
    if (
      restockQuantity === "" ||
      isNaN(Number(restockQuantity)) ||
      Number(restockQuantity) <= 0
    ) {
      toast.error("Please enter a valid quantity to restock!");
      return;
    }

    try {
      setIsRestocking(true);
      const response = await apiClient.put(`/products/restock/${product._id}`, {
        quantity: Number(restockQuantity),
      });
      toast.success(response.data.message);
      setIsRestocking(false);
      setIsRestockModalOpen(false); // Close the restock modal after successful restock
      window.location.reload(); // Refresh the page after successful restock
    } catch (error) {
      console.error("Error restocking product:", error);
      toast.error("Failed to restock product.");
      setIsRestocking(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/products/${product._id}`);
      toast.success(response.data.message);
      setIsDeleteModalOpen(false); // Close the delete modal after deletion
      window.location.reload(); // Refresh the page after successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="bg-white flex flex-col items-center shadow-md p-4 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl relative ">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded-xl bg-white"
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-yellow-500 font-bold">${product.price}</p>
      <p
        className={`${
          product.quantity > 0 ? "text-green-500" : "text-red-500"
        } text-sm`}
      >
        {product.quantity > 0
          ? `${product.quantity} stock available`
          : "Out of Stock"}
      </p>

      {/* <button
        className={`bg-yellow-500 text-white px-4 py-2 rounded-md mt-2 transition-all duration-300 ${
          product.quantity > 0
            ? "hover:bg-yellow-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        onClick={handleAddToCart}
        disabled={product.quantity <= 0}
      >
        {product.quantity > 0 ? "Add to Cart" : "Unavailable"}
      </button> */}
      <button
        className={` text-white px-4 py-2 rounded-md mt-2 transition-all duration-300 ${
          product.quantity > 0
            ? "hover:bg-slate-600 bg-slate-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleAddToCart}
        disabled={product.quantity <= 0}
      >
        {product.quantity > 0 ? "Add to Cart" : "Unavailable"}
      </button>

      {/* Three dots button to toggle the action menu */}
      <button
        onClick={() => setShowActions(!showActions)}
        className="absolute top-2 right-2 bg-gray-200 p-5 h-6 w-6 flex text-black justify-center items-center rounded-full"
      >
        <p>
          <CiMenuKebab />
        </p>
      </button>

      {/* Conditional render of Restock and Delete buttons */}
      {showActions && (
        // <div className="absolute top-10 right-2 flex space-x-2 flex flex-col space-y-3 bg-white p-5 shadow-xl rounded-xl">
        //   <button
        //     className="bg-blue-500 text-white px-2 py-1 rounded-xl hover:bg-blue-600 transform hover:scale-105 duration-300 transition-all"
        //     onClick={() => setIsRestockModalOpen(true)} // Open restock modal
        //     disabled={isRestocking}
        //   >
        //     {isRestocking ? "Restocking..." : "Restock"}
        //   </button>
        //   <button
        //     className="bg-red-500 text-white px-2 py-1 rounded-xl transform hover:scale-105 duration-300 transition-all hover:bg-red-600"
        //     onClick={() => setIsDeleteModalOpen(true)} // Open delete confirmation modal
        //   >
        //     Delete
        //   </button>
        // </div>

        <div className="absolute top-10 right-2 flex flex-col space-y-4 bg-white p-4 shadow-lg rounded-lg">
          {/* Restock Button */}
          <button
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 duration-300"
            onClick={() => setIsRestockModalOpen(true)} // Open restock modal
            disabled={isRestocking}
          >
            <FaEdit className="w-5 h-5" />
            <span>{isRestocking ? "Restocking..." : "Restock"}</span>
          </button>

          {/* Delete Button */}
          <button
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transform hover:scale-105 duration-300"
            onClick={() => setIsDeleteModalOpen(true)} // Open delete confirmation modal
          >
            <FaTrash className="w-5 h-5" />
            <span>Delete</span>
          </button>
        </div>
      )}

      {/* Modal for delete confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete Confirmation"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h3 className="text-lg font-light font-josefin ">
          Are you sure you want to delete {product.name} ?
        </h3>
        <div className="mt-4 flex justify-around">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Modal for restocking */}
      <Modal
        isOpen={isRestockModalOpen}
        onRequestClose={() => setIsRestockModalOpen(false)}
        contentLabel="Restock Product"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h3 className="text-lg font-bold ">Enter quantity to restock:</h3>
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={restockQuantity}
          onChange={e => setRestockQuantity(e.target.value)} // Capture input change
          className="w-full p-2 border border-gray-300 rounded-md mt-2"
          id="restock-quantity"
        />
        <div className="mt-4 flex justify-around">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={handleRestock} // Call restock function
          >
            Restock
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={() => setIsRestockModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductCard;
