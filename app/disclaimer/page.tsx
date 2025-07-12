'use client';

import Link from 'next/link';
import ResponsiveImage from '@/components/ResponsiveImage';

export default function Disclaimer() {
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
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-center">Legal Disclaimer</h1>
          <p className="text-[#d4af37] text-center text-lg">Last updated: June 19, 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          
          {/* Section 1: General Disclaimer */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">1</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">General Disclaimer</h2>
            </div>
            <div className="ml-16 text-gray-700 space-y-4">
              <p>
                The information contained on this website is for general information purposes only. The information is provided 
                by Prestige Somerville and while we endeavor to keep the information up to date and correct, we make no 
                representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
                suitability or availability with respect to the website or the information, products, services, or related 
                graphics contained on the website for any purpose.
              </p>
              <p>
                Any reliance you place on such information is therefore strictly at your own risk. In no event will we be 
                liable for any loss or damage including without limitation, indirect or consequential loss or damage, or 
                any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, 
                the use of this website.
              </p>
            </div>
          </section>

          {/* Section 2: Real Estate Specific Disclaimers */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">2</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Real Estate Specific Disclaimers</h2>
            </div>
            <div className="ml-16 text-gray-700 space-y-4">
              <p>
                All information, including but not limited to prices, floor plans, dimensions, illustrations, amenities, 
                materials, features, finishes and utilities, areas, reference to view and directions, and size of the 
                property or individual rooms and units may vary per unit and are subject to change or substitution 
                without notice. 
              </p>
              <p>
                Images, videos, and virtual tours are artist's impressions or for conceptual purposes only. Furniture, 
                decorative elements, accessories, and color schemes are not part of the standard offering and are shown 
                for illustrative purposes only. All plans are not to scale and are subject to architectural modifications 
                without notice. The developer reserves the right to modify, revise, change, or substitute amenities, 
                specifications, materials, and features.
              </p>
            </div>
          </section>

          {/* Section 3: Investment and Financial Disclaimers */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">3</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Investment and Financial Disclaimers</h2>
            </div>
            <div className="ml-16 text-gray-700 space-y-4">
              <p>
                Any information on this website does not constitute financial advice or an offer to buy or sell any 
                product, service, or property. Property prices and availability are subject to change without notice. 
                The depiction of any investments on this site should not be construed as an endorsement or recommendation. 
                Past performance is not necessarily indicative of future results, and there is no guarantee that any 
                investment will achieve results comparable to those shown.
              </p>
              <p>
                Potential buyers and investors should conduct their own due diligence and seek appropriate professional 
                advice before making any financial or investment decisions. The purchase of real estate involves significant 
                financial, legal, and tax implications, and we encourage prospective purchasers to seek independent 
                professional advice before making any decisions.
              </p>
            </div>
          </section>

          {/* Section 4: Construction and Regulatory Disclaimers */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">4</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Construction and Regulatory Disclaimers</h2>
            </div>
            <div className="ml-16 text-gray-700 space-y-4">
              <p>
                All project details mentioned on this website are tentative and subject to approval from relevant 
                authorities. The development is being constructed in phases and the imagery may represent both current 
                and future phases of the development. All plans, dimensions, and specifications are subject to variations, 
                modifications, and substitutions as may be recommended by the architect or engineer and/or required by the 
                relevant planning authorities.
              </p>
              <p>
                The company has obtained all required approvals for the development as of the date of publication. 
                However, we do not guarantee that such approvals will not be withdrawn, revoked, or subject to change. 
                Dates of completion are estimates only and are subject to delays due to construction contingencies and 
                obtaining necessary approvals from authorities.
              </p>
            </div>
          </section>

          {/* Section 5: Advertising Disclaimer */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">5</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Advertising Disclaimer</h2>
            </div>
            <div className="ml-16 text-gray-700 space-y-4">
              <p>
                Our advertising aims to be truthful and non-misleading. We use our best efforts to ensure that all 
                information published in any advertisement, brochure, or other marketing material is accurate at the time 
                of publication and corresponds to the quality and type of property being advertised.
              </p>
              <p>
                However, all descriptions, dimensions, references to condition, necessary permissions for use and occupation, 
                and other details are given in good faith and are believed to be correct, but any intending purchasers should 
                not rely on them as statements or representations of fact but must satisfy themselves by inspection or 
                otherwise as to their correctness.
              </p>
            </div>
          </section>

          {/* Section 6: External Links Disclaimer */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">6</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">External Links Disclaimer</h2>
            </div>
            <div className="ml-16 text-gray-700 space-y-4">
              <p>
                Through this website, you may be able to link to other websites which are not under our control. We have no 
                control over the nature, content, and availability of those sites. The inclusion of any links does not 
                necessarily imply a recommendation or endorsement of the views expressed within them.
              </p>
              <p>
                Every effort is made to keep the website up and running smoothly. However, we take no responsibility for, and 
                will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
              </p>
            </div>
          </section>

          {/* Section 7: Copyright Notice */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">7</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Copyright Notice</h2>
            </div>
            <div className="ml-16 text-gray-700 space-y-4">
              <p>
                This website and its content are copyright of Prestige Somerville - © Prestige Somerville {new Date().getFullYear()}. 
                All rights reserved. Any redistribution or reproduction of part or all of the contents in any form is prohibited 
                other than the following:
              </p>
              <ul className="list-none space-y-3 mt-4">
                {[
                  "You may print or download to a local hard disk extracts for your personal and non-commercial use only",
                  "You may copy the content to individual third parties for their personal use, but only if you acknowledge the website as the source of the material"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-[#d4af37] mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                You may not, except with our express written permission, distribute or commercially exploit the content. 
                Nor may you transmit it or store it in any other website or other form of electronic retrieval system.
              </p>
            </div>
          </section>

          {/* Section 8: Changes to This Disclaimer */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">8</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Changes to This Disclaimer</h2>
            </div>
            <div className="ml-16 text-gray-700">
              <p>
                We may update our disclaimer from time to time. We will notify you of any changes by posting the new 
                disclaimer on this page. You are advised to review this disclaimer periodically for any changes.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-16 bg-[#f8f6f0] rounded-xl p-8 border border-[#0c4c34]/10">
            <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34] mb-6 text-center">Contact Us</h2>
            <div className="max-w-md mx-auto">
              <p className="text-gray-700 text-center mb-6">
                If you have any questions about our disclaimer, please reach out:
              </p>
              <div className="space-y-4">
                <a href="mailto:legal@prestigesomerville.com"
                   className="flex items-center justify-center space-x-3 text-[#0c4c34] hover:text-[#d4af37] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>legal@prestigesomerville.com</span>
                </a>
                <a href="tel:+918260028808"
                   className="flex items-center justify-center space-x-3 text-[#0c4c34] hover:text-[#d4af37] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+91-8260028808</span>
                </a>
                <div className="flex items-center justify-center space-x-3 text-[#0c4c34]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Lake View Drive, Luxury Estate Bengaluru, India</span>
                </div>
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
