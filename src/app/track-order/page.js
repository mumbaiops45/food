"use client";

import { useState } from "react";
import { Truck } from "lucide-react";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState("");

  // Mock data for demonstration
  const mockOrders = {
    "OJ12345": "Processing",
    "OJ12346": "Shipped",
    "OJ12347": "Out for Delivery",
    "OJ12348": "Delivered",
  };

  const handleTrack = (e) => {
    e.preventDefault();
    setError("");
    setOrderStatus(null);

    if (!orderId) {
      setError("Please enter your Order ID");
      return;
    }

    // In real app, call your backend API here
    const status = mockOrders[orderId.toUpperCase()];
    if (status) {
      setOrderStatus(status);
    } else {
      setError("Order not found. Please check your Order ID.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--secondary)] py-20 px-6 md:px-16">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6 flex items-center gap-3">
          <Truck size={32} /> Track Your Order
        </h1>
        <p className="text-gray-700 mb-6">
          Enter your Order ID below to see the current status of your order.
        </p>

        {/* Form */}
        <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Order ID (e.g., OJ12345)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary)]/90 transition"
          >
            Track
          </button>
        </form>

        {/* Error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Order Status */}
        {orderStatus && (
          <div className="bg-[var(--primary)]/10 text-[var(--primary)] p-6 rounded-xl font-semibold">
            <p>Your order <span className="font-bold">{orderId.toUpperCase()}</span> is currently:</p>
            <p className="text-lg mt-2">{orderStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
}