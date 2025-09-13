import React from "react";
import { LogOut, ShoppingCart, FolderOpen, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl font-semibold text-gray-900">
            Inventory Manager
          </h1>
          <LogOut color="#eb0000" />
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {/* Add or Update Product Card */}
          <div 
          onClick={()=>{
            // navigate("/")
          }}
          className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Add or Update Product
            </h2>
            <p className="text-gray-500">
              Add a new product or update an existing one.
            </p>
          </div>

          {/* View All Products Card */}
          <div 
          onClick={()=>{
            navigate("/all-products")
          }}
          className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              View All Products
            </h2>
            <p className="text-gray-500">Browse your entire product catalog.</p>
          </div>

          {/* View All Bills Card */}
          <div 
          onClick={()=>{
            navigate("/bills")
          }}
          className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Receipt className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              View All Bills
            </h2>
            <p className="text-gray-500">Review past and current invoices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
