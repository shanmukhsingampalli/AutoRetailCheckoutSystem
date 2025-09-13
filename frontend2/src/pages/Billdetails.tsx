import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

function BillDetails() {
  const billContentRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [searchParams] = useSearchParams();
  const billId = searchParams.get("billId");

  useEffect(() => {
    const fetchBillDetails = async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/bill/getBillDetails`,
        {
          billId,
        }
      );
      setItems(response.data.data.bill.items);
    };
    fetchBillDetails();
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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
          <p style={{ color: "#6b7280" }}>Bill ID: {billId}</p>
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
                  {item.quantity + " x " + item.price.toFixed(2)}
                </p>
              </div>
              <div
                className="text-lg font-semibold"
                style={{ color: "#1f2937" }}
              >
                ${item.quantity * item.price}
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
