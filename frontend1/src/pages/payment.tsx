import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft, CreditCard, Smartphone, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';


function Payment() {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit-card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const { cartItems } = useCart();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBill = async() => {
    if (selectedPaymentMethod === "credit-card") {
      // ✅ Validate card details
      if (
        !formData.cardNumber ||
        !formData.expiryDate ||
        !formData.cvv ||
        !formData.cardholderName
      ) {
        alert("⚠️ Please fill in all card details before proceeding.");
        return;
      }
    }

    let totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
    totalAmount += totalAmount * 0.08; // Adding 8% tax
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/bill/createBill`, {
      items: cartItems,
      totalAmount: totalAmount,
    })
    // ✅ If validation passes or for other methods
    navigate(`/bill?id=${response.data.data.bill._id}`, { replace: true });
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto">
      {/* Header */}
      <div 
      onClick={() => navigate("/")}
      className="bg-white px-6 py-4 flex items-center">
        <ArrowLeft className="w-6 h-6 text-gray-800" />
        <h1 className="text-xl font-semibold text-gray-800 text-center flex-1">
          Payment
        </h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Payment Methods
        </h2>

        <div className="space-y-4">
          {/* Credit Card Option */}
          <div
            className={`bg-white rounded-2xl p-6 border-2 ${
              selectedPaymentMethod === "credit-card"
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setSelectedPaymentMethod("credit-card")}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-lg font-medium text-gray-800">
                  Credit Card
                </span>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPaymentMethod === "credit-card"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPaymentMethod === "credit-card" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>

            {/* Credit Card Form */}
            {selectedPaymentMethod === "credit-card" && (
              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    handleInputChange("cardNumber", e.target.value)
                  }
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleInputChange("expiryDate", e.target.value)
                    }
                    className="px-4 py-4 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    className="px-4 py-4 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={formData.cardholderName}
                  onChange={(e) =>
                    handleInputChange("cardholderName", e.target.value)
                  }
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* UPI Option */}
          <div
            className={`bg-white rounded-2xl p-6 border-2 ${
              selectedPaymentMethod === "upi"
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setSelectedPaymentMethod("upi")}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-lg font-medium text-gray-800">UPI</span>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPaymentMethod === "upi"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPaymentMethod === "upi" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </div>

          {/* Cash on Delivery Option */}
          <div
            className={`bg-white rounded-2xl p-6 border-2 ${
              selectedPaymentMethod === "cod"
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setSelectedPaymentMethod("cod")}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <Truck className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-lg font-medium text-gray-800">Cash</span>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPaymentMethod === "cod"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPaymentMethod === "cod" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pay Now Button */}
        <div className="mt-8 px-2">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-4 rounded-2xl transition-colors duration-200"
            onClick={handleBill}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
