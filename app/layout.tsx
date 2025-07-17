import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./mobile-hero-fix.css"; // Import mobile-specific fixes
import CookieConsentContainer from "./providers/CookieConsentContainer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "House of Dreams Realty | Luxury Lakefront Apartments in Bangalore",
  description: "House of Dreams Realty offers premium lakefront luxury apartments in Bangalore with zero EMIs till March 2027. Explore floor plans, amenities, and pricing details.",
  keywords: "House of Dreams Realty, luxury apartments Bangalore, lakefront property, premium real estate, Bangalore real estate, luxury homes, waterfront property, prestige apartments, lake view homes",
  metadataBase: new URL('https://houseofdreamsrealty.com/'),
  alternates: {
    canonical: 'https://houseofdreamsrealty.com',
  },
  authors: [{ name: 'House of Dreams Realty' }],
  category: 'Real Estate',
  creator: 'House of Dreams Realty',
  publisher: 'House of Dreams Realty',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "House of Dreams Realty | Luxury Lakefront Apartments",
    description: "Experience unparalleled luxury living with breathtaking lake views at House of Dreams Realty, Bangalore's most exclusive residential address.",
    images: [
      {
        url: '/images/hero-luxury-exterior-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Lakefront Apartments',
      },
      {
        url: '/images/hero-pool-view.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium Pool and Amenities',
      },
    ],
    url: 'https://houseofdreamsrealty.com/',
    siteName: 'House of Dreams Realty',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House of Dreams Realty | Luxury Lakefront Apartments',
    description: 'Experience unparalleled luxury living with breathtaking lake views at House of Dreams Realty, Bangalore\'s most exclusive residential address.',
    images: ['/images/hero-luxury-exterior-1.jpg'],
    creator: '@houseofdreamsrealty',
  },
  verification: {
    google: 'add-your-google-site-verification-here', // Replace with actual verification code when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Custom meta tags that need to be in head */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="13.0108;77.6550" />
        <meta name="ICBM" content="13.0108, 77.6550" />
        
        {/* JSON-LD structured data for real estate property */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "House of Dreams Realty",
              "image": "https://houseofdreamsrealty.com/images/hero-luxury-exterior-1.jpg",
              "logo": "https://houseofdreamsrealty.com/images/bhartiya-city.png",
              "@id": "https://houseofdreamsrealty.com/#organization",
              "url": "https://houseofdreamsrealty.com/",
              "telephone": "+918260028808",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bhartiya City",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560064",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "13.0108",
                "longitude": "77.6550"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Saturday", "Sunday"],
                  "opens": "10:00",
                  "closes": "16:00"
                }
              ],
              "priceRange": "₹₹₹₹",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61577984246859",
                "https://twitter.com/houseofdreamsrealty",
                "https://www.instagram.com/houseofdreamsrealty/",
                "https://www.linkedin.com/company/houseofdreamsrealty/",
                "https://www.youtube.com/channel/houseofdreamsrealty"
              ]
            })
          }}
        />
        
        {/* JSON-LD structured data for real estate listing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Residence",
              "name": "Luxury Lakefront Apartments",
              "description": "Premium lakefront luxury apartments with breathtaking views and world-class amenities.",
              "url": "https://houseofdreamsrealty.com/",
              "image": "https://houseofdreamsrealty.com/images/hero-luxury-exterior-1.jpg",
              "numberOfRooms": "3-4",
              "floorSize": {
                "@type": "QuantitativeValue",
                "value": 2500,
                "unitCode": "SQF"
              },
              "amenityFeature": [
                { "@type": "LocationFeatureSpecification", "name": "Lake View" },
                { "@type": "LocationFeatureSpecification", "name": "Swimming Pool" },
                { "@type": "LocationFeatureSpecification", "name": "Fitness Center" },
                { "@type": "LocationFeatureSpecification", "name": "Spa" },
                { "@type": "LocationFeatureSpecification", "name": "24/7 Security" },
                { "@type": "LocationFeatureSpecification", "name": "Clubhouse" },
                { "@type": "LocationFeatureSpecification", "name": "Landscaped Gardens" },
                { "@type": "LocationFeatureSpecification", "name": "Children's Play Area" }
              ],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "13.0108",
                "longitude": "77.6550"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bhartiya City",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560064",
                "addressCountry": "IN"
              },
              "offers": {
                "@type": "Offer",
                "price": 15000000,
                "priceCurrency": "INR"
              }
            })
          }}
        />
        
        {/* JSON-LD structured data for breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://houseofdreamsrealty.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Luxury Apartments",
                  "item": "https://houseofdreamsrealty.com/luxury-apartments/"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Lakefront Properties",
                  "item": "https://houseofdreamsrealty.com/lakefront-properties/"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} antialiased`}
        data-theme="light"
      >
        {children}
        {/* Cookie Consent Banner - client component loaded at the root */}
        <CookieConsentContainer />
      </body>
    </html>
  );
}
