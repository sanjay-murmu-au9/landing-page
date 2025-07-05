import React from 'react';
import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto prose prose-primary">
        <h1 className="text-4xl font-serif font-bold mb-8 text-secondary-dark">Cookie Policy</h1>

        <div className="space-y-6 text-gray-900">
          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Introduction</h2>
            <p>
              This Cookie Policy explains how we use cookies and similar tracking technologies on our website.
              This policy is effective as of July 5, 2025 and was last updated on July 5, 2025.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit our website.
              They allow us to recognize your device and remember certain information about your visit,
              such as your preferences and actions on our site. Cookies are widely used to make websites
              work more efficiently and provide valuable information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Types of Cookies We Use</h2>

            <h3 className="text-xl font-semibold mt-4 text-primary-dark">Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core functionality
              such as security, network management, and account access. You may disable these by changing your
              browser settings, but this may affect how the website functions.
            </p>

            <h3 className="text-xl font-semibold mt-4 text-primary-dark">Analytics Cookies</h3>
            <p>
              We use analytics cookies, such as those provided by Google Analytics, to help us understand how
              visitors interact with our website. They collect information such as the number of visitors to the site,
              where visitors have come from, and which pages they visited. This helps us improve our website and your
              user experience.
            </p>

            <h3 className="text-xl font-semibold mt-4 text-primary-dark">Marketing and Advertising Cookies</h3>
            <p>
              These cookies are used to track visitors across websites. They are set to display targeted advertisements
              based on your interests and online behavior. They also help measure the effectiveness of advertising campaigns.
              These cookies may be set by us or our advertising partners.
            </p>

            <h3 className="text-xl font-semibold mt-4 text-primary-dark">Preference Cookies</h3>
            <p>
              These cookies allow our website to remember choices you have made in the past, like your language preference,
              location, or user credentials. They enhance your experience by personalizing the site based on your selections.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics
              of the website and deliver advertisements on and through the website. These may include:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Google Analytics and Google Ads</li>
              <li>Facebook Pixel</li>
              <li>LinkedIn Insight Tag</li>
              <li>Other social media platforms and advertising networks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Managing Your Cookie Preferences</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences.
              However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
              To find out more about cookies, including how to see what cookies have been set and how to manage
              and delete them, visit <a href="https://www.allaboutcookies.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Cookie Consent</h2>
            <p>
              When you first visit our website, we may ask for your consent to use cookies through a cookie banner.
              By clicking "Accept All Cookies" or continuing to use our site, you agree to the storing of cookies on your device
              to enhance site navigation, analyze site usage, and assist in our marketing efforts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Changes to This Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
              Cookie Policy on this page and updating the effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-secondary-dark">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at:
            </p>
            <div className="mt-2">
              <p><strong>Email:</strong> info@houseofdreamsrealty.com</p>
              <p><strong>Phone:</strong> +91 8260028808</p>
              <p><strong>Address:</strong> Prestige Somerville, Bangalore India</p>
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