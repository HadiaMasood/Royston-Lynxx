'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Car, Sparkles, Check, MapPin, Calendar, Clock, Users, Briefcase, 
  Shield, ArrowRight, Search, FileText, CreditCard, ChevronRight, 
  ChevronDown, Phone, Mail, Plane, Anchor, Navigation, ThumbsUp, 
  AlertCircle, X, ExternalLink, Star, RefreshCw, HelpCircle, Landmark,
  Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';

import saloonTaxiImg from '@/src/assets/images/saloon_taxi_1783422678038.jpg';
import estateTaxiImg from '@/src/assets/images/estate_taxi_1783422697009.jpg';
import executiveTaxiImg from '@/src/assets/images/executive_taxi_1783422716940.jpg';
import mpvTaxiImg from '@/src/assets/images/mpv_taxi_1783422734567.jpg';
import minibusTaxiImg from '@/src/assets/images/minibus_taxi_1783422753567.jpg';
import MobileMenu from '@/components/MobileMenu';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[220px] rounded-2xl overflow-hidden border border-zinc-800 bg-[#0c0c0e] flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-gold/20 border-t-gold animate-spin"></div>
      <p className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase font-sans animate-pulse">Plotting route coordinates...</p>
    </div>
  )
});

// Predefined UK popular locations for Royston Lynxx transfers
const LOCATIONS = [
  { id: 'lhr', name: 'London Heathrow Airport (LHR)', type: 'airport', lat: 51.4700, lng: -0.4543, code: 'LHR' },
  { id: 'lgw', name: 'London Gatwick Airport (LGW)', type: 'airport', lat: 51.1537, lng: -0.1821, code: 'LGW' },
  { id: 'sou-apt', name: 'Southampton Airport (SOU)', type: 'airport', lat: 50.9503, lng: -1.3568, code: 'SOU' },
  { id: 'sou-port', name: 'Southampton Cruise Terminal (Seaport)', type: 'port', lat: 50.8982, lng: -1.4082, code: 'Cruise' },
  { id: 'lon-cent', name: 'London Central (Trafalgar Square)', type: 'city', lat: 51.5080, lng: -0.1281, code: 'London' },
  { id: 'sou-cent', name: 'Southampton City Centre', type: 'city', lat: 50.9097, lng: -1.4044, code: 'SOTON' },
  { id: 'winch', name: 'Winchester City Centre', type: 'city', lat: 51.0629, lng: -1.3148, code: 'WIN' },
  { id: 'bmh', name: 'Bournemouth Town Centre', type: 'city', lat: 50.7192, lng: -1.8808, code: 'BMH' },
  { id: 'stn', name: 'London Stansted Airport (STN)', type: 'airport', lat: 51.8860, lng: 0.2389, code: 'STN' },
  { id: 'ltn', name: 'London Luton Airport (LTN)', type: 'airport', lat: 51.8763, lng: -0.3718, code: 'LTN' },
];

// Popular routes showing standard start rates
const POPULAR_ROUTES = [
  { from: 'Southampton City Centre', to: 'London Heathrow Airport (LHR)', fromId: 'sou-cent', toId: 'lhr', price: '£110', time: '1h 15m' },
  { from: 'Southampton Cruise Terminal', to: 'London Gatwick Airport (LGW)', fromId: 'sou-port', toId: 'lgw', price: '£135', time: '1h 40m' },
  { from: 'Winchester City Centre', to: 'London Heathrow Airport (LHR)', fromId: 'winch', toId: 'lhr', price: '£95', time: '1h 00m' },
  { from: 'London Central', to: 'London Heathrow Airport (LHR)', fromId: 'lon-cent', toId: 'lhr', price: '£55', time: '50m' },
];

const FLEET = [
  {
    id: 'saloon',
    name: 'Standard Saloon',
    description: 'Perfect for everyday travel, solo passengers, or couples.',
    example: 'Toyota Prius, Skoda Octavia or similar',
    passengers: 4,
    luggage: 2,
    baseRate: 20,
    perMileRate: 1.8,
    badge: 'Eco Friendly',
    image: '🚗',
    imageUrl: saloonTaxiImg,
    features: ['Air Conditioning', 'USB Charging Ports', '4G LTE Free WiFi', 'Clean & Odourless'],
    class: 'Standard'
  },
  {
    id: 'estate',
    name: 'Estate Car',
    description: 'Extra luggage capacity for family holidays and longer trips.',
    example: 'Skoda Superb Estate, VW Passat or similar',
    passengers: 4,
    luggage: 4,
    baseRate: 28,
    perMileRate: 2.1,
    badge: 'Most Popular',
    image: '🚙',
    imageUrl: estateTaxiImg,
    features: ['Extra Boot Capacity', 'Dual Climate Control', 'Phone Charging Cables', 'Tinted Windows'],
    class: 'Comfort'
  },
  {
    id: 'executive',
    name: 'Executive Class',
    description: 'First-class corporate travel, business meetings, or luxury transfers.',
    example: 'Mercedes-Benz E-Class, BMW 5 Series or similar',
    passengers: 4,
    luggage: 3,
    baseRate: 45,
    perMileRate: 2.8,
    badge: 'Chauffeur Premium',
    image: '✨',
    imageUrl: executiveTaxiImg,
    features: ['Full Leather Interior', 'Complimentary Bottled Water', 'Silent Premium Ride', 'Newspaper / Magazines'],
    class: 'Business'
  },
  {
    id: 'mpv',
    name: 'MPV (6-Seater)',
    description: 'Spacious multi-purpose vehicle for larger families and groups.',
    example: 'Volkswagen Sharan, Ford Galaxy or similar',
    passengers: 6,
    luggage: 4,
    baseRate: 38,
    perMileRate: 2.6,
    badge: 'Group Choice',
    image: '🚐',
    imageUrl: mpvTaxiImg,
    features: ['Flexible Reclining Seats', 'Surround Climate Control', 'Dual Sliding Doors', 'Extra Legroom'],
    class: 'Group'
  },
  {
    id: 'minibus',
    name: '8-Seater Minibus',
    description: 'Ultimate capacity for tour groups, events, or massive baggage.',
    example: 'Ford Tourneo Custom, Mercedes Vito or similar',
    passengers: 8,
    luggage: 8,
    baseRate: 55,
    perMileRate: 3.2,
    badge: 'Maximum Space',
    image: '🚌',
    imageUrl: minibusTaxiImg,
    features: ['Conference Seating Option', 'Massive Luggage Hold', 'Individual AC Outlets', 'Premium Seating'],
    class: 'Max'
  }
];

const FAQS = [
  {
    q: 'How do I meet my driver at the airport?',
    a: 'We offer a professional "Meet & Greet" service. Your driver will wait for you in the arrivals hall with a printed tablet or greeting board displaying your name. You will also receive their live mobile number via SMS and email prior to landing.'
  },
  {
    q: 'What happens if my flight is delayed?',
    a: 'We monitor flight arrivals in real-time. If your flight is early or delayed, we automatically adjust your driver pickup slot at no additional charge to you.'
  },
  {
    q: 'Are your prices fixed or metered?',
    a: 'All our quoted prices are completely fixed. The price you see during booking is the exact price you pay. There are no surprise meters, peak-hour surges after booking, or toll-road surcharges.'
  },
  {
    q: 'Can I cancel or modify my booking?',
    a: 'Yes, absolutely! You can cancel or modify your booking completely free of charge up to 24 hours before your scheduled trip. You can do this directly from our booking tracking portal.'
  },
  {
    q: 'How much luggage can I bring?',
    a: 'Each vehicle class displays its maximum luggage bag allowance. Standard suitcases assume a medium check-in size (up to 23kg). If you have extra large bags, golf bags, or strollers, we highly recommend booking our Estate, MPV, or 8-Seater Minibus.'
  }
];

