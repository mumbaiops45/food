"use client";

import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[var(--secondary)] py-20 px-6 md:px-16">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6 flex items-center gap-3">
          <Shield size={32} /> Privacy Policy
        </h1>

        <p className="text-gray-700 mb-6">
          At <span className="font-semibold">Ojain Foods</span>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.
        </p>

        {/* Sections */}
        <div className="space-y-8">

          {/* Information Collection */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Personal information you provide during account registration, orders, or inquiries.</li>
              <li>Payment information required to process transactions (handled securely).</li>
              <li>Cookies and usage data to improve website experience.</li>
            </ul>
          </div>

          {/* Use of Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To process orders, payments, and deliver your groceries.</li>
              <li>To provide customer support and communicate important updates.</li>
              <li>To improve website functionality and user experience.</li>
              <li>To send marketing communications, if you have opted-in.</li>
            </ul>
          </div>

          {/* Data Protection */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
            <p className="text-gray-700">
              We implement industry-standard security measures to protect your data. Sensitive information, such as payment details, is handled securely and never stored on our servers in plain text.
            </p>
          </div>

          {/* Third-party sharing */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
            <p className="text-gray-700">
              We may use trusted third-party services to process payments, send emails, or analyze website traffic. These services are bound by strict privacy agreements and only access information necessary to perform their tasks.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy or your data, please <a href="/contact" className="text-[var(--primary)] underline">contact us</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}