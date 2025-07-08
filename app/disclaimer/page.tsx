import React from 'react';
import Link from 'next/link';

export default function Disclaimer() {
  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto prose prose-primary">
        <h1 className="text-4xl font-serif font-bold mb-8 text-secondary-dark">Legal Disclaimer</h1>

        <div className="space-y-6 text-gray-900">
          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">General Disclaimer</h2>
            <p>
              The information contained on this website is for general information purposes only. The information is provided
              by Lakeside Luxury and while we endeavor to keep the information up to date and correct, we make no
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
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Real Estate Specific Disclaimers</h2>
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
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Investment and Financial Disclaimers</h2>
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
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Construction and Regulatory Disclaimers</h2>
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
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Advertising Disclaimer</h2>
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
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">External Links Disclaimer</h2>
            <p>
              Through this website, you may be able to link to other websites which are not under our control. We have no
              control over the nature, content, and availability of those sites. The inclusion of any links does not
              necessarily imply a recommendation or endorsement of the views expressed within them.
            </p>
            <p>
              Every effort is made to keep the website up and running smoothly. However, we take no responsibility for, and
              will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Copyright Notice</h2>
            <p>
              This website and its content are copyright of Lakeside Luxury - © Lakeside Luxury {new Date().getFullYear()}.
              All rights reserved. Any redistribution or reproduction of part or all of the contents in any form is prohibited
              other than the following:
            </p>
            <ul className="list-disc ml-6">
              <li>You may print or download to a local hard disk extracts for your personal and non-commercial use only</li>
              <li>You may copy the content to individual third parties for their personal use, but only if you acknowledge the website as the source of the material</li>
            </ul>
            <p>
              You may not, except with our express written permission, distribute or commercially exploit the content.
              Nor may you transmit it or store it in any other website or other form of electronic retrieval system.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Changes to This Disclaimer</h2>
            <p>
              We may update our disclaimer from time to time. We will notify you of any changes by posting the new
              disclaimer on this page. You are advised to review this disclaimer periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Contact Us</h2>
            <p>
              If you have any questions about this disclaimer, please contact us at:
            </p>
            <div className="mt-2">
              <p><strong>Email:</strong> info@houseofdreamsrealty.com</p>
              <p><strong>Phone:</strong> +91 8260028808</p>
              <p><strong>Address:</strong> Prestige Somerville, Bangalore, India</p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0c4c34] text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="/" className="text-white hover:text-primary-light">Home</Link>
            <Link href="/privacy-policy" className="text-white hover:text-primary-light">Privacy Policy</Link>
            <Link href="/cookie-policy" className="text-white hover:text-primary-light">Cookie Policy</Link>
            <Link href="/disclaimer" className="text-white hover:text-primary-light">Disclaimer</Link>
            <Link href="/term-condition" className="text-white hover:text-primary-light">Terms & Conditions</Link>
          </div>
          <p className="text-sm">
            © 2025 Prestige Somerville. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}