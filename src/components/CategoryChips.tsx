import { useState } from "react";
import ctg from "../assets/images/download.png";

interface CategoryChipsProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
  onSearch: (term: string) => void;
}

const CategoryChips = ({
  categories,
  onCategorySelect,
  onSearch,
}: CategoryChipsProps) => {
  const [activeCategory, setActiveCategory] = useState("All"); // Track active category
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategorySelect(category); // Notify parent of selected category
    setShowModal(false); // Close modal on selection
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Notify parent of search term
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Display First 4 Categories */}
        <div className="flex gap-3 items-center flex-wrap">
          {/* "All" Category */}
          <button
            className={`flex items-center gap-2 px-5 py-2 rounded-full shadow-sm transition-all ${
              activeCategory === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => handleCategoryClick("All")}
          >
            <img
              src={ctg}
              alt="All categories"
              className="h-8 w-8 rounded-full object-cover"
            />
            All
          </button>

          {/* Dynamic Categories */}
          {categories.slice(0, 3).map(category => (
            <button
              key={category}
              className={`flex items-center gap-2 px-5 py-2 rounded-full shadow-sm transition-all ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={ctg}
                alt={category}
                className="h-8 w-8 rounded-full object-cover"
              />
              {category}
            </button>
          ))}

          {/* Icon Button for Modal */}
          {categories.length > 4 && (
            <button
              className="px-5 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-blue-100 shadow-sm"
              onClick={() => setShowModal(true)}
            >
              + More
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="flex-shrink-0 md:w-auto w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Modal for Categories */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg transition-transform transform scale-95 animate-fade-in">
            <h2 className="text-lg font-bold mb-4">SELECT A CATEGORY</h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full shadow-sm transition-all ${
                    activeCategory === category
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <img
                    src={ctg}
                    alt={category}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  {category}
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryChips;
