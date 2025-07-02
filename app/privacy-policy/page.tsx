'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f6f0]">
      {/* Navigation Bar */}
      <nav className="bg-[#0c4c34] text-white py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-[#d4af37] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Return to Prestige Somerville</span>
          </Link>
        </div>
      </nav>

      {/* Header Section with Premium Styling */}
      <div className="bg-[#0c4c34] text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-center">Privacy Policy</h1>
          <p className="text-[#d4af37] text-center text-lg">Last updated: June 19, 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Section 1: Information Collection */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">1</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Information We Collect</h2>
            </div>
            <div className="ml-16">
              <p className="text-gray-700 mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-none space-y-3">
                {/*
                  "Name, email address, and phone number",
                  "Messages and inquiries you send to us",
                  "Property preferences and requirements",
                  "Communication preferences"
                */}
                {["Name, email address, and phone number", "Messages and inquiries you send to us", "Property preferences and requirements", "Communication preferences"].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-[#d4af37] mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 2: Information Usage */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">2</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">How We Use Your Information</h2>
            </div>
            <div className="ml-16">
              <p className="text-gray-700 mb-4">Your information helps us provide and improve our services:</p>
              <ul className="list-none space-y-3">
                {/*
                  "Respond to your property inquiries promptly",
                  "Send relevant property updates and recommendations",
                  "Improve our website and services",
                  "Process your requests and transactions",
                  "Maintain the security of our services"
                */}
                {["Respond to your property inquiries promptly", "Send relevant property updates and recommendations", "Improve our website and services", "Process your requests and transactions", "Maintain the security of our services"].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-[#d4af37] mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 3: Information Sharing */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">3</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Information Sharing</h2>
            </div>
            <div className="ml-16">
              <p className="text-gray-700 mb-4">We may share your information with trusted partners:</p>
              <div className="grid md:grid-cols-2 gap-6">
                {/*
                  {
                    title: "Property Developers",
                    desc: "To facilitate property viewings and purchases"
                  },
                  {
                    title: "Financial Partners",
                    desc: "For processing loans and payments (with consent)"
                  },
                  {
                    title: "Service Providers",
                    desc: "Who assist in our operations"
                  },
                  {
                    title: "Legal Authorities",
                    desc: "When required by law or regulations"
                  }
                */}
                {[
                  {
                    title: "Property Developers",
                    desc: "To facilitate property viewings and purchases"
                  },
                  {
                    title: "Financial Partners",
                    desc: "For processing loans and payments (with consent)"
                  },
                  {
                    title: "Service Providers",
                    desc: "Who assist in our operations"
                  },
                  {
                    title: "Legal Authorities",
                    desc: "When required by law or regulations"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-[#f8f6f0] p-4 rounded-lg border border-[#0c4c34]/10">
                    <h3 className="text-[#0c4c34] font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-16 bg-[#f8f6f0] rounded-xl p-8 border border-[#0c4c34]/10">
            <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34] mb-6 text-center">Contact Us</h2>
            <div className="max-w-md mx-auto">
              <p className="text-gray-700 text-center mb-6">
                If you have any questions about our privacy practices, please reach out:
              </p>
              <div className="space-y-4">
                <a href="mailto:info@houseofdreamsrealty.com"
                   className="flex items-center justify-center space-x-3 text-[#0c4c34] hover:text-[#d4af37] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>info@houseofdreamsrealty.com</span>
                </a>
                <a href="tel:+918260028808"
                   className="flex items-center justify-center space-x-3 text-[#0c4c34] hover:text-[#d4af37] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+91-8260028808</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0c4c34] text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Prestige Somerville. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
