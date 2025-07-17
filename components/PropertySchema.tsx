'use client';

interface PropertySchemaProps {
  name: string;
  description: string;
  url: string;
  image: string;
  numberOfRooms: string;
  floorSize: {
    value: number;
    unitCode: string;
  };
  amenities: string[];
  geo: {
    latitude: string;
    longitude: string;
  };
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  offers?: {
    price: number;
    priceCurrency: string;
  };
}

export default function PropertySchema({
  name,
  description,
  url,
  image,
  numberOfRooms,
  floorSize,
  amenities,
  geo,
  address,
  offers,
}: PropertySchemaProps) {
  const amenityFeatures = amenities.map(amenity => ({
    "@type": "LocationFeatureSpecification",
    "name": amenity
  }));
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Residence",
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "numberOfRooms": numberOfRooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": floorSize.value,
      "unitCode": floorSize.unitCode
    },
    "amenityFeature": amenityFeatures,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    ...(offers && {
      "offers": {
        "@type": "Offer",
        "price": offers.price,
        "priceCurrency": offers.priceCurrency
      }
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
