import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Scan from "./Scan";
import axios from "axios";

interface CartItem {
  barcode: string;
  name: string;
  price: string; // 👈 keep as string for editing
  stock: string; // 👈 keep as string for editing
}

const UpdateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [cam, setCam] = useState(true);
  const [data, setData] = useState("No result");
  const [item, setItem] = useState<CartItem | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (data !== "No result") {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/product/getProducts`,
            { barcode: data }
          );

          const product = response.data.data.product;

          // ✅ convert numbers to strings for inputs
          setItem({
            ...product,
            price: product.price.toString(),
            stock: product.stock.toString(),
          });
        } catch (error) {
          console.error("Error fetching product:", error);
        }
        setCam(false); // stop scanner
        setData("No result"); // reset data
      }
    };
    fetchProduct();
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof CartItem
  ) => {
    if (!item) return;
    setItem({ ...item, [field]: e.target.value }); // ✅ no Number()
  };

  const handleUpdate = async () => {
    if (!item) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/product/updateProduct`,
        {
          ...item,
          price: Number(item.price), // ✅ convert back
          stock: Number(item.stock),
        }
      );
      alert("✅ Product updated successfully!");
      navigate("/all-products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("❌ Failed to update product.");
    }
  };

  return (
    <div>
      {cam && (
        <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
          <Scan setData={setData} />
        </div>
      )}
      {!cam && item && (
        <div className="p-4 space-y-6 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* Editable Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(e, "name")}
                  className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Editable Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => handleChange(e, "price")}
                  className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Editable Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={item.stock}
                  onChange={(e) => handleChange(e, "stock")}
                  className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Update button */}
              <button
                onClick={handleUpdate}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
