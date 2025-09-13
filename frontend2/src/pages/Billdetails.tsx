import React, { useRef } from "react";
import { Download, QrCode } from "lucide-react";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

function BillDetails() {
  const billContentRef = useRef<HTMLDivElement>(null);

  const items: Item[] = [
    {
      id: 1,
      name: "Organic Avocados",
      description: "2 units x $1.99",
      price: 3.98,
    },
    {
      id: 2,
      name: "Whole Wheat Bread",
      description: "1 unit x $3.49",
      price: 3.49,
    },
    {
      id: 3,
      name: "Free-Range Eggs",
      description: "1 dozen x $4.99",
      price: 4.99,
    },
    {
      id: 4,
      name: "Kombucha",
      description: "1 bottle x $3.29",
      price: 3.29,
    },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#e5e7eb" }}>
      {/* Receipt Section (Only this will go to PDF) */}
      <div
        ref={billContentRef}
        className="max-w-md mx-auto rounded-3xl shadow-lg p-6"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Receipt Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#1f2937" }}>
            Your Receipt
          </h2>
          <p style={{ color: "#6b7280" }}>Bill ID: #B123-XYZ-789</p>
        </div>

        {/* Items List */}
        <div className="space-y-6 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold" style={{ color: "#1f2937" }}>
                  {item.name}
                </h3>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  {item.description}
                </p>
              </div>
              <div
                className="text-lg font-semibold"
                style={{ color: "#1f2937" }}
              >
                ${item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="pt-6" style={{ borderTop: "1px solid #e5e7eb" }}>
          <div className="flex justify-between mb-2">
            <span style={{ color: "#6b7280" }}>Subtotal</span>
            <span className="font-semibold" style={{ color: "#1f2937" }}>
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span style={{ color: "#6b7280" }}>Tax (8%)</span>
            <span className="font-semibold" style={{ color: "#1f2937" }}>
              ${tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span style={{ color: "#1f2937" }}>Total</span>
            <span style={{ color: "#1f2937" }}>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillDetails;
