import { useEffect, useState } from "react";
import DashboardStats from "../components/DashboardStats";
import CategoryChips from "../components/CategoryChips";
import ProductCard from "../components/ProductCard";
import apiClient from "../utils/apiClient";
import { MdOutlineInventory2 } from "react-icons/md";
import { BsClipboardX } from "react-icons/bs";

interface Product {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [selectedCategory, setSelectedCategory] = useState("All"); // Track selected category

  // Fetch all products and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: productData } = await apiClient.get("/products");
        setProducts(productData.products);
        setFilteredProducts(productData.products);

        const uniqueCategories: string[] = Array.from(
          new Set(productData.products.map((p: Product) => p.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on search term and selected category
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="p-4">
      <DashboardStats
        totalProducts={products.length}
        totalCategories={categories.length}
      />
      <h2 className="text-xl font-bold mt-8 py-2">Categories</h2>
      {categories.length > 0 ? (
        <CategoryChips
          categories={categories}
          onCategorySelect={setSelectedCategory}
          onSearch={setSearchTerm} // Pass search handler
        />
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md text-center border border-gray-200">
          <div className="text-blue-500">
            <MdOutlineInventory2 className="text-5xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mt-4">
            No Categories Found
          </h3>
          <p className="text-gray-600 mt-2">
            There are no categories available at the moment. You can start by
            adding one to organize your items.
          </p>
        </div>
      )}
      <h2 className="text-xl font-bold mt-8">All Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length > 0 ? (
        // <div className="grid grid-cols-4 gap-4 mt-4">
        //   {filteredProducts.map(product => (
        //     <ProductCard key={product._id} product={product} />
        //   ))}
        // </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-md text-center border border-gray-300">
          <div className="text-red-500">
            <BsClipboardX className="text-5xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-4">
            No Products Available
          </h3>
          <p className="text-gray-600 mt-2">
            It seems there are no products to display. Please add new products
            to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
