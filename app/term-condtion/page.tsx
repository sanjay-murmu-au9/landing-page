'use client';

import Link from 'next/link';

export default function TermsAndConditions() {
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

      {/* Header Section */}
      <div className="bg-[#0c4c34] text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-center">Terms &amp; Conditions</h1>
          <p className="text-[#d4af37] text-center text-lg">Last updated: June 21, 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Acceptance of Terms */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">1</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Acceptance of Terms</h2>
            </div>
            <div className="ml-16">
              <p className="text-gray-700">
                By accessing or using this website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use this website.
              </p>
            </div>
          </section>

          {/* Use of Website */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">2</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Use of Website</h2>
            </div>
            <div className="ml-16">
              <ul className="list-none space-y-3">
                {[
                  "You must be at least 18 years old to use this website.",
                  "You agree to use this website only for lawful purposes.",
                  "You will not use this website to transmit any harmful, offensive, or unlawful content.",
                  "You will not attempt to gain unauthorized access to any part of the website or its systems."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="text-[#d4af37] mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">3</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Intellectual Property</h2>
            </div>
            <div className="ml-16">
              <p className="text-gray-700">
                All content on this website, including text, images, graphics, logos, and design, is the property of Prestige Somerville or its licensors and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission.
              </p>
            </div>
          </section>

          {/* Property Information Disclaimer */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">4</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Property Information Disclaimer</h2>
            </div>
            <div className="ml-16">
              <p className="text-gray-700">
                All property details, prices, offers, and availability are subject to change without notice. While we strive for accuracy, we do not guarantee that all information is current or error-free. Please verify all details with our sales team before making any decisions.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">5</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Third-Party Links</h2>
            </div>
            <div className="ml-16">
              <p className="text-gray-700">
                This website may contain links to third-party websites. We are not responsible for the content, privacy practices, or accuracy of information on those sites. Accessing third-party sites is at your own risk.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">6</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Limitation of Liability</h2>
            </div>
            <div className="ml-16">
              <p className="text-gray-700">
                Prestige Somerville and its affiliates are not liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on any information provided herein.
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">7</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Indemnification</h2>
            </div>
            <div className="ml-16">
              <p className="text-gray-700">
                You agree to indemnify and hold harmless Prestige Somerville, its affiliates, and partners from any claims, damages, or expenses arising from your use of this website or violation of these Terms.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">8</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Changes to Terms</h2>
            </div>
            <div className="ml-16">
              <p className="text-gray-700">
                We reserve the right to update or modify these Terms and Conditions at any time. Changes will be posted on this page with the updated date. Continued use of the website constitutes acceptance of the revised terms.
              </p>
            </div>
          </section>

          {/* Advertising and Compliance */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">9</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Advertising and Compliance</h2>
            </div>
            <div className="ml-16">
              <ul className="list-none space-y-3">
                {[
                  "We comply with all applicable advertising policies and regulations.",
                  "No misleading, false, or deceptive claims are made on this website.",
                  "All offers and promotions are subject to terms and eligibility.",
                  "We do not allow or promote illegal, adult, or restricted content.",
                  "If you have concerns about any content or ad, please contact us immediately."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="text-[#d4af37] mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-16 bg-[#f8f6f0] rounded-xl p-8 border border-[#0c4c34]/10">
            <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34] mb-6 text-center">Contact Us</h2>
            <div className="max-w-md mx-auto">
              <p className="text-gray-700 text-center mb-6">
                For questions about these Terms and Conditions, please contact us:
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
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mb-6">
            <Link href="/" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1 min-w-[80px]">Home</Link>
            <Link href="/blog" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1 min-w-[80px]">Blog</Link>
            <Link href="/privacy-policy" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1">Privacy Policy</Link>
            <Link href="/cookie-policy" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1">Cookie Policy</Link>
            <Link href="/disclaimer" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1 min-w-[80px]">Disclaimer</Link>
            <Link href="/term-condtion" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1">Terms & Conditions</Link>
          </div>
          <p className="text-sm">
            © 2025 Prestige Somerville. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}