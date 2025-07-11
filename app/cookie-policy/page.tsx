'use client';

import Link from 'next/link';

export default function CookiePolicy() {
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
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-center">Cookie Policy</h1>
          <p className="text-[#d4af37] text-center text-lg">Last updated: July 5, 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">

          {/* Section 1: Introduction */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">1</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Introduction</h2>
            </div>
            <div className="ml-16 text-gray-700">
              <p>
                This Cookie Policy explains how we use cookies and similar tracking technologies on our website.
                This policy is effective as of July 5, 2025 and was last updated on July 5, 2025.
              </p>
            </div>
          </section>

          {/* Section 2: What Are Cookies */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">2</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">What Are Cookies</h2>
            </div>
            <div className="ml-16 text-gray-700">
              <p>
                Cookies are small text files that are placed on your device when you visit our website.
                They allow us to recognize your device and remember certain information about your visit,
                such as your preferences and actions on our site. Cookies are widely used to make websites
                work more efficiently and provide valuable information to website owners.
              </p>
            </div>
          </section>

          {/* Section 3: Types of Cookies We Use */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">3</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Types of Cookies We Use</h2>
            </div>
            <div className="ml-16 text-gray-700">
              <div className="space-y-6">
                <div className="bg-[#f8f6f0] p-4 rounded-lg border border-[#0c4c34]/10">
                  <h3 className="text-[#0c4c34] font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-gray-600">
                    These cookies are necessary for the website to function properly. They enable core functionality
                    such as security, network management, and account access. You may disable these by changing your
                    browser settings, but this may affect how the website functions.
                  </p>
                </div>

                <div className="bg-[#f8f6f0] p-4 rounded-lg border border-[#0c4c34]/10">
                  <h3 className="text-[#0c4c34] font-semibold mb-2">Analytics Cookies</h3>
                  <p className="text-gray-600">
                    We use analytics cookies, such as those provided by Google Analytics, to help us understand how
                    visitors interact with our website. They collect information such as the number of visitors to the site,
                    where visitors have come from, and which pages they visited. This helps us improve our website and your
                    user experience.
                  </p>
                </div>

                <div className="bg-[#f8f6f0] p-4 rounded-lg border border-[#0c4c34]/10">
                  <h3 className="text-[#0c4c34] font-semibold mb-2">Marketing and Advertising Cookies</h3>
                  <p className="text-gray-600">
                    These cookies are used to track visitors across websites. They are set to display targeted advertisements
                    based on your interests and online behavior. They also help measure the effectiveness of advertising campaigns.
                    These cookies may be set by us or our advertising partners.
                  </p>
                </div>

                <div className="bg-[#f8f6f0] p-4 rounded-lg border border-[#0c4c34]/10">
                  <h3 className="text-[#0c4c34] font-semibold mb-2">Preference Cookies</h3>
                  <p className="text-gray-600">
                    These cookies allow our website to remember choices you have made in the past, like your language preference,
                    location, or user credentials. They enhance your experience by personalizing the site based on your selections.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Third-Party Cookies */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">4</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Third-Party Cookies</h2>
            </div>
            <div className="ml-16 text-gray-700">
              <p className="mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics
                of the website and deliver advertisements on and through the website. These may include:
              </p>
              <ul className="list-none space-y-3">
                {[
                  "Google Analytics and Google Ads",
                  "Facebook Pixel",
                  "LinkedIn Insight Tag",
                  "Other social media platforms and advertising networks"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-[#d4af37] mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 5: Managing Your Cookie Preferences */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">5</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Managing Your Cookie Preferences</h2>
            </div>
            <div className="ml-16 text-gray-700">
              <p>
                Most web browsers allow you to control cookies through their settings preferences.
                However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
                To find out more about cookies, including how to see what cookies have been set and how to manage
                and delete them, visit <a href="https://www.allaboutcookies.org" className="text-[#0c4c34] hover:text-[#d4af37] font-medium" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
              </p>
            </div>
          </section>

          {/* Section 6: Cookie Consent */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">6</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Cookie Consent</h2>
            </div>
            <div className="ml-16 text-gray-700">
              <p>
                When you first visit our website, we may ask for your consent to use cookies through a cookie banner.
                By clicking "Accept All Cookies" or continuing to use our site, you agree to the storing of cookies on your device
                to enhance site navigation, analyze site usage, and assist in our marketing efforts.
              </p>
            </div>
          </section>

          {/* Section 7: Changes to This Cookie Policy */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0c4c34] text-white flex items-center justify-center text-xl font-semibold mr-4">7</div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34]">Changes to This Cookie Policy</h2>
            </div>
            <div className="ml-16 text-gray-700">
              <p>
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
                Cookie Policy on this page and updating the effective date.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-16 bg-[#f8f6f0] rounded-xl p-8 border border-[#0c4c34]/10">
            <h2 className="text-2xl md:text-3xl font-serif text-[#0c4c34] mb-6 text-center">Contact Us</h2>
            <div className="max-w-md mx-auto">
              <p className="text-gray-700 text-center mb-6">
                If you have any questions about our cookie policy, please reach out:
              </p>
              <div className="space-y-4">
                <a href="mailto:info@houseofdreamsrealty"
                   className="flex items-center justify-center space-x-3 text-[#0c4c34] hover:text-[#d4af37] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>info@houseofdreamsrealty</span>
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
                  <span>123 Lake View Drive, Luxury Estate, India</span>
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