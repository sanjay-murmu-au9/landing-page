'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageSkeleton from '../components/ImageSkeleton';
import { getImagePath } from '../lib/image-path';
import CanonicalUrl from '../components/CanonicalUrl';

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
  // State to track whether to show text banner
  const [showHeroText, setShowHeroText] = useState(false);
  // State to track iteration count - to show banner from 2nd iteration
  // Start at 1 to immediately show the banner for debugging
  const [heroIterationCount, setHeroIterationCount] = useState(1);
  // Timeout to resume auto rotation after manual scrolling
  const autoScrollResumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Timeout for showing text banner
  const textBannerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Effect to show banner on initial load after a delay
  useEffect(() => {
    // Show banner after initial load with delay
    setTimeout(() => {
      console.log('Initial load effect - setting showHeroText to true');
      setShowHeroText(true);
    }, 2500);
  }, []);

  // Function to create ripple effect on button click
  const createRippleEffect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;

    // Create ripple element
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    // Position ripple based on click location
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;

    // Add ripple class
    circle.classList.add('ripple-effect');

    // Clear existing ripples
    const ripple = button.querySelector('.ripple-effect');
    if (ripple) {
      ripple.remove();
    }

    // Add to DOM
    button.appendChild(circle);

    // Remove after animation completes
    setTimeout(() => {
      if (circle) {
        circle.remove();
      }
    }, 600);
  };

  // Hero background images with optimized paths
  const heroBackgrounds = [
      {
      src: getImagePath('images/houseofdreamreality-emotion.jpg'),
      alt: 'images/houseofdreamreality-emotion.jpg'
    },
    {
      src: getImagePath('images/optimized/houseofdreamsreality.jpg'),
      alt: 'images/optimized/houseofdreamsreality.jpg'
    },
    {
      src: getImagePath('images/optimized/houseofdreamreality02.jpg'),
      alt: 'images/optimized/houseofdreamreality02.jpg'
    },
    {
      src: getImagePath('images/optimized/houseofdreamreality03.jpg'),
      alt: 'images/optimized/houseofdreamreality03.jpg'
    },
    {
      src: getImagePath('images/optimized/houseofdreamreality04.jpeg'),
      alt: 'images/optimized/houseofdreamreality04.jpeg'
    },
  ];

  const carouselImages = [
        {
        src: getImagePath('images/houseofdreamreality-living.jpg'),
        alt: "Premium living room with modern amenities",
        caption: "State-of-the-art living spaces"
      },
    {
      src: getImagePath('images/houseofdreamreality-penthouse.jpg'),
      alt: "Elegant penthouse interior with premium finishes",
      caption: "Exquisite penthouse interiors with luxury details"
    },
    {
      src: getImagePath('images/optimized/hero-living-space.jpg'),
      alt: "Luxury living room with marble and premium fixtures",
      caption: "Living rooms adorned with imported marble"
    },
    {
      src: getImagePath('images/houseofdreamreality-luxury-kitchen.jpg'),
      alt: "Premium kitchen with top-tier appliances",
      caption: "Designer kitchens featuring high-end appliances"
    },
    {
      src: getImagePath('images/modern-bedroom.jpg'),
      alt: "Modern bedroom with luxurious design elements",
      caption: "Spacious bedrooms offering serene lake views"
    },
    {
      src: getImagePath('images/houseofdreamreality-washroom.jpg'),
      alt: "Luxury washroom with premium fixtures",
      caption: "Exclusive spa and wellness amenities"
    },
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
        // First hide the text banner
        setShowHeroText(false);

        // Wait for text to fade out completely before changing background
        setTimeout(() => {
          // Increment the iteration counter first
          const newIterationCount = heroIterationCount + 1;
          setHeroIterationCount(newIterationCount);

          // Change the background image with a smooth transition
          setHeroBackground((prev) => (prev + 1) % heroBackgrounds.length);

          // After the image has loaded, show the text banner with a longer delay
          // But only if we're past the first iteration
          if (textBannerTimeoutRef.current) {
            clearTimeout(textBannerTimeoutRef.current);
          }

          // Use the new iteration count we calculated
          if (newIterationCount >= 1) { // Only show banner from second iteration onwards
            textBannerTimeoutRef.current = setTimeout(() => {
              setShowHeroText(true);
            }, 3500); // 3.5 seconds delay for smoother transition with the new animations
          }
        }, 1200); // Wait longer for text to fade out completely for smoother transitions
      }, 8500); // Increased duration between slides for better viewing experience
    }

    // Initial setup - show text banner if we're already past the first iteration
    if (heroIterationCount >= 1 && !showHeroText) {
      if (textBannerTimeoutRef.current) {
        clearTimeout(textBannerTimeoutRef.current);
      }
      textBannerTimeoutRef.current = setTimeout(() => {
        setShowHeroText(true);
      }, 3500); // Increased for consistency with other transitions
    }

    return () => {
      clearInterval(carouselTimer);
      if (heroTimer) clearInterval(heroTimer);
      if (textBannerTimeoutRef.current) {
        clearTimeout(textBannerTimeoutRef.current);
      }
    };
  }, [carouselImages.length, heroBackgrounds.length, isUserScrollingHero, heroIterationCount]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to manually navigate hero backgrounds
  const navigateHeroBackground = (direction: 'prev' | 'next') => {
    setIsUserScrollingHero(true);
    setShowHeroText(false); // Hide text banner immediately

    // Clear any existing timeout
    if (autoScrollResumeTimeoutRef.current) {
      clearTimeout(autoScrollResumeTimeoutRef.current);
    }

    if (textBannerTimeoutRef.current) {
      clearTimeout(textBannerTimeoutRef.current);
    }

    // Wait for text to fade out before changing background
    setTimeout(() => {
      // Increment the iteration counter for manual navigation first
      const newIterationCount = heroIterationCount + 1;
      setHeroIterationCount(newIterationCount);

      // Change the background image
      setHeroBackground(prev => {
        if (direction === 'prev') {
          return prev === 0 ? heroBackgrounds.length - 1 : prev - 1;
        } else {
          return (prev + 1) % heroBackgrounds.length;
        }
      });

      // Show text banner after a longer delay, but only after first iteration
      if (newIterationCount >= 1) { // Only show banner from second iteration onwards
        textBannerTimeoutRef.current = setTimeout(() => {
          setShowHeroText(true);
        }, 3500); // 3.5 seconds delay for smoother transition
      }
    }, 1200); // Longer delay before changing background for smoother transition

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

  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run validation first
    if (validateForm()) {
      try {
        // Submit to external API
        const externalResponse = await fetch('https://api.lutui.in/tp/hod/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        // Check for 409 status code (already registered)
        if (externalResponse.status === 409) {
          console.log('User already registered');
          setAlreadyRegistered(true);

          // Reset form after a delay
          setTimeout(() => {
            setAlreadyRegistered(false);
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              message: '',
            });
          }, 3000);
          return;
        }

        if (!externalResponse.ok) {
          throw new Error('Network response was not ok');
        }

        // Also submit to our internal API for admin dashboard
        try {
          await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        } catch (internalError) {
          // Log error but don't fail the form submission
          console.error('Error saving to internal database:', internalError);
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
      <CanonicalUrl />
      {/* Fixed Call Now button for mobile */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <button
          onClick={() => window.location.href = "tel:+918260028808"}
          className="flex items-center justify-center bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-all active:scale-95 relative overflow-hidden button-effect"
          aria-label="Call now"
          onMouseDown={createRippleEffect}
        >
          <span className="relative z-10 mr-2">📞</span> <span className="relative z-10">Call Now</span>
          <span className="absolute inset-0 bg-white/20 transform scale-0 opacity-0 transition-all duration-300 button-ripple"></span>
        </button>
      </div>

      {/* Hero Section with parallax effect */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 hero-image-container">
          {heroBackgrounds.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 hero-image-transition ${
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
                quality={95} /* Increased quality for better transitions */
                className={`object-cover mobile-hero-image ${
                  heroBackground === index ? 'hero-image-enter' : 'hero-image-exit'
                }`}
                style={{
                  objectPosition: '50% 50%' /* Center positioning for all screen sizes */
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" /> {/* Adjusted opacity for better visibility of text */}
            </div>
          ))}
        </div>

        {/* Hero content - positioned lower on screen */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end items-center text-white px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-in-out ${showHeroText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 tracking-tight text-white drop-shadow-lg hero-text-shadow">
              <span className="block">Lakeside Luxury Apartments</span>
              {/* <span className="block mt-2 text-primary-light">4/5BHK Residences</span> */}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-white drop-shadow-md"> {/* Changed from text-neutral-100 to text-white */}
              Experience unparalleled luxury breathtaking lake views and world-class amenities
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button
                onClick={(e) => {
                  // Add ripple and click effects
                  createRippleEffect(e);

                  // Add active/click effect
                  const button = e.currentTarget;
                  button.classList.add('click-pulse');
                  setTimeout(() => button.classList.remove('click-pulse'), 500);

                  // Scroll to form
                  scrollToForm();
                }}
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white text-lg font-medium rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95 active:bg-primary-dark shadow-xl relative overflow-hidden button-effect"
              >
                <span className="relative z-10">Request Information</span>
                <span className="absolute inset-0 bg-white/20 transform scale-0 opacity-0 transition-all duration-300 rounded-md button-ripple"></span>
              </button>
              <Link
                href="/blog"
                className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white text-lg font-medium rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </span>
                Luxury Insights
              </Link>
              <button
                onClick={(e) => {
                  createRippleEffect(e);
                  scrollToAbout();
                }}
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 text-lg font-medium rounded-md transition-all duration-300 backdrop-blur-sm relative overflow-hidden button-effect"
              >
                <span className="relative z-10">Discover More</span>
                <span className="absolute inset-0 bg-white/10 transform scale-0 opacity-0 transition-all duration-300 rounded-md button-ripple"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero navigation controls */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-4">
          <div className="flex gap-2">
            {heroBackgrounds.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  // Add subtle ripple effect to indicator dot
                  if (idx !== heroBackground) {
                    const dot = e.currentTarget;
                    dot.classList.add('click-pulse');
                    setTimeout(() => dot.classList.remove('click-pulse'), 500);
                  }

                  setShowHeroText(false); // Hide text banner immediately
                  setHeroBackground(idx);
                  setIsUserScrollingHero(true);

                  // Clear existing timeouts
                  if (autoScrollResumeTimeoutRef.current) {
                    clearTimeout(autoScrollResumeTimeoutRef.current);
                  }
                  if (textBannerTimeoutRef.current) {
                    clearTimeout(textBannerTimeoutRef.current);
                  }

                  // Increment the iteration counter for manual navigation first
                  const newIterationCount = heroIterationCount + 1;
                  setHeroIterationCount(newIterationCount);

                  // Show text banner after a delay, but only if past first iteration
                  console.log('Button click - iteration:', newIterationCount);
                  if (newIterationCount >= 1) {
                    textBannerTimeoutRef.current = setTimeout(() => {
                      console.log('Button click - setting showHeroText to true');
                      setShowHeroText(true);
                    }, 2500); // Increased to 2.5 seconds to match other delays
                  }

                  // Resume auto rotation after inactivity
                  autoScrollResumeTimeoutRef.current = setTimeout(() => {
                    setIsUserScrollingHero(false);
                  }, 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  heroBackground === idx
                    ? 'bg-primary w-8'
                    : 'bg-white/50 hover:bg-white/80'
                } relative overflow-hidden`}
                aria-label={`View slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-80"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* Introduction section with stats */}
      <section ref={aboutRef} className="bg-neutral-light py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-light to-white opacity-80 animated-gradient"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold mb-2">EXCLUSIVE OFFERING</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-white luxury-heading">
              A New Standard of Luxury
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-black font-medium">
              Nestled beside serene lake views, our development offers an exceptional living experience with thoughtfully designed spaces and premium amenities.
            </p>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: '306', label: 'Exclusive Apartments' },
              { value: '6.58', label: 'Acres of Property' },
              { value: '84%', label: 'Open & Green Area' },
              { value: '90%', label: 'Privacy Optimized' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-gray border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 specification-card"
              >
                <div className="text-4xl font-serif font-bold text-primary mb-2 stat-value">{item.value}</div>
                <p className="stat-label text-black font-bold">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-start p-6 bg-gray rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-3xl mr-4 text-primary">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-black">{item.title}</h3>
                  <p className="text-black font-medium">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Properties Carousel */}
      <section className="py-20 bg-neutral-light px-4 sm:px-6 lg:px-8 relative overflow-hidden"> {/* Changed from bg-white to bg-neutral-light */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div> {/* Changed from from-neutral-light to from-white */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-semibold mb-2">VIRTUAL TOUR</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-secondary-dark luxury-heading">Experience The Luxury</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          </div>

          <div
            ref={carouselRef}
            className="relative h-[60vh] md:h-[70vh] rounded-xl overflow-hidden shadow-2xl mb-12"
          >
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  activeSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <ImageSkeleton className="absolute inset-0" />
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div> {/* Enhanced gradient opacity */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                  <h3 className="text-2xl md:text-3xl font-serif font-medium mb-3 drop-shadow-md">{image.caption}</h3> {/* Added drop-shadow */}
                  <div className="w-12 h-1 bg-primary mb-4"></div>
                  <p className="hidden md:block text-white max-w-xl drop-shadow-md"> {/* Changed from text-white/80 to text-white and added drop-shadow */}
                    Immerse yourself in a world of luxury, where every detail is crafted for the discerning resident.
                  </p>
                </div>
              </div>
            ))}

            {/* Carousel Controls */}
            <div className="absolute bottom-6 right-6 z-20 flex gap-3">
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm hover:bg-primary transition-colors"
              >
                <span className="sr-only">Previous</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev + 1) % carouselImages.length)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm hover:bg-primary transition-colors"
              >
                <span className="sr-only">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeSlide === idx
                      ? 'bg-primary w-6'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`View slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 bg-neutral-light px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-light to-white opacity-80 animated-gradient"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold mb-2">PREMIUM FINISHES</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-secondary-dark luxury-heading">Exceptional Specifications</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-primary-dark font-semibold">
              Every detail is meticulously crafted with premium materials and finishes to enhance your living experience.
            </p>
          </div>

          {/* Specifications grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specifications.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-8 bg-neutral-50 border border-primary/10 rounded-lg shadow-md hover:shadow-lg text-center specifications-card specification-card" /* Matched styling with stat cards */
              >
                <div className="text-5xl mb-5 text-primary stat-value">{item.icon}</div>
                <h3 className="font-serif text-xl mb-3 stat-label">{item.title}</h3>
                <p className="text-primary-dark font-semibold">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantages */}
      <section className="py-20 bg-secondary px-4 sm:px-6 lg:px-8"> {/* Changed to bg-secondary for better contrast with white text */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary-light font-semibold mb-2">PRIME LOCATION</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-6 text-white text-shadow-sm">Strategic Convenience</h2>
              <div className="w-20 h-1 bg-primary-light mb-8"></div>
              <p className="text-lg text-white font-medium mb-8 text-shadow-sm">
                Situated in a prime location that balances serenity with convenience, our development offers easy access to essential services and entertainment options.
              </p>

              {/* Proximity features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {proximityFeatures.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-secondary-dark/80 rounded-lg shadow-md backdrop-blur-sm" /* Changed to bg-secondary-dark with opacity */
                  >
                    <div className="text-2xl mr-3 text-primary-light">{item.icon}</div>
                    <div>
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <p className="text-sm text-primary-light font-semibold">{item.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl border-2 border-primary-light/30 transform hover:scale-[1.02] transition-transform duration-500">
              <Image
                src={getImagePath('images/houseofdreamreality-living.jpg')}
                alt="Aerial view of the property and surrounding area"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-medium mb-2">Strategic Location</h3>
                  <p className="text-sm text-white/90">With excellent connectivity to major roads and highways</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getImagePath('images/luxury-kitchen.jpg')}
            alt="Luxury home facade"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-80"></div> {/* Increased opacity from 70% to 80% */}
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-xl border border-white/30"> {/* Increased opacity */}
            <div className="text-center mb-12 text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 drop-shadow-md"> {/* Added drop-shadow */}
                Reserve Your Exclusive Residence
              </h2>
              <p className="text-lg text-white max-w-3xl mx-auto drop-shadow-sm"> {/* Changed from opacity-90 to text-white */}
                Limited collection of premium residences available. Complete the form below for priority access to floor plans, pricing and exclusive offers.
              </p>
            </div>

            <div ref={formRef} className="max-w-xl mx-auto">
              {isFormSubmitted ? (
                <div className="bg-green-100/90 backdrop-blur-sm text-green-800 p-6 rounded-lg text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                  <p>Your information has been submitted successfully. Our team will contact you shortly.</p>
                </div>
              ) : alreadyRegistered ? (
                <div className="bg-blue-100/90 backdrop-blur-sm text-blue-800 p-6 rounded-lg text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium mb-2">Already Registered!</h3>
                  <p>We have your information on file. Our team will connect with you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className={`w-full px-4 py-3 bg-white/30 border ${  /* Increased opacity from 20% to 30% */
                        formErrors.fullName ? "border-red-400" : "border-white/50"  /* Increased border opacity from 40% to 50% */
                      } rounded-md backdrop-blur-sm text-white placeholder-white/90 focus:outline-none focus:border-primary transition-all`} /* Increased placeholder opacity from 80% to 90% */
                    />
                    {formErrors.fullName && (
                      <p className="mt-1 text-red-200 text-sm font-medium">{formErrors.fullName}</p> /* Changed from text-red-300 to text-red-200 */
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className={`w-full px-4 py-3 bg-white/30 border ${  /* Increased opacity from 20% to 30% */
                        formErrors.email ? "border-red-400" : "border-white/50"  /* Increased border opacity from 40% to 50% */
                      } rounded-md backdrop-blur-sm text-white placeholder-white/90 focus:outline-none focus:border-primary transition-all`} /* Increased placeholder opacity from 80% to 90% */
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-red-200 text-sm font-medium">{formErrors.email}</p> /* Changed from text-red-300 to text-red-200 */
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className={`w-full px-4 py-3 bg-white/30 border ${  /* Increased opacity from 20% to 30% */
                        formErrors.phone ? "border-red-400" : "border-white/50"  /* Increased border opacity from 40% to 50% */
                      } rounded-md backdrop-blur-sm text-white placeholder-white/90 focus:outline-none focus:border-primary transition-all`} /* Increased placeholder opacity from 80% to 90% */
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-red-200 text-sm font-medium">{formErrors.phone}</p> /* Changed from text-red-300 to text-red-200 */
                    )}
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message (Optional)"
                      rows={4}
                      className="w-full px-4 py-3 bg-white/30 border border-white/50 rounded-md backdrop-blur-sm text-white placeholder-white/90 focus:outline-none focus:border-primary transition-all" /* Increased background and border opacity */
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-primary hover:bg-primary-dark text-white text-lg font-medium rounded-md transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 active:bg-primary-dark relative overflow-hidden button-effect"
                      onClick={(e) => {
                        // Add both ripple and pulse effects for enhanced visual feedback
                        createRippleEffect(e);

                        // Add click pulse effect
                        const button = e.currentTarget;
                        button.classList.add('click-pulse');
                        setTimeout(() => button.classList.remove('click-pulse'), 500);
                      }}
                    >
                      <span className="relative z-10">Request Information</span>
                      <span className="absolute inset-0 bg-white/20 transform scale-0 opacity-0 transition-all duration-300 rounded-md button-ripple"></span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-dark text-white py-12 px-4 sm:px-6 lg:px-8"> {/* Changed from bg-neutral-dark to bg-secondary-dark */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-serif mb-4">Lakeside Luxury</h3>
              <p className="text-white text-opacity-90 mb-6"> {/* Changed from text-neutral-300 to text-white with opacity */}
                Experience the pinnacle of luxury living with our exclusive lakefront residences.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61577984246859" className="text-white hover:text-[#1877F2] transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#E4405F] transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#1DA1F2] transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#0A66C2] transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#FF0000] transition-colors">
                  <span className="sr-only">YouTube</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">Contact</h3>
              <p className="mb-2 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white text-opacity-90">JP Nagar 8th Phase, Byrappa Layout, Bangalore – 560083</span> {/* Changed from text-neutral-300 */}
              </p>
              <p className="mb-2 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-white text-opacity-90">+91 8260028808</span> {/* Changed from text-neutral-300 */}
              </p>
              <p className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-opacity-90">info@houseofdreamsrealty.com</span> {/* Changed from text-neutral-300 */}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-white text-opacity-90 hover:text-primary transition-colors">Blog</Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-white text-opacity-90 hover:text-primary transition-colors">Privacy Policy</Link> {/* Changed from text-neutral-300 */}
                </li>
                <li>
                  <Link href="/cookie-policy" className="text-white text-opacity-90 hover:text-primary transition-colors">Cookie Policy</Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-white text-opacity-90 hover:text-primary transition-colors">Disclaimer</Link>
                </li>
                <li>
                  <Link href="/term-condtion" className="text-white text-opacity-90 hover:text-primary transition-colors">Terms & Conditions</Link> {/* Changed from text-neutral-300 */}
                </li>
                <li>
                  <a href="#" onClick={scrollToForm} className="text-white text-opacity-90 hover:text-primary transition-colors">Contact Us</a> {/* Changed from text-neutral-300 */}
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-6 text-center text-white text-opacity-80"> {/* Changed from text-neutral-400 and increased border opacity */}
            <p>&copy; {new Date().getFullYear()} Lakeside Luxury. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}