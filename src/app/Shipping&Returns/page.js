"use client";

import { Truck, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ShippingReturns() {
  return (
    <div className="min-h-screen bg-[var(--secondary)] py-20 px-6 md:px-16">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6">
          Shipping & Returns
        </h1>
        <p className="text-gray-700 mb-10">
          At <span className="font-semibold">Ojain Foods</span>, we strive to ensure that your groceries reach you fresh and on time. Below is our detailed shipping and return policy for a hassle-free shopping experience.
        </p>

        {/* Shipping Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
          <Truck size={40} className="text-[var(--primary)]" />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Shipping Policy</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>All orders are processed within 24 hours of confirmation.</li>
              <li>Delivery is available across major cities in India.</li>
              <li>Standard delivery usually takes 2–5 business days.</li>
              <li>Free delivery on orders above ₹499.</li>
              <li>Tracking information will be sent to your email after dispatch.</li>
            </ul>
          </div>
        </div>

        {/* Returns Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <RefreshCcw size={40} className="text-[var(--primary)]" />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Returns & Refunds</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>We accept returns within 7 days of delivery.</li>
              <li>Products must be unopened, unused, and in original packaging.</li>
              <li>Perishable items like fruits, vegetables, and dairy cannot be returned.</li>
              <li>Refunds are processed within 3–5 business days after receiving the returned product.</li>
              <li>For issues with damaged or missing items, please contact us immediately at <Link href="/contact" className="text-[var(--primary)] underline">Contact Us</Link>.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}