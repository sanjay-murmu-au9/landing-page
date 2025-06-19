'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageSkeleton from '../components/ImageSkeleton';
import { getImagePath } from '../lib/image-path';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  // Add state for hero background
  const [heroBackground, setHeroBackground] = useState(0);
  // Track if user is manually scrolling through hero images
  const [isUserScrollingHero, setIsUserScrollingHero] = useState(false);
  // Timeout to resume auto rotation after manual scrolling
  const autoScrollResumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Hero background images with corrected paths
  const heroBackgrounds = [
    {
      src: getImagePath('images/hero-luxury-exterior-1.jpg'),
      alt: "Luxury lakefront villa with modern architecture"
    },
    {
      src: getImagePath('images/hero-luxury-exterior-2.jpg'),
      alt: "Modern luxury apartment exterior with landscaping"
    },
    {
      src: getImagePath('images/hero-living-space.jpg'),
      alt: "Elegant living space with panoramic lake view"
    },
    {
      src: getImagePath('images/hero-pool-view.jpg'),
      alt: "Premium infinity pool with architectural lighting"
    },
    {
      src: getImagePath('images/luxury-home-facade.jpg'),
      alt: "Modern luxury home facade with artistic design"
    }
  ];

  const carouselImages = [
    {
      src: getImagePath('images/penthouse-interior.jpg'),
      alt: "Elegant penthouse interior with premium finishes",
      caption: "Exquisite interiors with premium finishes"
    },
    {
      src: getImagePath('images/luxury-bathroom.jpg'),
      alt: "Luxury bathroom with marble and premium fixtures",
      caption: "Premium bathrooms with imported marble"
    },
    {
      src: getImagePath('images/luxury-kitchen.jpg'),
      alt: "Premium kitchen with top-of-the-line appliances",
      caption: "Designer kitchens with high-end appliances"
    },
    {
      src: getImagePath('images/modern-bedroom.jpg'),
      alt: "Modern bedroom with luxurious design elements",
      caption: "Spacious bedrooms with lake views"
    },
    {
      src: getImagePath('images/amenity-gym.jpg'),
      alt: "Premium fitness center with modern equipment",
      caption: "State-of-the-art fitness center"
    },
    {
      src: getImagePath('images/amenity-spa.jpg'),
      alt: "Luxury spa area with premium relaxation facilities",
      caption: "Exclusive spa and wellness facilities"
    },
    {
      src: getImagePath('images/aerial-view.jpg'),
      alt: "Aerial view of the luxury apartment complex",
      caption: "Prime location with breathtaking surroundings"
    }
  ];

  const highlights = [
    { icon: "🏢", title: "306 Apartments", description: "Only 306 Apartments on 6.58 Acres" },
    { icon: "📊", title: "Low Density", description: "47 Apartments per Acre" },
    { icon: "🌳", title: "Open Spaces", description: "84% Open & Green Area" },
    { icon: "🏠", title: "Privacy", description: "90% Flats with No Common Walls" },
    { icon: "🌲", title: "Green Space", description: "1,00,000 Sqft Green/Lakefront Open Space" },
    { icon: "🛗", title: "Accessibility", description: "5 Lifts Per Tower" },
    { icon: "🏙️", title: "Surrounding", description: "Low-Rise Developments & Lake Views" },
    { icon: "👁️", title: "Exclusivity", description: "Complete Privacy with Great Views" }
  ];

  const specifications = [
    { icon: "🏛️", title: "Premium Flooring", description: "Marble Flooring in All Rooms & Bathrooms" },
    { icon: "🚪", title: "Entrance", description: "8ft Main Entrance Door with Digital Lock" },
    { icon: "🪨", title: "Countertops", description: "Countertops & Lift Cladding in Marble" },
    { icon: "🪟", title: "Glass Features", description: "Glass Facade Balconies & Shower Partitions" },
    { icon: "🚿", title: "In-built Geysers", description: "In-built Geysers in All Washrooms" },
    { icon: "🛁", title: "Fixtures", description: "Premium Washroom Fixtures" }
  ];

  const proximityFeatures = [
    { icon: "🚇", title: "Metro Station", distance: "10 mins" },
    { icon: "🏥", title: "Hospitals", distance: "15 mins" },
    { icon: "🏫", title: "Schools", distance: "12 mins" },
    { icon: "🛒", title: "Shopping Malls", distance: "8 mins" },
    { icon: "💼", title: "Business Hubs", distance: "15 mins" }
  ];

  useEffect(() => {
    // Carousel image rotation
    const carouselTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    // Hero background rotation only if user is not manually scrolling
    let heroTimer: NodeJS.Timeout | null = null;
    if (!isUserScrollingHero) {
      heroTimer = setInterval(() => {
        setHeroBackground((prev) => (prev + 1) % heroBackgrounds.length);
      }, 7000);
    }

    return () => {
      clearInterval(carouselTimer);
      if (heroTimer) clearInterval(heroTimer);
    };
  }, [carouselImages.length, heroBackgrounds.length, isUserScrollingHero]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to manually navigate hero backgrounds
  const navigateHeroBackground = (direction: 'prev' | 'next') => {
    setIsUserScrollingHero(true);

    // Clear any existing timeout
    if (autoScrollResumeTimeoutRef.current) {
      clearTimeout(autoScrollResumeTimeoutRef.current);
    }

    setHeroBackground(prev => {
      if (direction === 'prev') {
        return prev === 0 ? heroBackgrounds.length - 1 : prev - 1;
      } else {
        return (prev + 1) % heroBackgrounds.length;
      }
    });

    // Resume auto rotation after 10 seconds of inactivity
    autoScrollResumeTimeoutRef.current = setTimeout(() => {
      setIsUserScrollingHero(false);
    }, 10000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {
      fullName: '',
      email: '',
      phone: ''
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Valid email is required';
      isValid = false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      errors.phone = 'Valid 10-digit Indian phone number is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run validation first
    if (validateForm()) {
      try {
        const response = await fetch('https://api.lutui.in/tp/hod/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        // If valid, proceed with submission
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Form submitted:', formData);

        setIsFormSubmitted(true);

        // Reset form after a delay
        setTimeout(() => {
          setIsFormSubmitted(false);
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            message: '',
          });
        }, 3000);
      } catch (err) {
        console.error('Error during form submission:', err);
        setFormErrors({
          fullName:
            'An error occurred while submitting the form. Please try again later.',
          email: '',
          phone: '',
        });
        return;
      }
    }
  };


  return (
    <main className="relative">
      {/* Fixed Call Now button for mobile */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <a
          href="tel:+918260028808"
          className="flex items-center justify-center bg-green-600 text-white rounded-full p-4 shadow-lg"
          aria-label="Call now"
        >
          <span className="mr-2">📞</span> Call Now
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 z-0">
          {heroBackgrounds.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                heroBackground === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ImageSkeleton className="absolute inset-0" />
              <Image
                src={bg.src}
                alt={bg.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                quality={100}
                className="object-cover"
              />
            </div>
          ))}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 backdrop-blur-[1px]" /> */}
        </div>

        {/* Hero navigation buttons - Refined elegant style */}
        <div className="absolute inset-y-0 left-0 z-20 flex items-center">
          <button
            onClick={() => navigateHeroBackground('prev')}
            className="bg-black/20 hover:bg-black/40 text-white p-3 md:p-5 ml-2 rounded-full border border-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation hover:scale-105"
            aria-label="Previous background"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 z-20 flex items-center">
          <button
            onClick={() => navigateHeroBackground('next')}
            className="bg-black/20 hover:bg-black/40 text-white p-3 md:p-5 mr-2 rounded-full border border-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation hover:scale-105"
            aria-label="Next background"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Hero background indicators - Refined elegant style */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
          <div className="flex space-x-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            {heroBackgrounds.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsUserScrollingHero(true);
                  setHeroBackground(index);

                  if (autoScrollResumeTimeoutRef.current) {
                    clearTimeout(autoScrollResumeTimeoutRef.current);
                  }

                  autoScrollResumeTimeoutRef.current = setTimeout(() => {
                    setIsUserScrollingHero(false);
                  }, 10000);
                }}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 touch-manipulation ${
                  heroBackground === index ? 'bg-primary scale-110' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to background ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Logo and Brand */}
        <div className="absolute top-6 left-6 z-30">
          <div className="flex items-center">
            <div className="bg-black/30 backdrop-blur-sm p-2 rounded-lg border border-white/10">
              <h3 className="text-white font-serif text-xl md:text-2xl">
                <span className="text-primary">Prestige</span> Somerville
              </h3>
            </div>
          </div>
        </div>

        {/* Main Hero Content - Luxury Redesign */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-md p-6 md:p-10 rounded-lg border border-white/10 shadow-2xl animate-fadeIn">
            <div className="animate-fadeIn space-y-6">
              <div className="w-24 h-1 bg-primary mb-4"></div>
             <h1 className="hidden md:block text-3xl md:text-4xl lg:text-6xl font-serif text-white leading-tight">
                Prestige Somerville: <br />
                <span className="text-primary">Lakefront Luxury</span> Apartments
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-light">
                Experience unparalleled luxury living with spectacular lake views in Bangalore's most prestigious address
              </p>

              <div className="pt-4">
                <p className="text-primary text-lg md:text-xl font-medium mb-4">
                  Pay Zero EMIs till March 2027 with EZ Pay Plan by Axis Bank
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <button
                  onClick={scrollToForm}
                  className="luxury-button bg-primary hover:bg-primary-dark text-white group flex items-center justify-center"
                >
                  <span>Download Brochure</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                <button
                  onClick={scrollToForm}
                  className="luxury-button bg-white hover:bg-neutral-100 text-primary border border-primary group flex items-center justify-center"
                >
                  <span>Schedule a Visit</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 pt-4">
                <p className="text-white/80 text-base">Contact Sales:</p>
                <a href="tel:+918260028808" className="text-white text-lg hover:text-primary transition-colors flex items-center group">
                  <span className="bg-primary/20 rounded-full p-2 mr-2 group-hover:bg-primary/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  +91-6361406787

                </a>
                <a href="tel:+916361406787" className="text-white text-lg hover:text-primary transition-colors flex items-center group">
                  <span className="bg-primary/20 rounded-full p-2 mr-2 group-hover:bg-primary/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  +91-8260028808
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Carousel Section */}
      <section className="py-16 md:py-24 bg-neutral-light" ref={carouselRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-1 bg-primary mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
              Exquisite Living Spaces
            </h2>
            <p className="text-3xl max-w-2xl mx-auto text-center text-lg">
              Experience unparalleled luxury with premium finishes and breathtaking views
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-xl shadow-2xl">
              <div className="relative h-80 md:h-[600px] transition-all duration-1000">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      activeSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <ImageSkeleton className="absolute inset-0" />
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 90vw"
                      className="object-cover"
                      quality={100}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-16 pb-6 px-6 md:px-8">
                      <p className="text-white text-lg md:text-xl font-light">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Elegant carousel controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
              <button
                onClick={() => setActiveSlide(activeSlide === 0 ? carouselImages.length - 1 : activeSlide - 1)}
                className="bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:scale-110 touch-manipulation border border-primary/10"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
              <button
                onClick={() => setActiveSlide((activeSlide + 1) % carouselImages.length)}
                className="bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:scale-110 touch-manipulation border border-primary/10"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Elegant carousel indicators */}
            <div className="absolute -bottom-12 left-0 right-0 z-10 flex justify-center">
              <div className="flex space-x-3">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeSlide === index
                        ? 'bg-primary scale-125 shadow-md'
                        : 'bg-neutral-dark/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Project Highlights - Luxury Redesign */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-1 bg-primary mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-secondary-dark">
              Exclusive Features
            </h2>
            <p className="text-neutral-dark max-w-2xl mx-auto text-center text-lg">
              Distinctive elements that elevate Prestige Somerville above the ordinary
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl p-6 md:p-8
                         shadow-[0_8px_30px_rgb(0,0,0,0.06)]
                         border border-neutral-light/50
                         hover:shadow-[0_15px_35px_rgb(0,0,0,0.1)]
                         hover:border-primary/30
                         transition-all duration-500 transform hover:-translate-y-1
                         overflow-hidden group"
              >
                {/* Subtle highlight effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content with improved contrast */}
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl mb-4 text-primary group-hover:scale-110 transition-transform duration-500">
                    {highlight.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif mb-3 text-secondary-dark font-medium">
                    {highlight.title}
                  </h3>
                  <div className="w-10 h-0.5 bg-primary mb-4 group-hover:w-16 transition-all duration-500"></div>
                  <p className="text-neutral-dark text-base md:text-lg">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <button
              onClick={scrollToForm}
              className="luxury-button bg-primary text-white group flex items-center justify-center mx-auto
                       shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Check Apartment Availability</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Image + Text Split Section - Luxury Redesign */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
            {/* Image side */}
            <div className="w-full lg:w-1/2 order-1 lg:order-1 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="relative overflow-hidden rounded-xl shadow-2xl h-[400px] md:h-[600px] transform transition-transform duration-700 hover:scale-[1.02]">
                <ImageSkeleton className="absolute inset-0" />
                <Image
                  src={getImagePath('images/hero-living-space.jpg')}
                  alt="Elegant living space with panoramic lake view"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-primary text-white text-xs uppercase tracking-wider py-1 px-3 rounded-full">Premium View</span>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="w-full lg:w-1/2 order-2 lg:order-2 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="max-w-xl mx-auto lg:mx-0 p-6 md:p-8 lg:p-0">
                <div className="w-16 h-1 bg-primary mb-6"></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-secondary-dark leading-tight text-[#0c4c34]">
                  Experience Lakefront Living at Its Finest
                </h2>

                <p className="text-neutral-dark text-lg md:text-xl mb-8 leading-relaxed text-[#0c4c34]">
                  Prestige Somerville offers an exclusive blend of luxury and tranquility with panoramic lake views, spacious interiors, and complete privacy. With 90% of apartments featuring no common walls, enjoy an unparalleled sense of exclusivity in the heart of Bangalore.
                </p>

                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center">
                    <span className="bg-primary/10 p-2 rounded-full text-primary mr-4 text-[#0c4c34]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-neutral-dark text-lg text-[#0c4c34]">Premium Imported Marble Flooring</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-primary/10 p-2 rounded-full text-primary mr-4 text-[#0c4c34]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-neutral-dark text-lg text-[#0c4c34]">Floor-to-Ceiling Windows with Lake Views</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-primary/10 p-2 rounded-full text-primary mr-4 text-[#0c4c34]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-neutral-dark text-lg text-[#0c4c34]">Private Glass-Façade Balconies</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                  <button
                    onClick={scrollToForm}
                    className="luxury-button bg-primary hover:bg-primary-dark text-white group flex items-center justify-center"
                  >
                    <span>Schedule a Site Visit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button
                    onClick={scrollToForm}
                    className="luxury-button bg-white hover:bg-neutral-100 text-primary border border-primary group flex items-center justify-center"
                  >
                    <span>Get Floor Plan</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 text-[#0c4c34]">
                  <p className="text-secondary-dark font-medium">Contact Sales:</p>
                  <a href="tel:+918260028808" className="text-primary hover:text-primary-dark transition-colors flex items-center group">
                    <span className="bg-primary/10 rounded-full p-2 mr-2 group-hover:bg-primary/20 transition-colors text-[#0c4c34]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    +91-8260028808
                  </a>
                  <a href="tel:+916361406787" className="text-primary hover:text-primary-dark transition-colors flex items-center group">
                    <span className="bg-primary/10 rounded-full p-2 mr-2 group-hover:bg-primary/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    +91-6361406787
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Buy Through Us Section */}
      <section className="py-12 md:py-16 bg-[#f8f6f0]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#0c4c34]">
            <span className="border-b-2 border-[#d4af37] pb-1">Why Buy Prestige Somerville Through Us</span>
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto text-center mb-8 md:mb-10">
            Carefully curated benefits that set us apart from the crowd
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border-l-4 border-[#d4af37] flex flex-col h-full">
              <div className="flex items-center mb-4">
                <span className="text-[#d4af37] mr-3 text-2xl">✅</span>
                <h3 className="text-lg md:text-xl font-semibold text-[#0c4c34]">Access to Exclusive Inventory</h3>
              </div>
              <p className="text-gray-800 mt-auto">Premium units with the best views and layouts, only available through our direct channel</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border-l-4 border-[#d4af37] flex flex-col h-full">
              <div className="flex items-center mb-4">
                <span className="text-[#d4af37] mr-3 text-2xl">✅</span>
                <h3 className="text-lg md:text-xl font-semibold text-[#0c4c34]">Zero EMI Offer Help</h3>
              </div>
              <p className="text-gray-800 mt-auto">Personalized assistance with Axis Bank's exclusive EZ Pay Plan with EMI-free period till 2027</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border-l-4 border-[#d4af37] flex flex-col h-full">
              <div className="flex items-center mb-4">
                <span className="text-[#d4af37] mr-3 text-2xl">✅</span>
                <h3 className="text-lg md:text-xl font-semibold text-[#0c4c34]">Direct Developer Ties</h3>
              </div>
              <p className="text-gray-800 mt-auto">Access verified information, priority booking status, and direct communication with Prestige Group</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border-l-4 border-[#d4af37] flex flex-col h-full">
              <div className="flex items-center mb-4">
                <span className="text-[#d4af37] mr-3 text-2xl">✅</span>
                <h3 className="text-lg md:text-xl font-semibold text-[#0c4c34]">Dedicated Relationship Manager</h3>
              </div>
              <p className="text-gray-800 mt-auto">One point of contact for your entire journey from booking to possession and beyond</p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border-l-4 border-[#d4af37] flex flex-col h-full">
              <div className="flex items-center mb-4">
                <span className="text-[#d4af37] mr-3 text-2xl">✅</span>
                <h3 className="text-lg md:text-xl font-semibold text-[#0c4c34]">Faster Response Times</h3>
              </div>
              <p className="text-gray-800 mt-auto">No delays or third-party miscommunication, with real people on the phone whenever you need assistance</p>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border-l-4 border-[#d4af37] flex flex-col h-full">
              <div className="flex items-center mb-4">
                <span className="text-[#d4af37] mr-3 text-2xl">✅</span>
                <h3 className="text-lg md:text-xl font-semibold text-[#0c4c34]">Launch-Only Benefits</h3>
              </div>
              <p className="text-gray-800 mt-auto">Exclusive benefits like waived administrative fees, early buyer incentives, and special welcome gifts</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl border-2 border-[#d4af37]/20 shadow-lg max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl font-medium text-[#0c4c34] mb-4">Ready to secure your dream home?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 mb-5">
              <a href="tel:+918260028808" className="text-gray-800 text-lg hover:text-[#0c4c34] flex items-center transition-colors">
                <span className="mr-2 text-[#d4af37]">📞</span> +91-6361406787
              </a>
              <a href="tel:+916361406787" className="text-gray-800 text-lg hover:text-[#0c4c34] flex items-center transition-colors">
                <span className="mr-2 text-[#d4af37]">📞</span> +91-8260028808
              </a>
            </div>
            <button
              onClick={scrollToForm}
              className="bg-[#d4af37] hover:bg-[#c4a030] text-white px-8 py-4 rounded-lg font-medium text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 inline-block"
            >
              Schedule Your Site Visit Today
            </button>
          </div>
        </div>
      </section>

      {/* Premium Specifications */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#0c4c34]">
            <span className="border-b-2 border-[#d4af37] pb-1">Premium Specifications</span>
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto text-center mb-8 md:mb-10">
            Exceptional quality and luxury in every detail
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className="bg-[#f8f6f0] p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border-t-4 border-[#d4af37]"
              >
                <div className="text-2xl md:text-3xl mb-3 text-[#d4af37]">{spec.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#0c4c34]">{spec.title}</h3>
                <p className="text-gray-800 text-sm md:text-base">{spec.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-10">
            <button
              onClick={scrollToForm}
              className="bg-[#0c4c34] hover:bg-[#0a3f2b] text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors transform hover:scale-105 active:scale-95"
            >
              View Interior Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 md:py-16 bg-[#f0f5f3]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#0c4c34]">Walk Through Your Future Home</h2>
          <p className="text-gray-800 max-w-2xl mx-auto text-center mb-8 md:mb-10">
            Experience lake views, privacy, and elegance from anywhere
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden pt-[56.25%] rounded-xl shadow-lg border-2 border-[#d4af37]/20">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/uj-qkAh7xAA"
                title="Virtual tour of Prestige Somerville"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-10">
            <button
              onClick={scrollToForm}
              className="bg-[#d4af37] hover:bg-[#c4a030] text-white px-6 py-3 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              Schedule a Virtual Visit
            </button>
          </div>
        </div>
      </section>

      {/* EZ PAY PLAN */}
      <section className="py-12 md:py-16 bg-[#0c4c34] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">EZ PAY PLAN</h2>
          <p className="text-xl text-center mb-8 md:mb-10 text-[#d4af37] font-semibold">
            Exclusive Axis Bank Offer
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/15 backdrop-blur-sm p-6 md:p-8 rounded-xl border-2 border-[#d4af37]/30 shadow-lg">
              <ul className="space-y-5">
                {[
                  "Zero EMIs for 2 Years",
                  "Interest-Free Loan",
                  "EMIs Covered by Prestige till March 2027",
                  "Customer Pays EMIs from April 2027",
                  "Offer Valid Only via Axis Bank"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start animate-fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>
                    <span className="text-[#d4af37] mr-3 text-2xl flex-shrink-0">✅</span>
                    <span className="text-base md:text-lg font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-10">
            <button
              onClick={scrollToForm}
              className="bg-[#d4af37] hover:bg-[#c4a030] text-white px-8 py-4 rounded-lg font-medium text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border border-[#f0f0f0]/20"
            >
              Speak to Our Finance Expert
            </button>
          </div>
        </div>
      </section>

    {/* Premium Inquiry Form */}
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-neutral-50" ref={formRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto relative">
          {/* Decorative elements for premium feel */}
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-primary/5 z-0"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-primary/5 z-0"></div>

          <div className="relative z-10">
            <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-1 bg-[#d4af37] mb-6"></div>
              <h2 className="text-2xl md:text-3xl font-serif text-center mb-3 text-[#0c4c34]">
                Premium Inquiry
              </h2>
              <p className="text-neutral-700 max-w-lg mx-auto text-center text-base md:text-lg">
                Receive exclusive details about Prestige Somerville luxury apartments
              </p>
            </div>

            {isFormSubmitted ? (
              <div className="bg-gradient-to-r from-[#f8f6f0] to-[#f0f5f3] border border-[#d4af37]/20 rounded-xl p-8 shadow-xl text-center animate-fadeIn">
                <div className="inline-block p-3 bg-[#0c4c34]/10 rounded-full mb-4">
                  <div className="text-4xl">✨</div>
                </div>
                <h3 className="text-xl font-serif text-[#0c4c34] mb-3">Thank You for Your Interest</h3>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  We've received your request and will send you the exclusive brochure shortly. Our luxury property consultant will call you within 24 hours.
                </p>
                <button
                  onClick={() => setIsFormSubmitted(false)}
                  className="bg-[#0c4c34] hover:bg-[#0a3f2b] text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95 shadow-md"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-[#d4af37]/20">
                <div className="mb-6">
                  <label htmlFor="fullName" className="block text-[#0c4c34] font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full p-3 md:p-4 bg-transparent text-[#0c4c34] border-b-2 focus:outline-none focus:border-[#d4af37] transition-colors ${
                      formErrors.email ? 'border-red-500' : 'border-[#0c4c34]/20'
                    }`}
                    placeholder="John Smith"
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-[#0c4c34] font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 md:p-4 bg-transparent text-[#0c4c34] border-b-2 focus:outline-none focus:border-[#d4af37] transition-colors ${
                      formErrors.email ? 'border-red-500' : 'border-[#0c4c34]/20'
                    }`}
                    placeholder="name@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div className="mb-8">
                  <label htmlFor="phone" className="block text-[#0c4c34] font-medium mb-2">Phone Number *</label>
                  <div className={`flex items-center border-b-2 ${formErrors.phone ? 'border-red-500' : 'border-[#0c4c34]/20'}`}>
                    <div className="flex-shrink-0 bg-[#f8f6f0] text-[#0c4c34] p-3 rounded-tl-lg border-r border-[#0c4c34]/10">
                      +91
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 md:p-4 bg-transparent text-[#0c4c34] focus:outline-none"
                      placeholder="9876543210"
                      maxLength={10}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#c4a030] hover:from-[#c4a030] hover:to-[#b39020] text-white py-4 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.98]"
                >
                  Request Exclusive Brochure
                </button>

                <p className="text-neutral-600 text-sm text-center mt-5">
                  We respect your privacy. Your information is secure with us.
                  <br />
                  <Link href="/privacy-policy" className="text-[#0c4c34] hover:text-[#d4af37] underline transition-colors">View Privacy Policy</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>

      {/* Google Map Location */}
      <section className="py-12 md:py-16 bg-[#f0f5f3]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#0c4c34]">Find Us on the Map</h2>
          <p className="text-gray-800 max-w-2xl mx-auto text-center mb-8 md:mb-10">
            Strategically located with excellent connectivity to key areas
          </p>

          <div className="w-full">
            <div className="relative w-full h-[400px] rounded-none shadow-lg mb-6 md:mb-10 border-t border-b border-[#0c4c34]/20">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3861643633713!2d77.63719531482293!3d13.012343990827535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17b55e75f6c9%3A0x3a77a0ec00f4fcd1!2sBangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1621234567890!5m2!1sen!2sus"
                allowFullScreen={true}
                loading="lazy"
                title="Prestige Somerville Location Map"
              ></iframe>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
              {proximityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-3 md:p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border-b-2 border-[#d4af37]"
                >
                  <div className="text-xl md:text-2xl mb-2 text-[#0c4c34]">{feature.icon}</div>
                  <h3 className="font-medium mb-1 text-sm md:text-base text-[#0c4c34]">{feature.title}</h3>
                  <p className="text-gray-800 text-xs md:text-sm">{feature.distance}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="https://goo.gl/maps/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0c4c34] hover:bg-[#0a3f2b] text-white px-5 md:px-6 py-3 rounded-lg font-medium text-base md:text-lg transition-all inline-block shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
              >
                Get Directions on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0c4c34]">
              <span className="border-b-2 border-[#d4af37] pb-1">Trusted by Thousands</span>
            </h2>

            <div className="mb-8">
              <p className="text-lg md:text-xl mb-4 font-medium text-gray-800">10,000+ Homes Delivered by Prestige Group</p>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ animation: `pulse 1s ease-in-out ${star * 0.15}s infinite` }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="p-5 bg-[#0c4c34]/5 rounded-lg inline-block shadow-md border border-[#0c4c34]/20">
              <p className="font-medium text-sm md:text-base text-[#0c4c34]">RERA Registration: KA/1234/567/2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 bg-[#0c4c34] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <a href="tel:+918260028808" className="block hover:text-[#d4af37] transition-colors flex items-center group">
                    <span className="mr-2 group-hover:animate-pulse">📞</span> +91-6361406787
                  </a>
                  <a href="tel:+916361406787" className="block hover:text-[#d4af37] transition-colors flex items-center group">
                    <span className="mr-2 group-hover:animate-pulse">📞</span> +91-8260028808
                  </a>
                  <p className="text-sm text-white/80 mt-2">
                    Sales Office: Prestige Somerville, Bangalore
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-[#d4af37] transition-all transform hover:scale-110" aria-label="Facebook">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-[#d4af37] transition-all transform hover:scale-110" aria-label="Instagram">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-[#d4af37] transition-all transform hover:scale-110" aria-label="Twitter">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="https://wa.me/916361406787" className="text-white hover:text-[#d4af37] transition-all transform hover:scale-105" aria-label="WhatsApp">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                    </svg>
                  </a>
                </div>

                <div className="mt-6">
                  <a
                    href="mailto:info@prestigesomerville.com"
                    className="block hover:text-[#d4af37] transition-colors text-sm"
                  >
                    info@prestigesomerville.com
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4">Legal</h3>
                <div className="space-y-2">
                  <a href="#" className="block hover:text-[#d4af37] transition-colors text-sm md:text-base">Terms & Conditions</a>
                  <a href="#" className="block hover:text-[#d4af37] transition-colors text-sm md:text-base">Privacy Policy</a>
                  <a href="#" className="block hover:text-[#d4af37] transition-colors text-sm md:text-base">RERA Information</a>
                  <a href="#" className="block hover:text-[#d4af37] transition-colors text-sm md:text-base">Disclaimer</a>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/20 text-center">
              <p className="text-sm md:text-base">Presented by Prestige Group</p>
              <p className="mt-2 text-xs md:text-sm opacity-75">
                © {new Date().getFullYear()} Prestige Somerville. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
