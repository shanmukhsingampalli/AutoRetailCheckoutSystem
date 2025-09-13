import React, { useRef , useEffect, useState} from "react";
import { Download, QrCode } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useCart } from '../context/CartContext';
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ Import navigate

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

function Bill() {
  const billContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // ✅ hook for navigation
  const { clearCart } = useCart();

const [items, setItems] = useState<Item[]>([]);
  const [searchParams] = useSearchParams();
  const billId = searchParams.get('id');

  useEffect(() => {
    const fetchBillDetails = async () => {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/bill/getBillDetails`, {
        billId : billId
      })
      setItems(response.data.data.bill.items);
    }
    fetchBillDetails();
    clearCart();
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.price*item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;



  // Function to generate PDF only up to total
  const handleDownloadPDF = async () => {
    if (!billContentRef.current) return;

    const canvas = await html2canvas(billContentRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("receipt.pdf");
  };
  const handleHome = () => {
    navigate("/", { replace: true }); // ✅ Navigate to home
  };

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
                  {item.quantity} x ${item.price.toFixed(2)} each
                </p>
              </div>
              <div
                className="text-lg font-semibold"
                style={{ color: "#1f2937" }}
              >
                ${item.price*item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="pt-6" style={{ borderTop: "1px solid #e5e7eb" }}>
          <div className="flex justify-between mb-2">
            <span style={{ color: "#6b7280" }}>Date & Time</span>
            <span className="font-semibold" style={{ color: "#1f2937" }}>
                {new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
                })}
            </span>
          </div>
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

      {/* QR + Buttons (Not included in PDF) */}
      <div className="max-w-md mx-auto mt-6 space-y-3 text-center">
        {/* <div
          className="inline-block p-6 rounded-2xl shadow-lg mb-4"
          style={{ backgroundColor: "#0d9488" }}
        >
          <div
            className="w-24 h-24 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#ffffff" }}
          >
            <QrCode className="w-16 h-16" style={{ color: "#1f2937" }} />
          </div>
        </div>
        <p className="text-sm" style={{ color: "#6b7280" }}>
          Show at security
        </p> */}

        <button
          onClick={handleDownloadPDF}
          className="w-full py-4 px-6 rounded-2xl font-semibold flex items-center justify-center space-x-2 transition-colors"
          style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
        >
          <Download className="w-5 h-5" />
          <span>Download as PDF</span>
        </button>
        <button
          className="w-full py-4 px-6 rounded-2xl font-semibold flex items-center justify-center space-x-2 transition-colors"
          onClick={handleHome}
          style={{ backgroundColor: "#000000", color: "#ffffff" }}
        >
          <span>Go to Home</span>
        </button>
      </div>
    </div>
  );
}

export default Bill;