// Helper to calculate Haversine distance
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function Home() {
  // Navigation & Mode
  const [activeTab, setActiveTab] = useState<'book' | 'track'>('book');
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  // Storage of bookings
  const [bookings, setBookings] = useState<any[]>([]);
  
  // Track inputs
  const [trackRef, setTrackRef] = useState('');
  const [trackEmail, setTrackEmail] = useState('');
  const [trackError, setTrackError] = useState('');
  const [trackedBooking, setTrackedBooking] = useState<any | null>(null);

  // Booking Form State
  const [bookingStep, setBookingStep] = useState(1);
  const [routeType, setRouteType] = useState<'oneWay' | 'return'>('oneWay');
  const [pickupId, setPickupId] = useState('sou-cent');
  const [dropoffId, setDropoffId] = useState('lhr');
  const [pickupCustom, setPickupCustom] = useState('');
  const [dropoffCustom, setDropoffCustom] = useState('');
  const [isCustomPickup, setIsCustomPickup] = useState(false);
  const [isCustomDropoff, setIsCustomDropoff] = useState(false);
  
  const [pickupDate, setPickupDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [pickupTime, setPickupTime] = useState('12:00');
  const [returnDate, setReturnDate] = useState(() => {
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    const rYyyy = dayAfter.getFullYear();
    const rMm = String(dayAfter.getMonth() + 1).padStart(2, '0');
    const rDd = String(dayAfter.getDate()).padStart(2, '0');
    return `${rYyyy}-${rMm}-${rDd}`;
  });
  const [returnTime, setReturnTime] = useState('12:00');
  
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);

  const [selectedVehicle, setSelectedVehicle] = useState<string>('saloon');

  // Customer Contact Details
  const [passengerName, setPassengerName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [specialRemarks, setSpecialRemarks] = useState('');

  // Payment State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [generatedReference, setGeneratedReference] = useState('');
  const [lastCompletedBooking, setLastCompletedBooking] = useState<any | null>(null);
  const [receiptBooking, setReceiptBooking] = useState<any | null>(null);

  interface RecentRoute {
    pickupId: string;
    isCustomPickup: boolean;
    pickupCustom: string;
    dropoffId: string;
    isCustomDropoff: boolean;
    dropoffCustom: string;
    pickupName: string;
    dropoffName: string;
    timestamp: number;
  }

  const [recentRoutes, setRecentRoutes] = useState<RecentRoute[]>([]);

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // General Notification
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Fleet Selection Search & Filter State
  const [fleetSearchQuery, setFleetSearchQuery] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Weather State for Southampton
  const [weatherData, setWeatherData] = useState<{
    currentTemp: number;
    weatherCode: number;
    isDay: boolean;
    windSpeed: number;
    forecast: Array<{
      date: string;
      maxTemp: number;
      minTemp: number;
      weatherCode: number;
    }>;
  } | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=50.9097&longitude=-1.4044&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe/London"
        );
        if (!res.ok) throw new Error("Weather fetch failed");
        const data = await res.json();
        if (active && data && data.current_weather) {
          const forecastList = [];
          if (data.daily && data.daily.time) {
            for (let i = 0; i < Math.min(4, data.daily.time.length); i++) {
              forecastList.push({
                date: data.daily.time[i],
                maxTemp: data.daily.temperature_2m_max[i],
                minTemp: data.daily.temperature_2m_min[i],
                weatherCode: data.daily.weathercode[i],
              });
            }
          }
          setWeatherData({
            currentTemp: Math.round(data.current_weather.temperature),
            weatherCode: data.current_weather.weathercode,
            isDay: data.current_weather.is_day === 1,
            windSpeed: Math.round(data.current_weather.windspeed),
            forecast: forecastList,
          });
          setWeatherError(false);
        }
      } catch (err) {
        console.error("Error fetching weather:", err);
        if (active) {
          setWeatherError(true);
        }
      } finally {
        if (active) {
          setWeatherLoading(false);
        }
      }
    };
    fetchWeather();
    return () => {
      active = false;
    };
  }, []);

  const getWeatherIcon = (code: number, isDay: boolean = true, className: string = "w-5 h-5") => {
    if (code === 0) {
      return isDay ? <Sun className={`${className} text-amber-400 animate-pulse`} /> : <Moon className={`${className} text-indigo-400`} />;
    }
    if ([1, 2, 3].includes(code)) {
      return <Cloud className={`${className} text-zinc-400`} />;
    }
    if ([45, 48].includes(code)) {
      return <Cloud className={`${className} text-zinc-500`} />;
    }
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
      return <CloudRain className={`${className} text-blue-400`} />;
    }
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      return <CloudSnow className={`${className} text-sky-200`} />;
    }
    if ([95, 96, 99].includes(code)) {
      return <CloudLightning className={`${className} text-yellow-400`} />;
    }
    return <Sun className={`${className} text-amber-400`} />;
  };

  const getWeatherDesc = (code: number) => {
    if (code === 0) return 'Sunny / Clear';
    if (code === 1) return 'Mainly Clear';
    if (code === 2) return 'Partly Cloudy';
    if (code === 3) return 'Overcast';
    if ([45, 48].includes(code)) return 'Foggy Conditions';
    if ([51, 53, 55].includes(code)) return 'Light Drizzle';
    if ([61, 63, 65].includes(code)) return 'Rainy Showers';
    if ([71, 73, 75].includes(code)) return 'Snow Flurries';
    if ([80, 81, 82].includes(code)) return 'Rain Showers';
    if ([95, 96, 99].includes(code)) return 'Thunderstorms';
    return 'Overcast';
  };

  const formatDayName = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-GB', { weekday: 'short' });
    } catch (e) {
      return dateString;
    }
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('roystonlynxx_dark_mode', String(next));
      return next;
    });
  };

  // Read stored bookings and recent routes on mount
  useEffect(() => {
    let recentTimer: NodeJS.Timeout | null = null;
    let bookingsTimer: NodeJS.Timeout | null = null;
    let themeTimer: NodeJS.Timeout | null = null;

    const storedDarkMode = localStorage.getItem('roystonlynxx_dark_mode') || localStorage.getItem('quickhop_dark_mode');
    if (storedDarkMode !== null) {
      themeTimer = setTimeout(() => {
        setIsDarkMode(storedDarkMode === 'true');
      }, 0);
    }

    const storedRecent = localStorage.getItem('roystonlynxx_recent_routes') || localStorage.getItem('quickhop_recent_routes');
    if (storedRecent) {
      try {
        const parsed = JSON.parse(storedRecent);
        recentTimer = setTimeout(() => {
          setRecentRoutes(parsed);
        }, 0);
      } catch (e) {
        console.error(e);
      }
    }

    const stored = localStorage.getItem('roystonlynxx_bookings') || localStorage.getItem('quickhop_bookings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        bookingsTimer = setTimeout(() => {
          setBookings(parsed);
        }, 0);
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      if (recentTimer) clearTimeout(recentTimer);
      if (bookingsTimer) clearTimeout(bookingsTimer);
      if (themeTimer) clearTimeout(themeTimer);
    };
  }, []);

  // Parse URL search parameters to pre-populate booking fields
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pId = params.get('pickup');
      const dId = params.get('dropoff');
      const vehId = params.get('vehicle');
      
      const timer = setTimeout(() => {
        if (pId) {
          setPickupId(pId);
          setIsCustomPickup(false);
        }
        if (dId) {
          setDropoffId(dId);
          setIsCustomDropoff(false);
        }
        if (vehId) {
          setSelectedVehicle(vehId);
        }
        
        // If query parameters are present, scroll to the booking section
        if (pId || dId || vehId) {
          const element = document.getElementById('booking-portal');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  // Calculate distance & travel duration directly during render!
  // This avoids calling state updates inside useEffect.
  const getCoordinates = (id: string, isCustom: boolean, customVal: string) => {
    let lat = 50.9097, lng = -1.4044; // Southampton default
    if (!isCustom) {
      const loc = LOCATIONS.find(l => l.id === id);
      if (loc) {
        lat = loc.lat;
        lng = loc.lng;
      }
    } else {
      // Stable pseudo-coordinates from custom string hash
      let hash = 0;
      const cleanVal = customVal || 'Custom Address';
      for (let i = 0; i < cleanVal.length; i++) {
        hash = cleanVal.charCodeAt(i) + ((hash << 5) - hash);
      }
      lat = 50.90 + (Math.abs(hash % 100) / 1000);
      lng = -1.40 + (Math.abs((hash >> 8) % 100) / 1000);
    }
    return { lat, lng };
  };

  const pCoords = getCoordinates(pickupId, isCustomPickup, pickupCustom);
  const dCoords = getCoordinates(dropoffId, isCustomDropoff, dropoffCustom);
  const straightDist = calculateDistance(pCoords.lat, pCoords.lng, dCoords.lat, dCoords.lng);
  const distance = Math.max(3, Math.round(straightDist * 1.3 * 10) / 10);
  const duration = Math.max(10, Math.round((distance / 42) * 60) + 10);

  // Helper to retrieve location display name
  const getLocName = (id: string, isCustom: boolean, customVal: string) => {
    if (isCustom) return customVal || 'Custom Address';
    return LOCATIONS.find(l => l.id === id)?.name || 'Unknown Location';
  };

  // Helper to calculate total price for a vehicle
  const calculatePrice = (vehicle: typeof FLEET[0]) => {
    let price = vehicle.baseRate + (distance * vehicle.perMileRate);
    if (routeType === 'return') {
      price = price * 1.85; // 15% discount on return leg
    }
    return Math.round(price);
  };

  const selectedVehicleDetails = FLEET.find(v => v.id === selectedVehicle) || FLEET[0];
  const totalPrice = calculatePrice(selectedVehicleDetails);

  // Filtered fleet for Step 2 selection
  const filteredFleet = FLEET.filter(vehicle => {
    // 1. Text Search query
    if (fleetSearchQuery.trim() !== '') {
      const q = fleetSearchQuery.toLowerCase();
      const matchesName = vehicle.name.toLowerCase().includes(q);
      const matchesDescription = vehicle.description.toLowerCase().includes(q);
      const matchesExample = vehicle.example.toLowerCase().includes(q);
      const matchesClass = vehicle.class.toLowerCase().includes(q);
      const matchesFeatures = vehicle.features.some(f => f.toLowerCase().includes(q));
      
      if (!matchesName && !matchesDescription && !matchesExample && !matchesClass && !matchesFeatures) {
        return false;
      }
    }

    // 2. Selected Feature Tags
    if (selectedFeatures.length > 0) {
      for (const reqFeature of selectedFeatures) {
        const hasFeature = vehicle.features.some(f => {
          const fNorm = f.toLowerCase();
          const reqNorm = reqFeature.toLowerCase();
          return fNorm.includes(reqNorm) || reqNorm.includes(fNorm);
        });
        if (!hasFeature) return false;
      }
    }

    return true;
  });

  // Trigger quick booking fill from popular routes cards
  const handleQuickBook = (fromId: string, toId: string) => {
    setPickupId(fromId);
    setDropoffId(toId);
    setIsCustomPickup(false);
    setIsCustomDropoff(false);
    setBookingStep(1);
    setActiveTab('book');
    const heroElement = document.getElementById('booking-portal');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setAlertMsg({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    try {
      const storedEmails = localStorage.getItem('roystonlynxx_newsletter_subscribers') || localStorage.getItem('quickhop_newsletter_subscribers');
      let subscribers: string[] = [];
      if (storedEmails) {
        subscribers = JSON.parse(storedEmails);
      }
      if (!subscribers.includes(newsletterEmail.trim().toLowerCase())) {
        subscribers.push(newsletterEmail.trim().toLowerCase());
        localStorage.setItem('roystonlynxx_newsletter_subscribers', JSON.stringify(subscribers));
      }
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setAlertMsg({ type: 'success', text: 'Thank you for subscribing to our newsletter!' });
      setTimeout(() => {
        setNewsletterSuccess(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      setAlertMsg({ type: 'error', text: 'Could not complete subscription. Please try again.' });
    }
  };

  const saveRecentRoute = (pId: string, isPClass: boolean, pCust: string, dId: string, isDClass: boolean, dCust: string) => {
    const pName = getLocName(pId, isPClass, pCust);
    const dName = getLocName(dId, isDClass, dCust);

    // Create a unique key/signature for this route to prevent duplicates
    const signature = `${isPClass ? pCust.trim().toLowerCase() : pId} -> ${isDClass ? dCust.trim().toLowerCase() : dId}`;

    const newRoute: RecentRoute = {
      pickupId: pId,
      isCustomPickup: isPClass,
      pickupCustom: pCust,
      dropoffId: dId,
      isCustomDropoff: isDClass,
      dropoffCustom: dCust,
      pickupName: pName,
      dropoffName: dName,
      timestamp: Date.now()
    };

    setRecentRoutes(prev => {
      // Filter out existing matching route (ignoring casing or custom/preset details)
      const filtered = prev.filter(r => {
        const rSig = `${r.isCustomPickup ? r.pickupCustom.trim().toLowerCase() : r.pickupId} -> ${r.isCustomDropoff ? r.dropoffCustom.trim().toLowerCase() : r.dropoffId}`;
        return rSig !== signature;
      });

      const updated = [newRoute, ...filtered].slice(0, 5);
      localStorage.setItem('roystonlynxx_recent_routes', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelectRecentRoute = (route: RecentRoute) => {
    setPickupId(route.pickupId);
    setIsCustomPickup(route.isCustomPickup);
    setPickupCustom(route.pickupCustom);
    setDropoffId(route.dropoffId);
    setIsCustomDropoff(route.isCustomDropoff);
    setDropoffCustom(route.dropoffCustom);
    setAlertMsg({ type: 'success', text: `Selected route: ${route.pickupName} ➔ ${route.dropoffName}` });
  };

  // Stepper Handlers
  const handleNextStep = () => {
    if (bookingStep === 1) {
      // Validate locations
      if (isCustomPickup && !pickupCustom.trim()) {
        setAlertMsg({ type: 'error', text: 'Please enter your custom pickup address.' });
        return;
      }
      if (isCustomDropoff && !dropoffCustom.trim()) {
        setAlertMsg({ type: 'error', text: 'Please enter your custom dropoff address.' });
        return;
      }
      if (!pickupDate) {
        setAlertMsg({ type: 'error', text: 'Please select a pickup date.' });
        return;
      }
      if (routeType === 'return' && !returnDate) {
        setAlertMsg({ type: 'error', text: 'Please select a return date.' });
        return;
      }
      // Save route to recent routes history
      saveRecentRoute(pickupId, isCustomPickup, pickupCustom, dropoffId, isCustomDropoff, dropoffCustom);
      setBookingStep(2);
    } else if (bookingStep === 2) {
      // Ensure passengers matches vehicle capacity
      const veh = FLEET.find(v => v.id === selectedVehicle) || FLEET[0];
      if (passengers > veh.passengers) {
        setAlertMsg({ type: 'error', text: `Selected ${veh.name} fits max ${veh.passengers} passengers. Please adjust your passenger count or choose a larger vehicle.` });
        return;
      }
      if (luggage > veh.luggage) {
        setAlertMsg({ type: 'error', text: `Selected ${veh.name} fits max ${veh.luggage} luggage bags. Please choose a larger vehicle for your luggage.` });
        return;
      }
      setBookingStep(3);
    } else if (bookingStep === 3) {
      // Validate customer info
      if (!passengerName.trim()) {
        setAlertMsg({ type: 'error', text: 'Please enter the passenger name.' });
        return;
      }
      if (!passengerEmail.trim() || !passengerEmail.includes('@')) {
        setAlertMsg({ type: 'error', text: 'Please enter a valid passenger email.' });
        return;
      }
      if (!passengerPhone.trim()) {
        setAlertMsg({ type: 'error', text: 'Please enter a contact phone number.' });
        return;
      }
      setBookingStep(4);
    }
    setAlertMsg(null);
  };

  const handlePrevStep = () => {
    if (bookingStep > 1) {
      setBookingStep(prev => prev - 1);
    }
  };

  // Submit and Save Booking to LocalStorage
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber.trim() || !cardName.trim() || !cardExpiry.trim() || !cardCvc.trim()) {
      setAlertMsg({ type: 'error', text: 'Please fill in all credit card payment details.' });
      return;
    }

    setPaymentProcessing(true);
    setAlertMsg(null);

    // Simulate Payment delay
    setTimeout(() => {
      const ref = `QH-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const newBooking = {
        ref,
        routeType,
        pickup: getLocName(pickupId, isCustomPickup, pickupCustom),
        dropoff: getLocName(dropoffId, isCustomDropoff, dropoffCustom),
        pickupDate,
        pickupTime,
        returnDate: routeType === 'return' ? returnDate : null,
        returnTime: routeType === 'return' ? returnTime : null,
        passengers,
        luggage,
        vehicleClass: selectedVehicleDetails.name,
        vehicleImage: selectedVehicleDetails.image,
        price: totalPrice,
        passengerName,
        passengerEmail,
        passengerPhone,
        flightNumber,
        specialRemarks,
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      };

      const updatedBookings = [newBooking, ...bookings];
      localStorage.setItem('roystonlynxx_bookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      
      setGeneratedReference(ref);
      setLastCompletedBooking(newBooking);
      setReceiptBooking(newBooking);
      setBookingStep(5);
      setPaymentProcessing(false);
      
      // Auto-fill track state so they can instantly view it if wanted
      setTrackRef(ref);
      setTrackEmail(passengerEmail);
    }, 1500);
  };

  // Tracking Journey Logic
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError('');
    setTrackedBooking(null);

    if (!trackRef.trim() || !trackEmail.trim()) {
      setTrackError('Please fill in both the booking reference and email address.');
      return;
    }

    const found = bookings.find(
      b => b.ref.toUpperCase() === trackRef.trim().toUpperCase() && 
           b.passengerEmail.toLowerCase() === trackEmail.trim().toLowerCase()
    );

    if (found) {
      setTrackedBooking(found);
    } else {
      setTrackError('No active booking found matching those details. Note: If you just reloaded, any test bookings are stored in your local browser state.');
    }
  };

  const handleCancelBooking = (ref: string) => {
    if (confirm('Are you sure you want to cancel this booking? There is zero cancellation fee.')) {
      const updated = bookings.map(b => {
        if (b.ref === ref) {
          return { ...b, status: 'Cancelled' };
        }
        return b;
      });
      localStorage.setItem('roystonlynxx_bookings', JSON.stringify(updated));
      setBookings(updated);
      
      if (trackedBooking && trackedBooking.ref === ref) {
        setTrackedBooking({ ...trackedBooking, status: 'Cancelled' });
      }
      
      setAlertMsg({ type: 'success', text: 'Booking successfully cancelled. Ref: ' + ref });
    }
  };

  const resetBookingFlow = () => {
    setBookingStep(1);
    setPassengerName('');
    setPassengerEmail('');
    setPassengerPhone('');
    setFlightNumber('');
    setSpecialRemarks('');
    setCardNumber('');
    setCardName('');
    setCardExpiry('');
    setCardCvc('');
    setGeneratedReference('');
    setLastCompletedBooking(null);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#09090b] text-zinc-100' : 'light bg-[#faf9f6] text-zinc-900'} font-sans antialiased flex flex-col`}>
      {/* 24/7 Hotline Banner */}
      <div className="bg-[#121215] border-b border-zinc-800 py-2 px-4 text-xs font-medium text-zinc-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-zinc-400">Fixed rates guaranteed, no surge charge on flight delay tracking.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+442380000000" className="flex items-center gap-1 hover:text-gold transition text-zinc-300">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>+44 (0) 23 8000 0000</span>
            </a>
            <a href="mailto:bookings@roystonlynxx.co.uk" className="flex items-center gap-1 hover:text-gold transition text-zinc-300">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span>bookings@roystonlynxx.co.uk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur shadow-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab('book'); resetBookingFlow(); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-black shadow-md shadow-amber-950/20">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Royston <span className="text-gold">Lynxx</span>
              </span>
              <span className="text-[10px] block text-gold-300 font-mono tracking-wider -mt-1 font-bold">UK AIRPORT TRANSFERS</span>
            </div>
          </div>

          <MobileMenu />
          <nav className="hidden lg:flex items-center gap-5">
            <Link href="/" className="text-xs font-bold text-gold transition uppercase tracking-wider">Home</Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button 
                type="button"
                className="text-xs font-bold text-zinc-400 hover:text-gold transition uppercase tracking-wider flex items-center gap-1 py-2 cursor-pointer focus:outline-none"
              >
                <span>Services</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-gold' : ''}`} />
              </button>
              
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-1 w-56 rounded-xl bg-[#0e0e11] border border-zinc-800 p-2 shadow-xl z-50 animate-in fade-in duration-200"
                  >
                    <Link 
                      href="/services/airport-transfers" 
                      className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition"
                    >
                      <Plane className="w-3.5 h-3.5 text-gold" />
                      <span>Airport Transfers</span>
                    </Link>
                    <Link 
                      href="/services/seaport-transfers" 
                      className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition"
                    >
                      <Anchor className="w-3.5 h-3.5 text-gold" />
                      <span>Cruise Seaports</span>
                    </Link>
                    <Link 
                      href="/services/executive-travel" 
                      className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      <span>Executive Travel</span>
                    </Link>
                    <Link 
                      href="/services/long-distance" 
                      className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition"
                    >
                      <Car className="w-3.5 h-3.5 text-gold" />
                      <span>Long Distance Taxis</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="text-xs font-bold text-zinc-400 hover:text-gold transition uppercase tracking-wider">About Us</Link>
            <Link href="/contact" className="text-xs font-bold text-zinc-400 hover:text-gold transition uppercase tracking-wider">Contact Us</Link>
            <Link href="/ride-with-us" className="text-xs font-bold text-zinc-400 hover:text-gold transition uppercase tracking-wider">Ride with Us</Link>
            
            <Link href="/#fleet" className="text-xs font-bold text-zinc-400 hover:text-gold transition uppercase tracking-wider">Fleet</Link>
            <Link href="/#faqs" className="text-xs font-bold text-zinc-400 hover:text-gold transition uppercase tracking-wider font-mono">FAQs</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2 h-9 w-9 rounded-lg border border-zinc-800 hover:border-gold text-zinc-400 hover:text-gold transition flex items-center justify-center cursor-pointer bg-transparent focus:outline-none"
              aria-label="Toggle theme"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400 animate-pulse" /> : <Moon className="w-4.5 h-4.5 text-indigo-500" />}
            </button>
            <button 
              type="button"
              onClick={() => { setActiveTab('track'); setTrackedBooking(null); setTrackError(''); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition border ${activeTab === 'track' ? 'bg-[#121215] text-gold border-zinc-700' : 'text-zinc-300 border-zinc-800 hover:bg-[#121215]'}`}
            >
              Track Trip
            </button>
            <a 
              href="#booking-portal" 
              onClick={() => { setActiveTab('book'); resetBookingFlow(); }}
              className="bg-gold hover:bg-gold-light text-black text-xs font-bold px-4 py-2.5 rounded-lg transition shadow-md shadow-gold/10"
            >
              Book Transfer
            </a>
          </div>
        </div>
      </header>

      {/* Alert Notifications */}
      {alertMsg && (
        <div className={`py-3 px-4 text-center text-sm font-medium flex items-center justify-center gap-2 border-b transition-all ${alertMsg.type === 'error' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{alertMsg.text}</span>
          <button onClick={() => setAlertMsg(null)} className="ml-2 hover:opacity-80 p-0.5"><X className="w-3 h-3" /></button>
        </div>
      )}

      {/* Hero with Booking Portal */}
      <section className="relative overflow-hidden bg-[#09090b] text-white py-12 lg:py-20" id="booking-portal">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Pitch Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-gold text-xs font-semibold rounded-full border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reliable 5-Star UK Cab Transfer</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display leading-[1.1] text-white">
              Airport Transfers <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Made Simple & Swift.</span>
            </h1>
            
            <p className="text-base text-zinc-300 leading-relaxed max-w-lg">
              Enjoy fixed, competitive rates and dynamic, custom-tailored fleets. We specialise in taxi transfers to and from London Heathrow, Gatwick, Luton, Southampton Airport, and Southampton Cruise Terminal.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500/10 text-gold flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">Free Flight Tracking</h4>
                  <p className="text-[11px] text-zinc-400">No extra delay charges</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500/10 text-gold flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">Meet & Greet Included</h4>
                  <p className="text-[11px] text-zinc-400">Friendly professional drivers</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500/10 text-gold flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">No Hidden Fees</h4>
                  <p className="text-[11px] text-zinc-400">Quoted price is absolute</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500/10 text-gold flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">24/7 Direct Hotline</h4>
                  <p className="text-[11px] text-zinc-400">Constant phone support</p>
                </div>
              </div>
            </div>

            {/* Testimonial Snippet */}
            <div className="p-4 bg-[#121215]/60 rounded-xl border border-zinc-800 max-w-md">
              <div className="flex items-center gap-1 text-gold mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-xs text-zinc-300 italic">
                &quot;Driver was waiting at LHR terminal with my name on an iPad. Smooth, brand new Skoda Superb, amazing journey back to Southampton. Will book again.&quot;
              </p>
              <span className="text-[10px] block text-zinc-400 mt-2 font-semibold">— Dr. Michael G., Southampton University</span>
            </div>

            {/* Southampton Live Weather Widget */}
            <div className="p-4 bg-[#121215]/80 backdrop-blur rounded-2xl border border-zinc-800/85 max-w-md space-y-3.5 shadow-lg shadow-black/40">
              <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase font-mono">Southampton Conditions</span>
                </div>
                <span className="text-[10px] font-mono text-gold font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full">
                  HQ Live
                </span>
              </div>

              {weatherLoading ? (
                <div className="flex items-center justify-center py-4 gap-2 text-zinc-500 text-xs font-medium">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-gold" />
                  <span>Loading Southampton weather...</span>
                </div>
              ) : weatherError || !weatherData ? (
                <div className="flex items-center justify-center py-3 text-zinc-500 text-xs gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500/80" />
                  <span>Weather details offline. Flight trackers active.</span>
                </div>
              ) : (
                <div className="flex flex-col md:grid md:grid-cols-12 gap-3 items-center">
                  {/* Current conditions left */}
                  <div className="md:col-span-5 flex items-center gap-2.5">
                    <div className="p-2 bg-zinc-900/80 border border-zinc-850 rounded-xl text-gold shrink-0">
                      {getWeatherIcon(weatherData.weatherCode, weatherData.isDay)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl font-extrabold text-white tracking-tight leading-none font-mono flex items-start">
                        {weatherData.currentTemp}<span className="text-xs text-gold font-light mt-0.5">°C</span>
                      </div>
                      <div className="text-[10px] text-zinc-400 font-medium truncate mt-1">
                        {getWeatherDesc(weatherData.weatherCode)}
                      </div>
                    </div>
                  </div>

                  {/* Forecast cards */}
                  <div className="md:col-span-7 grid grid-cols-3 gap-1.5 border-t md:border-t-0 border-zinc-800/80 pt-3 md:pt-0 md:border-l md:pl-3">
                    {weatherData.forecast.slice(1, 4).map((day, idx) => (
                      <div key={idx} className="bg-zinc-900/40 border border-zinc-900/80 rounded-lg p-1.5 text-center flex flex-col items-center justify-between">
                        <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider block leading-none mb-1">
                          {formatDayName(day.date)}
                        </span>
                        <div className="text-zinc-400 my-0.5">
                          {getWeatherIcon(day.weatherCode, true, "w-3.5 h-3.5")}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-white leading-none mt-1">
                          {Math.round(day.maxTemp)}°
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-[10px] text-zinc-500 leading-tight flex items-center gap-1.5 pt-1 border-t border-zinc-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>Perfect conditions for travel bookings & airport connections.</span>
              </div>
            </div>
          </div>

          {/* Booking / Tracking Widget Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7 bg-[#121215] text-zinc-100 rounded-3xl shadow-xl overflow-hidden border border-zinc-800"
          >
            <div className="flex border-b border-zinc-800 bg-[#0a0a0c]">
              <button 
                onClick={() => { setActiveTab('book'); }}
                className={`flex-1 py-4 text-center font-display text-sm font-bold flex items-center justify-center gap-2 transition ${activeTab === 'book' ? 'bg-[#121215] text-gold border-b-2 border-gold' : 'text-zinc-400 hover:text-zinc-100'}`}
              >
                <Car className="w-4 h-4 text-gold" />
                <span>Instant Taxi Booking</span>
              </button>
              <button 
                onClick={() => { setActiveTab('track'); }}
                className={`flex-1 py-4 text-center font-display text-sm font-bold flex items-center justify-center gap-2 transition ${activeTab === 'track' ? 'bg-[#121215] text-gold border-b-2 border-gold' : 'text-zinc-400 hover:text-zinc-100'}`}
              >
                <Search className="w-4 h-4 text-gold" />
                <span>Manage My Trip</span>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {activeTab === 'book' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Stepper Header */}
                  <div className="relative flex justify-between items-center mb-8">
                    {/* Progress Bar Track Container */}
                    <div className="absolute left-4 right-4 h-0.5 z-0" style={{ top: 'calc(50% - 1px)' }}>
                      <div className={`w-full h-full ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-250'} relative rounded-full`}>
                        <motion.div 
                          className="absolute left-0 top-0 h-full bg-gold rounded-full origin-left"
                          initial={{ width: '0%' }}
                          animate={{ width: `${((bookingStep - 1) / 4) * 100}%` }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>

                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${bookingStep >= s ? 'bg-gold text-black scale-110 shadow-md shadow-gold/20' : (isDarkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-200 text-zinc-400')}`}>
                          {bookingStep > s ? <Check className="w-4 h-4" /> : s}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Step 1: Trip Details */}
                  {bookingStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-5"
                    >
                      <div className="flex justify-center p-1 bg-[#0a0a0c] border border-zinc-800 rounded-xl">
                        <button 
                          onClick={() => setRouteType('oneWay')}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${routeType === 'oneWay' ? 'bg-gold text-black shadow' : 'text-zinc-400 hover:text-white'}`}
                        >
                          One-Way Journey
                        </button>
                        <button 
                          onClick={() => setRouteType('return')}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${routeType === 'return' ? 'bg-gold text-black shadow' : 'text-zinc-400 hover:text-white'}`}
                        >
                          Return (Round Trip)
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Pickup Address */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-zinc-300 block">From (Pickup Location)</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-emerald-500" />
                            {isCustomPickup ? (
                              <input 
                                type="text"
                                placeholder="Enter street, postcode, hotel name..."
                                value={pickupCustom}
                                onChange={(e) => setPickupCustom(e.target.value)}
                                className="w-full pl-9 pr-24 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                              />
                            ) : (
                              <select 
                                value={pickupId}
                                onChange={(e) => setPickupId(e.target.value)}
                                className="w-full pl-9 pr-24 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold appearance-none"
                              >
                                {LOCATIONS.map(loc => (
                                  <option key={loc.id} value={loc.id} className="bg-[#09090b] text-white">{loc.name}</option>
                                ))}
                              </select>
                            )}
                            <button 
                              type="button"
                              onClick={() => setIsCustomPickup(!isCustomPickup)}
                              className="absolute right-3 top-2 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-zinc-300 rounded-lg transition"
                            >
                              {isCustomPickup ? 'Quick List' : 'Custom Addr'}
                            </button>
                          </div>
                        </div>

                        {/* Dropoff Address */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-zinc-300 block">To (Dropoff Location)</label>
                          <div className="relative">
                            <Navigation className="absolute left-3 top-3 w-4 h-4 text-rose-500" />
                            {isCustomDropoff ? (
                              <input 
                                type="text"
                                placeholder="Enter airport, cruise pier, city..."
                                value={dropoffCustom}
                                onChange={(e) => setDropoffCustom(e.target.value)}
                                className="w-full pl-9 pr-24 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                              />
                            ) : (
                              <select 
                                value={dropoffId}
                                onChange={(e) => setDropoffId(e.target.value)}
                                className="w-full pl-9 pr-24 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold appearance-none"
                              >
                                {LOCATIONS.map(loc => (
                                  <option key={loc.id} value={loc.id} className="bg-[#09090b] text-white">{loc.name}</option>
                                ))}
                              </select>
                            )}
                            <button 
                              type="button"
                              onClick={() => setIsCustomDropoff(!isCustomDropoff)}
                              className="absolute right-3 top-2 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-zinc-300 rounded-lg transition"
                            >
                              {isCustomDropoff ? 'Quick List' : 'Custom Addr'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Recent Routes (Local Storage) */}
                      {recentRoutes.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="p-3 bg-[#09090b] rounded-2xl border border-zinc-800/80 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                              <RefreshCw className="w-3.5 h-3.5 text-gold animate-[spin_4s_linear_infinite]" />
                              Recent Routes
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setRecentRoutes([]);
                                localStorage.removeItem('roystonlynxx_recent_routes');
                                localStorage.removeItem('quickhop_recent_routes');
                              }}
                              className="text-[10px] text-zinc-500 hover:text-rose-400 font-medium transition cursor-pointer"
                            >
                              Clear History
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {recentRoutes.map((route, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleSelectRecentRoute(route)}
                                className="w-full text-left p-2 bg-[#121215] hover:bg-amber-500/5 border border-zinc-800 hover:border-gold/50 rounded-xl transition flex items-center justify-between group cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold/30"
                              >
                                <div className="truncate pr-2">
                                  <div className="text-[11px] font-bold text-zinc-200 group-hover:text-gold transition truncate flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                                    {route.pickupName}
                                  </div>
                                  <div className="text-[10px] text-zinc-500 truncate flex items-center gap-1 pl-2.5">
                                    <span className="text-zinc-600">➔</span>
                                    <span className="truncate">{route.dropoffName}</span>
                                  </div>
                                </div>
                                <div className="text-[9px] bg-zinc-800 text-zinc-400 group-hover:bg-gold group-hover:text-black font-mono font-bold px-1.5 py-0.5 rounded-md shrink-0 transition">
                                  Quick Fill
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Dates & Times */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-zinc-300 block">Outbound Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                            <input 
                              type="date"
                              value={pickupDate}
                              onChange={(e) => setPickupDate(e.target.value)}
                              className="w-full pl-9 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold [color-scheme:dark]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-zinc-300 block">Outbound Pickup Time</label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                            <input 
                              type="time"
                              value={pickupTime}
                              onChange={(e) => setPickupTime(e.target.value)}
                              className="w-full pl-9 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold [color-scheme:dark]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Return Trip inputs */}
                      {routeType === 'return' && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/20 grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gold block">Return Date</label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gold" />
                              <input 
                                type="date"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                className="w-full pl-9 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold [color-scheme:dark]"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gold block">Return Pickup Time</label>
                            <div className="relative">
                              <Clock className="absolute left-3 top-3 w-4 h-4 text-gold" />
                              <input 
                                type="time"
                                value={returnTime}
                                onChange={(e) => setReturnTime(e.target.value)}
                                className="w-full pl-9 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold [color-scheme:dark]"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Passengers & Suitcases */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-zinc-300 block">Passengers</label>
                          <div className="flex items-center gap-1">
                            <button 
                              type="button"
                              onClick={() => setPassengers(Math.max(1, passengers - 1))}
                              className="w-10 h-10 border border-zinc-800 rounded-lg flex items-center justify-center font-bold text-lg hover:bg-zinc-800 text-white transition bg-[#09090b]"
                            >
                              -
                            </button>
                            <div className="flex-1 text-center font-mono font-bold py-2.5 border border-zinc-800 rounded-lg text-sm bg-[#0a0a0c] text-white">
                              {passengers} Pass
                            </div>
                            <button 
                              type="button"
                              onClick={() => setPassengers(Math.min(8, passengers + 1))}
                              className="w-10 h-10 border border-zinc-800 rounded-lg flex items-center justify-center font-bold text-lg hover:bg-zinc-800 text-white transition bg-[#09090b]"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-zinc-300 block">Suitcases / Bags</label>
                          <div className="flex items-center gap-1">
                            <button 
                              type="button"
                              onClick={() => setLuggage(Math.max(0, luggage - 1))}
                              className="w-10 h-10 border border-zinc-800 rounded-lg flex items-center justify-center font-bold text-lg hover:bg-zinc-800 text-white transition bg-[#09090b]"
                            >
                              -
                            </button>
                            <div className="flex-1 text-center font-mono font-bold py-2.5 border border-zinc-800 rounded-lg text-sm bg-[#0a0a0c] text-white">
                              {luggage} Bags
                            </div>
                            <button 
                              type="button"
                              onClick={() => setLuggage(Math.min(8, luggage + 1))}
                              className="w-10 h-10 border border-zinc-800 rounded-lg flex items-center justify-center font-bold text-lg hover:bg-zinc-800 text-white transition bg-[#09090b]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Live Map Visualizer */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-300 block">Visual Route Preview (OpenStreetMap)</label>
                        <div className="h-[220px] w-full rounded-2xl overflow-hidden border border-zinc-800">
                          <MapComponent 
                            pickupLat={pCoords.lat}
                            pickupLng={pCoords.lng}
                            pickupName={getLocName(pickupId, isCustomPickup, pickupCustom)}
                            dropoffLat={dCoords.lat}
                            dropoffLng={dCoords.lng}
                            dropoffName={getLocName(dropoffId, isCustomDropoff, dropoffCustom)}
                          />
                        </div>
                      </div>

                      {/* Distance summary notification */}
                      <div className="p-3.5 bg-[#09090b] rounded-2xl flex justify-between items-center text-xs text-zinc-400 border border-zinc-800/80 font-mono">
                        <div className="flex items-center gap-2">
                          <CompassIcon className="w-4 h-4 text-gold animate-spin" />
                          <span>Road Route Est:</span>
                          <strong className="text-gold font-bold">{distance} miles</strong>
                        </div>
                        <div className="text-right">
                          <span>Est. Duration:</span>
                          <strong className="text-gold font-bold ml-1">~{duration} mins</strong>
                        </div>
                      </div>

                      <button 
                        onClick={handleNextStep}
                        className="w-full bg-gold hover:bg-gold-light text-black font-bold py-3 px-6 rounded-2xl transition shadow-lg shadow-gold/10 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Calculate Fare & Choose Vehicle</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Choose Vehicle */}
                  {bookingStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-5"
                    >
                      <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                        <h3 className="font-display font-bold text-base text-white">Select Your Taxi Class</h3>
                        <span className="text-xs font-semibold text-gold">{distance} miles Outbound</span>
                      </div>

                      {/* Search and feature filters */}
                      <div className="space-y-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                          <input
                            type="text"
                            placeholder="Search by vehicle model, features, or class..."
                            value={fleetSearchQuery}
                            onChange={(e) => setFleetSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-8 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-gold transition-all"
                          />
                          {fleetSearchQuery && (
                            <button
                              type="button"
                              onClick={() => setFleetSearchQuery('')}
                              className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Quick filter pills */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                          <span className={`${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} font-bold mr-1`}>Filter features:</span>
                          {[
                            { key: 'WiFi', label: 'Free WiFi' },
                            { key: 'Leather', label: 'Leather Interior' },
                            { key: 'Air Conditioning', label: 'Air Conditioning' },
                            { key: 'Legroom', label: 'Extra Legroom' },
                            { key: 'Luggage', label: 'Large Luggage' }
                          ].map((feat) => {
                            const isSelected = selectedFeatures.includes(feat.key);
                            return (
                              <button
                                key={feat.key}
                                type="button"
                                onClick={() => {
                                  setSelectedFeatures(prev => 
                                    prev.includes(feat.key) 
                                      ? prev.filter(f => f !== feat.key) 
                                      : [...prev, feat.key]
                                  );
                                }}
                                className={`px-2.5 py-1 rounded-full border transition cursor-pointer font-medium ${
                                  isSelected 
                                    ? 'bg-amber-500/10 border-gold text-gold font-semibold' 
                                    : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-300'
                                }`}
                              >
                                {feat.label}
                              </button>
                            );
                          })}

                          {(fleetSearchQuery || selectedFeatures.length > 0) && (
                            <button
                              type="button"
                              onClick={() => {
                                setFleetSearchQuery('');
                                setSelectedFeatures([]);
                              }}
                              className="text-gold hover:underline font-bold ml-auto pl-2 cursor-pointer"
                            >
                              Clear filters
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                        {filteredFleet.length === 0 ? (
                          <div className="py-12 px-4 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20">
                            <AlertCircle className="w-8 h-8 text-zinc-500 mx-auto mb-2.5" />
                            <p className="text-sm font-bold text-white">No Vehicles Match Your Filters</p>
                            <p className="text-xs text-zinc-500 mt-1">Try clearing your search query or selecting fewer feature filters.</p>
                            <button
                              type="button"
                              onClick={() => {
                                setFleetSearchQuery('');
                                setSelectedFeatures([]);
                              }}
                              className="mt-4 px-4 py-1.5 text-xs font-bold bg-amber-500/10 border border-gold text-gold rounded-xl hover:bg-amber-500/20 transition cursor-pointer"
                            >
                              Reset Filters
                            </button>
                          </div>
                        ) : (
                          filteredFleet.map((vehicle) => {
                            const isFeasible = passengers <= vehicle.passengers && luggage <= vehicle.luggage;
                            const vehiclePrice = calculatePrice(vehicle);

                            return (
                              <div 
                                key={vehicle.id}
                                onClick={() => isFeasible && setSelectedVehicle(vehicle.id)}
                                className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${!isFeasible ? 'opacity-30 border-zinc-900 bg-zinc-950/20 cursor-not-allowed' : selectedVehicle === vehicle.id ? 'border-gold bg-amber-500/10 shadow-lg shadow-gold/5' : 'border-zinc-850 hover:border-zinc-700 bg-[#09090b]'}`}
                              >
                                <div className="flex gap-3">
                                  <div className="w-16 h-12 rounded-xl bg-zinc-900 overflow-hidden shrink-0 border border-zinc-800 relative">
                                    <img 
                                      src={typeof vehicle.imageUrl === 'object' ? vehicle.imageUrl.src : vehicle.imageUrl} 
                                      alt={vehicle.name} 
                                      className="w-full h-full object-cover" 
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-bold text-sm text-white">{vehicle.name}</h4>
                                      <span className="bg-amber-500/15 text-gold text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{vehicle.badge}</span>
                                    </div>
                                    <p className="text-[10px] text-zinc-400 -mt-0.5 mb-1.5">{vehicle.example}</p>
                                    <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-zinc-500" /> {vehicle.passengers} Max</span>
                                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-zinc-500" /> {vehicle.luggage} Max</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="text-right w-full md:w-auto flex md:flex-col justify-between md:justify-center items-center md:items-end gap-1.5 pt-2 md:pt-0 border-t md:border-0 border-zinc-800/60">
                                  <div className="text-left md:text-right">
                                    <span className="text-xs text-zinc-500 block -mb-1">Fixed Quote</span>
                                    <span className="font-mono text-xl font-bold text-gold">£{vehiclePrice}</span>
                                  </div>
                                  
                                  {selectedVehicle === vehicle.id ? (
                                    <span className="w-5 h-5 rounded-full bg-gold text-black flex items-center justify-center"><Check className="w-3 h-3 stroke-[3]" /></span>
                                  ) : isFeasible ? (
                                    <span className="text-[10px] font-bold text-gold hover:underline">Select</span>
                                  ) : (
                                    <span className="text-[9px] text-rose-400 bg-rose-500/10 px-2 py-1 rounded font-bold border border-rose-500/20">Too small</span>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Display specs for selected vehicle */}
                      <div className="p-4 bg-[#09090b] rounded-2xl border border-zinc-800">
                        <span className="text-[10px] uppercase tracking-wider text-gold block font-bold mb-2">Selected Class Features:</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-zinc-300">
                          {selectedVehicleDetails.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-1.5 p-2 bg-[#121215] rounded-xl border border-zinc-800/60">
                              <span className="text-gold font-bold">✓</span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={handlePrevStep}
                          className="w-1/3 border border-zinc-800 text-zinc-300 hover:bg-[#09090b] font-bold py-3 px-4 rounded-xl transition cursor-pointer"
                        >
                          Back
                        </button>
                        <button 
                          onClick={handleNextStep}
                          className="w-2/3 bg-gold hover:bg-gold-light text-black font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-gold/15 cursor-pointer"
                        >
                          <span>Confirm Vehicle & Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Passenger Details */}
                  {bookingStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4"
                    >
                      <div className="border-b border-zinc-800 pb-2">
                        <h3 className="font-display font-bold text-base text-white">Passenger & Flight Contact</h3>
                        <p className="text-xs text-zinc-400">Provide accurate contact information so the driver can locate you.</p>
                      </div>

                      <div className="space-y-3.5">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-300 block">Lead Passenger Name *</label>
                          <input 
                            type="text"
                            placeholder="John Doe"
                            value={passengerName}
                            onChange={(e) => setPassengerName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-300 block">Email Address *</label>
                            <input 
                              type="email"
                              placeholder="johndoe@example.com"
                              value={passengerEmail}
                              onChange={(e) => setPassengerEmail(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-300 block">Contact Phone Number *</label>
                            <input 
                              type="tel"
                              placeholder="+44 7123 456789"
                              value={passengerPhone}
                              onChange={(e) => setPassengerPhone(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-zinc-300 block">Flight Number / Cruise Vessel (Optional)</label>
                            <span className="text-[10px] text-gold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-bold">Free delay tracking</span>
                          </div>
                          <input 
                            type="text"
                            placeholder="e.g., BA123 or Queen Mary 2"
                            value={flightNumber}
                            onChange={(e) => setFlightNumber(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold uppercase"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-300 block">Special Requirements / Notes (Optional)</label>
                          <textarea 
                            rows={2}
                            placeholder="Need baby seat (age 2), extra luggage size, pick up next to terminal Starbucks, etc..."
                            value={specialRemarks}
                            onChange={(e) => setSpecialRemarks(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          type="button"
                          onClick={handlePrevStep}
                          className="w-1/3 border border-zinc-800 text-zinc-300 hover:bg-[#09090b] font-bold py-3 px-4 rounded-xl transition cursor-pointer"
                        >
                          Back
                        </button>
                        <button 
                          type="button"
                          onClick={handleNextStep}
                          className="w-2/3 bg-gold hover:bg-gold-light text-black font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-gold/15 cursor-pointer"
                        >
                          <span>Go to Secure Checkout</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Secure Checkout */}
                  {bookingStep === 4 && (
                    <form onSubmit={handlePaymentSubmit}>
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4"
                      >
                        <div className="border-b border-zinc-800 pb-2">
                        <h3 className="font-display font-bold text-base text-white">Secure simulated Checkout</h3>
                        <p className="text-xs text-zinc-400">Your quoted price is fully inclusive. Rest assured, payment details are not charged.</p>
                      </div>

                      {/* Journey Summary Box */}
                      <div className="p-4 bg-[#09090b] rounded-2xl border border-zinc-800 space-y-2 text-xs text-zinc-300">
                        <div className="flex justify-between font-bold text-white border-b border-zinc-800 pb-2 text-sm">
                          <span>Outbound Journey</span>
                          <span className="text-gold">{selectedVehicleDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">From:</span>
                          <span className="font-semibold text-zinc-200 text-right">{getLocName(pickupId, isCustomPickup, pickupCustom)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">To:</span>
                          <span className="font-semibold text-zinc-200 text-right">{getLocName(dropoffId, isCustomDropoff, dropoffCustom)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Date / Time:</span>
                          <span className="font-semibold text-zinc-200">{pickupDate} at {pickupTime}</span>
                        </div>
                        {routeType === 'return' && (
                          <div className="pt-2 border-t border-zinc-800 space-y-1 mt-1.5">
                            <span className="font-bold text-gold block text-xs">Return Journey Leg</span>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Date / Time:</span>
                              <span className="font-semibold text-zinc-200">{returnDate} at {returnTime}</span>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t border-zinc-800 text-white font-bold text-sm">
                          <span>Guaranteed Price</span>
                          <span className="text-lg text-gold font-mono">£{totalPrice}</span>
                        </div>
                      </div>

                      {/* Live Map Visualizer Recap */}
                      <div className="h-[180px] w-full rounded-2xl overflow-hidden border border-zinc-800">
                        <MapComponent 
                          pickupLat={pCoords.lat}
                          pickupLng={pCoords.lng}
                          pickupName={getLocName(pickupId, isCustomPickup, pickupCustom)}
                          dropoffLat={dCoords.lat}
                          dropoffLng={dCoords.lng}
                          dropoffName={getLocName(dropoffId, isCustomDropoff, dropoffCustom)}
                        />
                      </div>

                      <div className="space-y-3.5 pt-1">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-300 block">Name on Card</label>
                          <input 
                            type="text"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-300 block">Card Number</label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                            <input 
                              type="text"
                              placeholder="4000 1234 5678 9010"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full pl-9 pr-3.5 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-300 block">Expiry Date</label>
                            <input 
                              type="text"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold text-center"
                              required
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-300 block">CVC Security Code</label>
                            <input 
                              type="password"
                              placeholder="•••"
                              maxLength={3}
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold text-center"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                          <Shield className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>Industry-standard 256-bit encryption. The transaction is completely simulated.</span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button 
                          type="button"
                          onClick={handlePrevStep}
                          className="w-1/3 border border-zinc-800 text-zinc-300 hover:bg-[#09090b] font-bold py-3 px-4 rounded-xl transition cursor-pointer"
                          disabled={paymentProcessing}
                        >
                          Back
                        </button>
                        <button 
                          type="submit"
                          className="w-2/3 bg-amber-600 hover:bg-amber-500 disabled:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-amber-950/20 cursor-pointer"
                          disabled={paymentProcessing}
                        >
                          {paymentProcessing ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Securing Booking...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Book & Save Quote</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  </form>
                )}

                  {/* Step 5: Success Confirmation */}
                  {bookingStep === 5 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-5 py-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-amber-500/10 text-gold flex items-center justify-center mx-auto shadow-inner border border-amber-500/20">
                        <Check className="w-8 h-8" />
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-display font-extrabold text-xl text-white">Transfer Booked Successfully!</h3>
                        <p className="text-xs text-zinc-400">Your professional driver is secured. Check your simulated reference below.</p>
                      </div>

                      {/* Display Reference Card */}
                      <div className="p-5 bg-amber-500/5 border border-amber-500/25 rounded-3xl inline-block w-full max-w-sm">
                        <span className="text-[10px] block uppercase tracking-wider text-gold font-bold">Booking Reference</span>
                        <span className="font-mono text-2xl font-extrabold text-white block my-1">{generatedReference}</span>
                        <span className="text-xs block text-zinc-300 mt-1">Passenger: <strong className="text-white">{passengerName}</strong></span>
                        <span className="text-[11px] block text-gold-300 mt-0.5">Details saved to local browser storage.</span>
                      </div>

                      <div className="bg-[#09090b] p-4 rounded-2xl border border-zinc-800 text-xs text-zinc-300 text-left space-y-1.5 max-w-sm mx-auto">
                        <h5 className="font-bold text-gold">What happens next:</h5>
                        <p>1. A confirmation receipt has been simulated to <span className="font-semibold text-white">{passengerEmail}</span>.</p>
                        <p>2. We will dispatch the vehicle according to your scheduling time.</p>
                        <p>3. You can track this trip anytime using the reference code above!</p>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center items-center max-w-sm mx-auto">
                        <button 
                          onClick={() => {
                            if (lastCompletedBooking) {
                              setReceiptBooking(lastCompletedBooking);
                            }
                          }}
                          className="w-full sm:w-auto flex-1 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs rounded-xl border border-zinc-750 transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-gold" />
                          <span>View Email Receipt</span>
                        </button>
                        <button 
                          onClick={resetBookingFlow}
                          className="w-full sm:w-auto flex-1 px-6 py-2.5 bg-gold hover:bg-gold-light text-black font-bold text-xs rounded-xl transition cursor-pointer"
                        >
                          Book Another Ride
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                /* Tab 2: Track & Manage Journey Portal */
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div className="border-b border-zinc-800 pb-2">
                    <h3 className="font-display font-bold text-base text-white">Track My Booking</h3>
                    <p className="text-xs text-zinc-400">Lookup and cancel your private hire trip using local state storage.</p>
                  </div>

                  {!trackedBooking ? (
                    <form onSubmit={handleTrackSearch} className="space-y-4">
                      {trackError && (
                        <div className="p-3 bg-rose-500/10 text-rose-400 text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-rose-500/20">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{trackError}</span>
                        </div>
                      )}

                      <div className="space-y-3.5">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-300 block">Booking Reference</label>
                          <input 
                            type="text"
                            placeholder="e.g., QH-123456"
                            value={trackRef}
                            onChange={(e) => setTrackRef(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-300 block">Passenger Email Address</label>
                          <input 
                            type="email"
                            placeholder="johndoe@example.com"
                            value={trackEmail}
                            onChange={(e) => setTrackEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#09090b] border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-gold hover:bg-gold-light text-black font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
                      >
                        <Search className="w-4 h-4" />
                        <span>Search Booking</span>
                      </button>

                      {bookings.length > 0 && (
                        <div className="pt-4 border-t border-zinc-800">
                          <span className="text-[10px] font-bold text-zinc-500 block mb-2 uppercase">Your Recent Local Bookings:</span>
                          <div className="space-y-1.5">
                            {bookings.slice(0, 3).map((b) => (
                              <div 
                                key={b.ref}
                                onClick={() => { setTrackRef(b.ref); setTrackEmail(b.passengerEmail); setTrackedBooking(b); }}
                                className="p-2.5 bg-[#09090b] hover:bg-zinc-900 rounded-lg text-xs flex justify-between items-center cursor-pointer border border-zinc-800 transition"
                              >
                                <div>
                                  <span className="font-mono font-bold text-gold block">{b.ref}</span>
                                  <span className="text-zinc-400 truncate block max-w-[200px]">{b.pickup} ➔ {b.dropoff}</span>
                                </div>
                                <div className="text-right font-mono">
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${b.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{b.status}</span>
                                  <span className="block font-bold mt-0.5 text-zinc-200">£{b.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </form>
                  ) : (
                    /* Display Found Booking info */
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center bg-[#09090b] p-4 rounded-2xl border border-zinc-800">
                        <div>
                          <span className="text-[10px] text-zinc-500 uppercase font-mono block">Status</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${trackedBooking.status === 'Cancelled' ? 'bg-rose-500/15 text-rose-400' : 'bg-emerald-500/15 text-emerald-400'}`}>
                            {trackedBooking.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-zinc-500 uppercase font-mono block">Ref Reference</span>
                          <span className="font-mono font-bold text-sm text-gold">{trackedBooking.ref}</span>
                        </div>
                      </div>

                      {/* Details list */}
                      <div className="space-y-2 text-xs text-zinc-300 border-b border-zinc-800 pb-3">
                        <div className="grid grid-cols-3 py-1">
                          <span className="font-semibold text-zinc-500">Route Type:</span>
                          <span className="col-span-2 text-white font-medium capitalize">{trackedBooking.routeType === 'oneWay' ? 'One-Way' : 'Return Leg'}</span>
                        </div>
                        <div className="grid grid-cols-3 py-1">
                          <span className="font-semibold text-zinc-500">Pickup:</span>
                          <span className="col-span-2 text-white font-medium">{trackedBooking.pickup}</span>
                        </div>
                        <div className="grid grid-cols-3 py-1">
                          <span className="font-semibold text-zinc-500">Dropoff:</span>
                          <span className="col-span-2 text-white font-medium">{trackedBooking.dropoff}</span>
                        </div>
                        <div className="grid grid-cols-3 py-1">
                          <span className="font-semibold text-zinc-500">Outbound Schedule:</span>
                          <span className="col-span-2 text-white font-semibold">{trackedBooking.pickupDate} at {trackedBooking.pickupTime}</span>
                        </div>
                        {trackedBooking.returnDate && (
                          <div className="grid grid-cols-3 py-1 bg-amber-500/5 p-2 rounded border border-amber-500/15">
                            <span className="font-semibold text-gold">Return Leg:</span>
                            <span className="col-span-2 text-white font-bold">{trackedBooking.returnDate} at {trackedBooking.returnTime}</span>
                          </div>
                        )}
                        <div className="grid grid-cols-3 py-1">
                          <span className="font-semibold text-zinc-500">Vehicle:</span>
                          <span className="col-span-2 text-white font-medium">{trackedBooking.vehicleClass}</span>
                        </div>
                        <div className="grid grid-cols-3 py-1">
                          <span className="font-semibold text-zinc-500">Passenger:</span>
                          <span className="col-span-2 text-white font-medium">{trackedBooking.passengerName}</span>
                        </div>
                        {trackedBooking.flightNumber && (
                          <div className="grid grid-cols-3 py-1">
                            <span className="font-semibold text-zinc-500">Flight No:</span>
                            <span className="col-span-2 text-white font-bold font-mono">{trackedBooking.flightNumber}</span>
                          </div>
                        )}
                        {trackedBooking.specialRemarks && (
                          <div className="grid grid-cols-3 py-1">
                            <span className="font-semibold text-zinc-500">Remarks:</span>
                            <span className="col-span-2 text-white italic">&quot;{trackedBooking.specialRemarks}&quot;</span>
                          </div>
                        )}
                        <div className="grid grid-cols-3 py-2 border-t border-zinc-800 text-sm font-bold">
                          <span className="text-zinc-400">Paid Total:</span>
                          <span className="col-span-2 text-gold font-mono">£{trackedBooking.price}</span>
                        </div>
                      </div>

                      {/* Driver Status Visual Simulation */}
                      <div className="p-3.5 bg-[#09090b] border border-zinc-800 rounded-2xl space-y-2">
                        <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-wider">Driver Tracking Simulation:</span>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-gold">
                            <Car className="w-4 h-4" />
                          </div>
                          <div>
                            {trackedBooking.status === 'Cancelled' ? (
                              <p className="text-xs text-rose-400 font-bold">Trip has been cancelled. Refund simulated.</p>
                            ) : (
                              <>
                                <p className="text-xs font-bold text-white">Driver: Dave K. (Silver Skoda Octavia)</p>
                                <p className="text-[10px] text-zinc-400">Contact: +44 7911 123456 • Dispatch queued</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pt-2">
                        <button 
                          type="button"
                          onClick={() => setReceiptBooking(trackedBooking)}
                          className="w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-gold font-bold text-xs rounded-xl transition border border-amber-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Simulated Email Receipt</span>
                        </button>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setTrackedBooking(null)}
                            className="flex-1 py-2.5 border border-zinc-800 text-zinc-300 hover:bg-[#09090b] font-bold text-xs rounded-xl transition cursor-pointer"
                          >
                            Back to Search
                          </button>
                          {trackedBooking.status !== 'Cancelled' && (
                            <button 
                              type="button"
                              onClick={() => handleCancelBooking(trackedBooking.ref)}
                              className="flex-1 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs rounded-xl transition border border-rose-500/20 cursor-pointer"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-black border-y border-zinc-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-6 text-zinc-400 font-medium text-xs">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gold" />
            <span className="text-zinc-200">Fully Licensed Private Hire Operators</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold" />
            <span className="text-zinc-200">Flight Status Auto-Tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-gold" />
            <span className="text-zinc-200">Free Modifications & Cancellations</span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-gold" />
            <span className="text-zinc-200">Fully Inclusive Fixed Quoted Rates</span>
          </div>
        </div>
      </section>

      {/* Services We Offer Grid */}
      <section className="py-24 bg-[#09090b] border-b border-zinc-800/80" id="services">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-gold font-bold text-xs uppercase tracking-wider block">What We Provide</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
              Reliable Transfers Across the UK
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We cater to all private hire, airport, seaport, and corporate travel needs with high-end, dedicated private taxi classes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-gold flex items-center justify-center font-bold">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Airport Transfers</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Seamless pick-ups and drop-offs to Heathrow, Gatwick, Stansted, Luton and Southampton Airport. Fully-inclusive airport parking charges.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-gold flex items-center justify-center font-bold">
                <Anchor className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Seaport Transfers</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct transfers to Southampton Port Terminal gates. Coordinated pick-ups mapped to major cruise liners including P&O, Cunard, and Royal Caribbean.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-gold flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Executive Travel</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Elite Mercedes E-Class and corporate saloon experiences for executive commutes, luxury travel, and professional business itineraries.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-gold flex items-center justify-center font-bold">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Long Distance Taxis</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Nationwide taxi services from Hampshire. Perfect for college transfers, sporting events, day tours, or absolute travel peace-of-mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Direct Routes Fill */}
      <section className="py-24 bg-black" id="popular-routes">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div className="space-y-2">
              <span className="text-gold font-bold text-xs uppercase tracking-wider block">Fast Direct Fill</span>
              <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
                Popular Hampshire Airport Routes
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                Click any route below to instantly populate your booking engine. Prices include base tolls and meet-and-greet options.
              </p>
            </div>
            <a href="#booking-portal" className="text-xs font-bold text-gold flex items-center gap-1 hover:underline">
              <span>View all custom rates</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {POPULAR_ROUTES.map((route, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                whileHover={{ y: -5, scale: 1.025 }}
                onClick={() => handleQuickBook(route.fromId, route.toId)}
                className="group p-5 bg-[#09090b] hover:bg-amber-500/5 border border-zinc-800/80 hover:border-gold rounded-2xl cursor-pointer transition-all duration-350 shadow-sm flex flex-col justify-between min-h-[160px]"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span className="text-[10px] text-zinc-500 font-bold font-mono">SOUTHAMPTON</span>
                  </div>
                  <h4 className="font-bold text-white text-xs leading-tight group-hover:text-gold transition">{route.from}</h4>
                  <div className="text-zinc-500 text-xs py-0.5">➔</div>
                  <div className="flex items-center gap-1">
                    <Plane className="w-3.5 h-3.5 text-gold" />
                    <span className="text-[10px] text-zinc-500 font-bold font-mono">AIRPORT</span>
                  </div>
                  <h4 className="font-bold text-white text-xs leading-tight group-hover:text-gold transition">{route.to}</h4>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-zinc-800/60 mt-4 text-xs">
                  <span className="text-zinc-400">{route.time} travel</span>
                  <div className="flex items-center gap-1 font-bold">
                    <span className="text-zinc-500 text-[10px]">from</span>
                    <span className="text-sm text-gold font-mono">{route.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Showcase Grid */}
      <section className="py-24 bg-[#09090b] border-t border-zinc-800/80" id="fleet">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-gold font-bold text-xs uppercase tracking-wider block">Our Fleet</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
              Modern Vehicles for Every Travel Need
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We operate standard saloon vehicles, estate cars, executive transport, MPVs, and 8-seater minibuses. Each vehicle is fully serviced, vacuumed, and driven by a fully vetted local driver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLEET.map((vehicle) => (
              <div key={vehicle.id} className="bg-black/40 rounded-3xl border border-zinc-800/80 overflow-hidden shadow-sm flex flex-col justify-between group/fleet-card hover:border-gold transition-all duration-350">
                <div className="relative h-44 w-full bg-zinc-900 overflow-hidden border-b border-zinc-800/80">
                  <img
                    src={typeof vehicle.imageUrl === 'object' ? vehicle.imageUrl.src : vehicle.imageUrl}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover/fleet-card:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/75 backdrop-blur-sm border border-zinc-700 text-gold text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{vehicle.class}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-white text-lg mt-1">{vehicle.name}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-2xl flex items-center justify-center border border-amber-500/20">
                      {vehicle.image}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {vehicle.description}
                  </p>

                  <div className="text-xs text-zinc-400 font-mono bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
                    <span className="block font-bold text-gold text-[10px] uppercase mb-1">Standard Example:</span>
                    <span className="text-zinc-200">{vehicle.example}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-zinc-300 pt-2 border-t border-zinc-800/80">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-zinc-500" />
                      <span><strong>{vehicle.passengers}</strong> Passengers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-zinc-500" />
                      <span><strong>{vehicle.luggage}</strong> Suitcases</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[#09090b] border-t border-zinc-800/80 flex justify-between items-center">
                  <div className="font-mono">
                    <span className="text-[10px] text-zinc-500 block -mb-0.5">Rates start at</span>
                    <span className="text-lg font-bold text-gold">£{vehicle.baseRate} <span className="text-xs font-normal text-zinc-400">+ £{vehicle.perMileRate}/mi</span></span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedVehicle(vehicle.id);
                      setBookingStep(1);
                      setActiveTab('book');
                      const element = document.getElementById('booking-portal');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-gold hover:bg-gold-light text-black text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    Select Class
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden border-t border-zinc-800/80">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 space-y-16 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-gold font-bold text-xs uppercase tracking-wider block">Simplicity First</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display">
              Booking Your Transfer In 3 Steps
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              No phone delays, no surprise rates. Our intuitive interface calculates quotes and dispatches rides seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4 relative">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-gold flex items-center justify-center font-bold text-base mx-auto border border-amber-500/20">
                1
              </div>
              <h3 className="font-bold text-base text-white">Select Journey & Vehicle</h3>
              <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed">
                Choose single or return trips. Select from popular airport lists or input custom addresses. Pick a vehicle class matching your luggage.
              </p>
            </div>

            <div className="space-y-4 relative">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-gold flex items-center justify-center font-bold text-base mx-auto border border-amber-500/20">
                2
              </div>
              <h3 className="font-bold text-base text-white">Enter Lead Passenger Details</h3>
              <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed">
                Enter your flight or cruise vessel number. Our system automates real-time delay tracking so your driver stays coordinated.
              </p>
            </div>

            <div className="space-y-4 relative">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-gold flex items-center justify-center font-bold text-base mx-auto border border-amber-500/20">
                3
              </div>
              <h3 className="font-bold text-base text-white">Receive Reference & Meet Driver</h3>
              <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed">
                Receive an instant booking reference. Your driver will meet you directly in the arrivals hall with a name board, tracking delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQs */}
      <section className="py-24 bg-[#09090b] border-t border-zinc-800/80" id="faqs">
        <div className="max-w-3xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-gold font-bold text-xs uppercase tracking-wider block">Help & Support</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Find answers to the most common queries about our premium airport taxi transfers.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          <div className="bg-black/40 p-6 rounded-3xl border border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-bold text-white text-sm">Have a unique or multi-stop request?</h4>
              <p className="text-xs text-zinc-400">Contact our Hampshire booking office directly for custom itineraries.</p>
            </div>
            <a 
              href="mailto:bookings@roystonlynxx.co.uk"
              className="bg-gold hover:bg-gold-light text-black font-bold text-xs px-5 py-2.5 rounded-xl transition shrink-0"
            >
              Email Hampshire Office
            </a>
          </div>
        </div>
      </section>

      {/* Footer Details */}
      <footer className="mt-auto bg-black text-zinc-400 border-t border-zinc-900 py-16">
        {/* Newsletter Subscription Row */}
        <div className="max-w-7xl mx-auto px-4 pb-12 mb-12 border-b border-zinc-900">
          <div className="bg-[#09090b] border border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="space-y-2 max-w-xl text-center lg:text-left relative z-10">
              <span className="text-gold font-bold text-[10px] uppercase tracking-widest font-mono flex items-center justify-center lg:justify-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                Exclusive Hampshire Travel Club
              </span>
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-white tracking-tight">
                Subscribe to our Hampshire Dispatch
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Get fixed fare alerts, seasonal private hire discounts, and Hampshire travel updates direct to your inbox.
              </p>
            </div>

            <div className="w-full lg:w-auto relative z-10">
              {newsletterSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-6 py-4 rounded-2xl flex items-center gap-3 max-w-md mx-auto"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold">Successfully Subscribed!</p>
                    <p className="text-[10px] text-emerald-400/80">Thank you for joining. Local storage updated.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-md mx-auto lg:mx-0 w-full">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full h-11 bg-black text-white placeholder-zinc-500 text-xs px-4 rounded-xl border border-zinc-800 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-sans"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-11 px-6 bg-gold hover:bg-gold-light text-black font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shrink-0 group cursor-pointer border-none"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-black font-bold">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-white font-bold tracking-tight text-lg font-display">
                Quick<span className="text-gold">Hop</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              Premium airport transfers and private hire taxis operating across Southampton, Portsmouth, Winchester, Hampshire, and major London airports. Fixed, inclusive prices.
            </p>
            <div className="text-xs space-y-1">
              <p className="text-zinc-300">Licensed Private Hire Operator</p>
              <p className="text-gold font-mono text-[10px]">OPERATOR NO: PH-1849/HAMP</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">Popular Destinations</h4>
            <ul className="text-xs space-y-2">
              <li><a href="#popular-routes" className="hover:text-gold transition">London Heathrow Transfers</a></li>
              <li><a href="#popular-routes" className="hover:text-gold transition">London Gatwick Transfers</a></li>
              <li><a href="#popular-routes" className="hover:text-gold transition">Southampton Airport Taxis</a></li>
              <li><a href="#popular-routes" className="hover:text-gold transition">Southampton Seaport Cruises</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">Fleet & Classes</h4>
            <ul className="text-xs space-y-2">
              <li><a href="#fleet" className="hover:text-gold transition">Standard Saloon Cars</a></li>
              <li><a href="#fleet" className="hover:text-gold transition">Comfort Estate Vehicles</a></li>
              <li><a href="#fleet" className="hover:text-gold transition">Executive Chauffeur Class</a></li>
              <li><a href="#fleet" className="hover:text-gold transition">8-Seater Airport Minibus</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">Company Links</h4>
            <ul className="text-xs space-y-2">
              <li><Link href="/" className="hover:text-gold transition">Book a Ride</Link></li>
              <li><Link href="/about" className="hover:text-gold transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition">Contact Us</Link></li>
              <li><Link href="/ride-with-us" className="hover:text-gold transition">Ride with Us / Drivers</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white">Office Location</h4>
            <div className="text-xs space-y-2 leading-relaxed text-zinc-400">
              <p>Royston Lynxx Booking Centre<br />Southampton Business Park, SO16 7PX<br />Hampshire, United Kingdom</p>
              <p>Hotline: <strong className="text-white">+44 (0) 23 8000 0000</strong></p>
              <p>Office hours: 24 hours / 7 days</p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-zinc-900 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} <span className="text-gold">Royston Lynxx</span>. All rights reserved. Built as a high-fidelity Next.js clone.</p>
          <div className="flex items-center gap-4 text-zinc-650 font-mono text-[10px]">
            <span>Visa</span>
            <span>MasterCard</span>
            <span>American Express</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </footer>

      {/* Simulated Email Confirmation Receipt Modal & Printable Summary */}
      <AnimatePresence>
        {receiptBooking && (
          <>
            {/* Dynamic CSS override for high-contrast printable receipt */}
            <style dangerouslySetInnerHTML={{ __html: `
              @media print {
                body * {
                  visibility: hidden !important;
                }
                #printable-receipt, #printable-receipt * {
                  visibility: visible !important;
                }
                #printable-receipt {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  background: white !important;
                  color: black !important;
                  padding: 40px !important;
                  box-shadow: none !important;
                  border: 2px solid #000000 !important;
                  margin: 0 !important;
                }
                #printable-receipt .print-bg-light {
                  background-color: #f4f4f5 !important;
                  border-color: #e4e4e7 !important;
                }
                #printable-receipt .print-border-subtle {
                  border-color: #e4e4e7 !important;
                }
                #printable-receipt .print-text-dark {
                  color: #000000 !important;
                }
                #printable-receipt .print-text-gold {
                  color: #b45309 !important;
                }
                #printable-receipt .print-badge {
                  background-color: #d1fae5 !important;
                  color: #065f46 !important;
                  border: 1px solid #a7f3d0 !important;
                }
              }
            ` }} />

            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] overflow-y-auto p-4 md:p-8 flex items-start justify-center no-print">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden text-left my-4"
              >
                {/* Modal Simulated OS Header */}
                <div className="bg-[#121215] border-b border-zinc-850 px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-zinc-400 text-xs font-mono font-semibold ml-2">Simulated Email Delivery System</span>
                  </div>
                  <button 
                    onClick={() => setReceiptBooking(null)}
                    className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Email Metadata Header block */}
                <div className="p-5 bg-zinc-900/40 border-b border-zinc-850 space-y-2 text-xs text-zinc-400 leading-relaxed font-sans">
                  <div>
                    <span className="font-bold text-zinc-500 inline-block w-14">From:</span>
                    <span className="text-gold font-medium">bookings@roystonlynxx.co.uk</span>
                    <span className="text-zinc-500 ml-1.5">(Royston Lynxx Dispatch Desk)</span>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-500 inline-block w-14">To:</span>
                    <span className="text-white font-medium">{receiptBooking.passengerEmail}</span>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-500 inline-block w-14">Subject:</span>
                    <span className="text-white font-bold font-mono">CONFIRMED — Booking Receipt & Reference {receiptBooking.ref}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-zinc-850/50 mt-1.5">
                    <div>
                      <span className="font-bold text-zinc-500 inline-block w-14">Status:</span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px]">Simulated Delivery Succeeded</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">Date: {receiptBooking.createdAt ? new Date(receiptBooking.createdAt).toLocaleString('en-GB') : ''}</span>
                  </div>
                </div>

                {/* Simulated Email Body Container (The actual printed receipt is inside here) */}
                <div className="p-6 md:p-8 overflow-y-auto max-h-[60vh] bg-zinc-950 font-sans">
                  {/* Printable Area */}
                  <div 
                    id="printable-receipt"
                    className="p-6 md:p-8 bg-zinc-900/25 border border-zinc-800 rounded-2xl space-y-6 text-zinc-300"
                  >
                    {/* Invoice/Receipt Brand Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-800/80 pb-5 print-border-subtle">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-amber-500/10 border border-amber-500/25 rounded-lg text-gold print-text-gold">
                            <Car className="w-5 h-5" />
                          </div>
                          <span className="text-lg font-bold tracking-tight text-white font-display print-text-dark">
                            Royston <span className="text-gold print-text-gold">Lynxx</span>
                          </span>
                        </div>
                        <span className="text-[9px] block text-gold-300 font-mono tracking-widest mt-0.5 font-bold uppercase print-text-gold">
                          UK Executive Chauffeur Services
                        </span>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono inline-block print-badge">
                          PAID & GUARANTEED
                        </span>
                        <div className="text-[11px] font-mono text-zinc-400 mt-2 print-text-dark">
                          Invoice: <span className="text-white font-bold font-mono print-text-dark">{receiptBooking.ref}</span>
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono print-text-dark">
                          Tax Point: {receiptBooking.createdAt ? new Date(receiptBooking.createdAt).toLocaleDateString('en-GB') : ''}
                        </div>
                      </div>
                    </div>

                    {/* Thank you note */}
                    <div className="space-y-1.5">
                      <p className="text-xs text-zinc-300 leading-relaxed print-text-dark">
                        Dear <strong className="text-white print-text-dark">{receiptBooking.passengerName}</strong>,
                      </p>
                      <p className="text-[11px] text-zinc-400 leading-relaxed print-text-dark">
                        Your private airport/seaport transfer booking with Royston Lynxx has been processed successfully. Your fixed premium price is secured and fully prepaid. Below is your detailed summary receipt for business accounting purposes.
                      </p>
                    </div>

                    {/* Grid of Transfer details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-y border-zinc-800/60 py-5 print-border-subtle">
                      {/* Left: Journey Info */}
                      <div className="space-y-3.5">
                        <div>
                          <span className="text-[9px] block font-mono text-zinc-500 uppercase tracking-wider print-text-dark">Transfer Type</span>
                          <span className="text-xs font-bold text-white capitalize print-text-dark">
                            {receiptBooking.routeType === 'oneWay' ? 'One-Way Premium Transfer' : 'Return Trip Private Hire'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] block font-mono text-zinc-500 uppercase tracking-wider print-text-dark">Pickup Location</span>
                          <span className="text-xs font-bold text-gold print-text-gold">{receiptBooking.pickup}</span>
                        </div>
                        <div>
                          <span className="text-[9px] block font-mono text-zinc-500 uppercase tracking-wider print-text-dark">Dropoff Location</span>
                          <span className="text-xs font-bold text-white print-text-dark">{receiptBooking.dropoff}</span>
                        </div>
                        <div>
                          <span className="text-[9px] block font-mono text-zinc-500 uppercase tracking-wider print-text-dark">Outbound Date & Time</span>
                          <span className="text-xs font-bold text-white font-mono print-text-dark">
                            {receiptBooking.pickupDate} at {receiptBooking.pickupTime}
                          </span>
                        </div>
                        {receiptBooking.returnDate && (
                          <div className="p-2 bg-amber-500/5 border border-amber-500/15 rounded-xl print-bg-light">
                            <span className="text-[9px] block font-mono text-gold-300 uppercase tracking-wider print-text-gold">Return Leg Details</span>
                            <span className="text-xs font-bold text-white font-mono print-text-dark">
                              {receiptBooking.returnDate} at {receiptBooking.returnTime}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Vehicle & Passenger info */}
                      <div className="space-y-3.5 md:border-l md:border-zinc-800/40 md:pl-4 print-border-subtle">
                        <div>
                          <span className="text-[9px] block font-mono text-zinc-500 uppercase tracking-wider print-text-dark">Assigned Vehicle</span>
                          <span className="text-xs font-bold text-white print-text-dark">{receiptBooking.vehicleClass}</span>
                        </div>
                        <div>
                          <span className="text-[9px] block font-mono text-zinc-500 uppercase tracking-wider print-text-dark">Travel Group Capacity</span>
                          <span className="text-xs text-zinc-300 print-text-dark">
                            <strong className="text-white print-text-dark">{receiptBooking.passengers}</strong> Passenger(s) • <strong className="text-white print-text-dark">{receiptBooking.luggage}</strong> Luggage Piece(s)
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] block font-mono text-zinc-500 uppercase tracking-wider print-text-dark">Passenger Phone Contact</span>
                          <span className="text-xs font-mono text-white print-text-dark">{receiptBooking.passengerPhone}</span>
                        </div>
                        {receiptBooking.flightNumber && (
                          <div>
                            <span className="text-[9px] block font-mono text-zinc-500 uppercase tracking-wider print-text-dark">Flight / Cruise Reference</span>
                            <span className="text-xs font-bold font-mono text-white print-text-dark">{receiptBooking.flightNumber}</span>
                          </div>
                        )}
                        {receiptBooking.specialRemarks && (
                          <div>
                            <span className="text-[9px] block font-mono text-zinc-500 uppercase tracking-wider print-text-dark">Special Chauffeur Instructions</span>
                            <p className="text-[11px] text-zinc-400 italic print-text-dark">&quot;{receiptBooking.specialRemarks}&quot;</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tax & Financial Table */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block print-text-dark">Fare Accounting Breakdown</span>
                      <div className="bg-[#09090b]/50 border border-zinc-800/40 rounded-xl overflow-hidden print-bg-light print-border-subtle">
                        <table className="w-full text-left text-xs leading-normal">
                          <thead>
                            <tr className="border-b border-zinc-800/50 print-border-subtle text-[10px] font-mono text-zinc-500">
                              <th className="px-4 py-2.5 font-bold print-text-dark">Line Description</th>
                              <th className="px-4 py-2.5 text-right font-bold print-text-dark">Amount (GBP)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-850/50 print-border-subtle text-[11px]">
                            <tr>
                              <td className="px-4 py-2.5 text-zinc-300 print-text-dark">
                                Royston Lynxx {receiptBooking.vehicleClass} Private Hire Flat Fare
                              </td>
                              <td className="px-4 py-2.5 text-right text-zinc-300 font-mono print-text-dark">
                                £{(receiptBooking.price * 0.833).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2.5 text-zinc-300 print-text-dark">
                                Airport Meet & Greet, Parking, & Toll Surcharges
                              </td>
                              <td className="px-4 py-2.5 text-right text-emerald-400 font-semibold font-mono print-text-gold">
                                £0.00 (Included)
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2.5 text-zinc-400 print-text-dark">
                                UK Value Added Tax (VAT) at 20%
                              </td>
                              <td className="px-4 py-2.5 text-right text-zinc-400 font-mono print-text-dark font-medium">
                                £{(receiptBooking.price * 0.167).toFixed(2)}
                              </td>
                            </tr>
                            <tr className="bg-zinc-900/60 font-bold text-sm border-t border-zinc-800 print-bg-light print-border-subtle">
                              <td className="px-4 py-3 text-white print-text-dark">Prepaid Total Price (Fully Inclusive)</td>
                              <td className="px-4 py-3 text-right text-gold font-mono print-text-gold">£{receiptBooking.price.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="text-[9px] text-zinc-500 leading-relaxed font-mono flex items-center gap-1 mt-1 print-text-dark">
                        <span>Payment Gateway: Visa/MasterCard Auth Token (XXXX-XXXX-XXXX-{cardNumber ? cardNumber.slice(-4) : '5521'})</span>
                      </div>
                    </div>

                    {/* Official footer */}
                    <div className="border-t border-zinc-800/85 pt-4 text-center text-[9px] text-zinc-500 leading-normal print-border-subtle print-text-dark">
                      <p className="font-bold print-text-dark">Royston Lynxx UK Ltd • Company Registration No. 04822851 • VAT Reg. GB 820 4453 10</p>
                      <p className="mt-0.5 print-text-dark">Southampton Business Park, Hampshire, SO16 7PX • support@roystonlynxx.co.uk</p>
                      <p className="text-[8px] text-zinc-650 mt-1 print-text-dark">This is a simulated system document for client verification. No active credit card charges occurred.</p>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Controls (Not printed) */}
                <div className="p-5 bg-[#121215] border-t border-zinc-850 flex flex-col sm:flex-row gap-3 justify-end items-center">
                  <span className="text-[10px] text-zinc-500 font-medium font-mono mr-auto text-center sm:text-left">
                    💡 Hint: Click &apos;Print Summary&apos; to generate a perfectly formatted PDF tax receipt.
                  </span>
                  <div className="flex gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.print();
                        }
                      }}
                      className="flex-1 sm:flex-initial px-5 py-2.5 bg-gold hover:bg-gold-light text-black font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Summary</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReceiptBooking(null)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs rounded-xl border border-zinc-750 transition flex items-center justify-center cursor-pointer"
                    >
                      <span>Close</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Inner helper components
function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-800/80 rounded-2xl bg-[#09090b] overflow-hidden">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 text-left font-bold text-sm text-white flex justify-between items-center hover:bg-zinc-950 transition"
      >
        <span>{question}</span>
        <ChevronDown className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 bg-black/40">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
