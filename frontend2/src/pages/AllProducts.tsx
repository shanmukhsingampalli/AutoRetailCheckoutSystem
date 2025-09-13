import React, { useState } from "react";
import { Search, ChevronLeft, ChevronDown } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
}

function AllProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"name" | "stock">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: "1",
      name: "Organic Apples",
      price: 2.5,
      sku: "123456789012",
      stock: 150,
    },
    {
      id: "2",
      name: "Whole Wheat Bread",
      price: 3.0,
      sku: "987654321098",
      stock: 75,
    },
    {
      id: "3",
      name: "Free-Range Eggs",
      price: 4.5,
      sku: "112233445566",
      stock: 50,
    },
    {
      id: "4",
      name: "Almond Milk",
      price: 3.75,
      sku: "665544332211",
      stock: 100,
    },
    {
      id: "5",
      name: "Cheddar Cheese",
      price: 5.0,
      sku: "121212121212",
      stock: 60,
    },
    {
      id: "6",
      name: "Organic Tofu",
      price: 2.75,
      sku: "343434343434",
      stock: 10,
    },
  ];

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
        product.sku.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      const aValue = sortField === "name" ? a.name : a.stock;
      const bValue = sortField === "name" ? b.name : b.stock;
      if (sortDirection === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });

  // Responsive modal for product details
  const ProductModal = ({
    product,
    onClose,
  }: {
    product: Product;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-xs w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
        <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
        <p className="text-base font-medium mb-2">
          Price: ${product.price.toFixed(2)}
        </p>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStockColor(
            product.stock
          )}`}
        >
          {product.stock} in stock
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-4 sm:mb-8 gap-2 sm:gap-4">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <h1 className="text-xl sm:text-3xl font-semibold text-gray-900">
            Products
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg 
                       text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent transition-all duration-200 
                       text-sm sm:text-base"
          />
        </div>

        {/* Table Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 border-b border-gray-200">
            <button
              onClick={() => handleSort("name")}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base"
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
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base"
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
              <button
                key={product.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
                           px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-100 transition-colors duration-200 w-full text-left focus:outline-none"
                onClick={() => setSelectedProduct(product)}
                aria-label={`View details for ${product.name}`}
              >
                {/* Left section (Name + SKU) */}
                <div className="flex-1 mb-2 sm:mb-0">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    #{product.sku}
                  </p>
                </div>

                {/* Right section (Price + Stock) */}
                <div className="flex items-center gap-3 flex-nowrap">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-6">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>

                    <span
                      className={`inline-flex items-center justify-center w-auto max-w-max px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-none ${getStockColor(
                        product.stock
                      )}`}
                    >
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 text-base sm:text-lg">
                No products found
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search terms
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Modal for product details */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default AllProducts;
