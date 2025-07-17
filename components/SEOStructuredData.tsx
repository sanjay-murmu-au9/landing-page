'use client';

export default function SEOStructuredData() {
  return (
    <>
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
    </>
  );
}
