import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, Search, FileText, ChevronRight } from "lucide-react";

interface BillDetails {
  billId: string;
  totalAmount: number;
  date: Date;
}

function Bill() {
  const [searchTerm, setSearchTerm] = useState("");

  const [bills, setBills] = useState<BillDetails[]>([]);

  useEffect(() => {
    const fetchBills = async () => {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/bill/viewAllBills`,{},{
        headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(response.data.data.bills);
      setBills(response.data.data.bills);
    }

    fetchBills();
  },[])

  // Filter bills by ID
  const filteredBills = bills.filter((bill) =>
    bill.billId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center">
          <button className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-semibold text-black ml-4">Bills</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search bills by ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-full border border-gray-200 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Bills List */}
      <div className="px-4 space-y-4">
        {filteredBills.length > 0 ? (
          filteredBills.map((bill) => (
            <div
              key={bill.billId}
              onClick={() => {
                
              }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>

                  {/* Bill Info */}
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      ${bill.totalAmount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">ID: {bill.billId}</div>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12">
            No bills found for this ID
          </div>
        )}
      </div>
    </div>
  );
}

export default Bill;
