'use client';

interface LocalBusinessSchemaProps {
  name: string;
  image: string;
  telephone: string;
  priceRange?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: string;
    longitude: string;
  };
}

export default function LocalBusinessSchema({
  name,
  image,
  telephone,
  priceRange = "₹₹₹₹",
  address,
  geo
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": name,
    "image": image,
    "@id": "https://houseofdreamsrealty.com/#organization",
    "url": "https://houseofdreamsrealty.com/",
    "telephone": telephone,
    "priceRange": priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
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
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61577984246859",
      "https://twitter.com/houseofdreamsrealty",
      "https://www.instagram.com/houseofdreamsrealty/",
      "https://www.linkedin.com/company/houseofdreamsrealty/",
      "https://www.youtube.com/channel/houseofdreamsrealty"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
