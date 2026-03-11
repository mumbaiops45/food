"use client";

import { FileText } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-[var(--secondary)] py-20 px-6 md:px-16">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6 flex items-center gap-3">
          <FileText size={32} /> Terms & Conditions
        </h1>

        <p className="text-gray-700 mb-6">
          Welcome to <span className="font-semibold">Ojain Foods</span>. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        {/* Sections */}
        <div className="space-y-8">

          {/* Use of Website */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Use of Website</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>All content on this website is for general information and shopping purposes.</li>
              <li>You must be at least 18 years old to make purchases.</li>
              <li>Unauthorized use of the website may give rise to a claim for damages or be a criminal offense.</li>
            </ul>
          </div>

          {/* Product Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Product Information</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>We make every effort to display accurate product information including pricing, images, and descriptions.</li>
              <li>Prices and availability are subject to change without notice.</li>
              <li>Perishable items like fruits and vegetables may vary in size and appearance.</li>
            </ul>
          </div>

          {/* Orders & Payments */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Orders & Payments</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>All orders are subject to acceptance and availability.</li>
              <li>Payment must be completed via the available payment methods before order processing.</li>
              <li>We are not responsible for payment failures due to third-party payment gateway issues.</li>
            </ul>
          </div>

          {/* Shipping & Returns */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Shipping & Returns</h2>
            <p className="text-gray-700">
              Please refer to our <a href="/shipping-returns" className="text-[var(--primary)] underline">Shipping & Returns</a> page for detailed policies on delivery, refunds, and product returns.
            </p>
          </div>

          {/* Liability */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
            <p className="text-gray-700">
              Ojain Foods is not liable for any damages arising from the use or inability to use this website. We are not responsible for indirect, incidental, or consequential losses.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions regarding these terms, please <a href="/contact" className="text-[var(--primary)] underline">contact us</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}