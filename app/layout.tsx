import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { useEffect } from 'react';
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prestige Somerville | Luxury Lakefront Apartments in Bangalore",
  description: "Prestige Somerville offers premium lakefront luxury apartments in Bangalore with zero EMIs till March 2027. Explore floor plans, amenities, and pricing details.",
  keywords: "Prestige Somerville, luxury apartments Bangalore, lakefront property, Prestige Group, Bangalore real estate, luxury homes",
  metadataBase: new URL('https://sanjay-murmu-au9.github.io/landing-page/'),
  openGraph: {
    title: "Prestige Somerville | Luxury Lakefront Apartments",
    description: "Experience unparalleled luxury living with breathtaking lake views at Prestige Somerville, Bangalore's most exclusive residential address.",
    images: ['/images/hero-luxury-exterior-1.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';
  const basePath = isDev ? '' : '/real-estate-landing';

  return (
    <html lang="en">
      <head>
        {/* Add custom font preloads for improved performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Add favicon */}
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        {/* Force CSS reload in production */}
        <link 
          rel="stylesheet" 
          href={`${basePath}/_next/static/css/app/page.css`} 
          precedence="high"
        />
      </head>
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
