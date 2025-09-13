import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Scan from "./Scan";
import axios from "axios";

interface CartItem {
  barcode : string;
  name: string;
  price: number;
  stock: number
}

const UpdateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [cam, setCam] = useState(true);
  const [data, setData] = useState("No result");

  const [item, setItem] = useState<CartItem>();

  useEffect(() => { 
    const fetchProduct = async () => {
      if (data !== "No result") {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/product/getProducts`, {
        barcode: data,
    });
            console.log(response.data.data.product);
            setItem(response.data.data.product);
        } catch (error) {
            console.error("Error fetching product:", error);
        }   
        setCam(false); // ✅ turn scanner off after successful scanog
        setData("No result"); // ✅ reset data for next scan
      }
    };
    fetchProduct();
  }, [data]);

  return <div>
    {cam && <Scan setData={setData} />}
    {!cam && item && (
      <div className="p-4 space-y-6">
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <div className="flex flex-col space-y-4">
                <div className="text-lg font-semibold text-gray-900">{item.name}</div>
                <div className="text-gray-700">Name: {item.name}</div>
                <div className="text-gray-700">Price: ${item.price.toFixed(2)}</div>
                <div className="text-gray-700">Stock: ${item.stock}</div>
            </div>
        </div>
      </div>
    )}
  </div>;
};

export default UpdateProduct;
