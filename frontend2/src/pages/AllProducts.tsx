import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, ChevronLeft, ChevronDown } from "lucide-react";

interface Product {
  barcode: string;
  id: string;
  name: string;
  price: number;
  stock: number;
}

function AllProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"name" | "stock">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/product/viewAllProducts`,
        {}
      );
      setProducts(response.data.data.products);
    };
    fetchProducts();
  }, []);

  const getStockColor = (stock: number) => {
    if (stock >= 100) return "bg-green-100 text-green-700";
    if (stock >= 50) return "bg-orange-100 text-orange-700";
    return "bg-red-100 text-red-700";
  };

  const handleSort = (field: "name" | "stock") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const term = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(term) ||
        product.barcode.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      const aValue = sortField === "name" ? a.name : a.stock;
      const bValue = sortField === "name" ? b.name : b.stock;

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}

        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center mb-8 gap-4"
        >
          <ChevronLeft />

          <h1 className="text-3xl font-semibold text-gray-900">Products</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Table Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
            <button
              onClick={() => handleSort("name")}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              <span>Name</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  sortField === "name" && sortDirection === "desc"
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>
            <button
              onClick={() => handleSort("stock")}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              <span>Stock</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  sortField === "stock" && sortDirection === "desc"
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>
          </div>

          {/* Product List */}
          <div className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    #{product.barcode}
                  </p>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="text-lg font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStockColor(
                      product.stock
                    )}`}
                  >
                    {product.stock} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search terms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
