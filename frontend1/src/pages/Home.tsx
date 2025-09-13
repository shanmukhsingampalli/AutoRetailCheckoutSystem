import React, { useEffect, useState } from "react";
import { ArrowLeft, QrCode, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Scan from "./Scan";
import { useCart } from '../context/CartContext';

// Inside your component


interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  unitPrice?: number;
}

const ShoppingCart: React.FC = () => {
  const { cartItems, addItem, incrementQuantity, decrementQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [cam, setCam] = useState(false);
  const [data, setData] = useState("No result");

  useEffect(() => {
    if (data !== "No result") {
      setCam(false); // ✅ turn scanner off after successful scanog
      addItem(data); // ✅ add scanned item to cart
      setData("No result"); // ✅ reset data for next scan
    }
  }, [data]);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handelPayment = () => {
   if(cartItems && cartItems.length != 0) navigate("/payment", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {/* Header */}
        <div className="flex items-center px-4 py-6 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 flex-1 text-center mr-12">
            Scan & Go
          </h1>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Scan Product Section */}
          <div
            onClick={() => setCam(true)}
            className="bg-gray-50 rounded-2xl p-4 border border-gray-200 cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-200 rounded-lg">
                <QrCode className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-gray-600 font-medium">Scan Product</span>
            </div>
          </div>

          {cam && <Scan setData={setData} />}

          {/* Items in Cart */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Items in Cart
            </h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                >
                  {/* Left: Item Name + Unit Price */}
                  <div className="flex flex-col w-1/3">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    {item.unitPrice && (
                      <p className="text-sm text-gray-500">
                        ${item.unitPrice.toFixed(2)} per unit
                      </p>
                    )}
                  </div>

                  {/* Middle: Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-gray-800 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Right: Price + Delete */}
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto p-4 bg-white border-t border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium text-gray-700">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center space-x-2 transition-colors shadow-sm"
            onClick={handelPayment}
          >
            <span>Checkout</span>
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
