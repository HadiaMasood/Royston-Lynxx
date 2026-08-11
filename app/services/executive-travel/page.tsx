'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Clock, Shield, Star, Users, Briefcase, ChevronDown, 
  ArrowLeft, Check, MapPin, ChevronRight, Phone, Mail, Car, Plane, Anchor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MobileMenu from '@/components/MobileMenu';

const EXECUTIVE_ROUTES = [
  { from: 'Southampton City Centre', to: 'London Heathrow Airport (LHR)', fromId: 'sou-cent', toId: 'lhr', price: '£150', time: '1h 15m' },
  { from: 'Southampton Cruise Terminal (Port)', to: 'London Heathrow Airport (LHR)', fromId: 'sou-port', toId: 'lhr', price: '£155', time: '1h 15m' },
  { from: 'Winchester City Centre', to: 'London Central (Trafalgar Sq)', fromId: 'winch', toId: 'lon-cent', price: '£140', time: '1h 30m' },
  { from: 'London Central (Mayfair)', to: 'Southampton City Centre', fromId: 'lon-cent', toId: 'sou-cent', price: '£160', time: '1h 50m' },
];

const RECOMMENDED_VEHICLES = [
  {
    name: 'Executive Class',
    example: 'Mercedes-Benz E-Class, BMW 5 Series or similar',
    passengers: 4,
    luggage: 3,
    priceFrom: '£45 Base',
    features: ['Full Leather Upholstery', 'Complimentary Bottled Water', 'Silent Premium Acoustic Ride', 'Newspaper & Magazines']
  },
  {
    name: 'First Class VIP',
    example: 'Mercedes-Benz S-Class, BMW 7 Series or similar',
    passengers: 3,
    luggage: 3,
    priceFrom: '£85 Base',
    features: ['Reclining Heated Seats', 'Ambient Lighting Controls', 'Rear Passenger Privacy Blinds', 'Elite Uniformed Chauffeur']
  }
];

const EXEC_FAQS = [
  {
    q: 'What distinguishes your Executive Service from standard private hire?',
    a: 'Our Executive Class features premium vehicles (predominantly metallic black Mercedes-Benz E-Class or BMW 5-Series) that are less than 3 years old, kept in showroom condition. Chauffeurs wear formal business attire, provide personalized luggage handling, and observe complete corporate client confidentiality.'
  },
  {
    q: 'Can we book corporate accounts or multi-day hire?',
    a: 'Absolutely. We support dedicated invoicing and monthly accounts for registered corporate organizations. We also support hourly standby rates and multi-day bespoke itineraries for directors and VIP guests.'
  },
  {
    q: 'Are refreshments included in the cabin?',
    a: 'Yes. Every executive booking includes complimentary chilled mineral water, high-speed mobile charging blocks (Apple/Android cables pre-routed), and fresh sanitization packs.'
  }
];

export default function ExecutiveTravel() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans antialiased flex flex-col">
      {/* 24/7 Hotline Banner */}
      <div className="bg-[#121215] border-b border-zinc-800 py-2 px-4 text-xs font-medium text-zinc-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-zinc-400">Luxury corporate chauffeur hire and VIP airport connections.</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <a href="tel:+442380000000" className="flex items-center gap-1 hover:text-gold transition">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>+44 (0) 23 8000 0000</span>
            </a>
            <a href="mailto:bookings@roystonlynxx.co.uk" className="flex items-center gap-1 hover:text-gold transition">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span>bookings@roystonlynxx.co.uk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-black shadow-md shadow-amber-950/20">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Royston <span className="text-gold">Lynxx</span>
              </span>
              <span className="text-[10px] block text-gold-300 font-mono tracking-wider -mt-1 font-bold">UK AIRPORT TRANSFERS</span>
            </div>
          </Link>

          <MobileMenu />
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-gold transition">Home</Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button 
                type="button"
                className="text-sm font-medium text-gold transition flex items-center gap-1 py-1 cursor-pointer focus:outline-none"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-gold' : ''}`} />
              </button>
              
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-56 rounded-xl bg-[#0e0e11] border border-zinc-800 p-2 shadow-xl z-50"
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
                      className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-white bg-zinc-800/60 transition"
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

            <Link href="/about" className="text-sm font-medium text-zinc-400 hover:text-gold transition">About Us</Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-400 hover:text-gold transition">Contact Us</Link>
            <Link href="/ride-with-us" className="text-sm font-medium text-zinc-400 hover:text-gold transition">Ride with Us</Link>
          </nav>

          <Link 
            href="/"
            className="px-5 py-2.5 bg-gold hover:bg-gold-light text-black font-bold text-xs rounded-xl transition"
          >
            Book Transfer
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden border-b border-zinc-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(#c5a059_1px,transparent_1px)] opacity-5 [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-gold text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chauffeur Premium Service</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
              First Class <span className="text-gold">Chauffeur Travel</span> & Business Hire
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
              Engineered for directors, corporate clients, and discerning passengers. Experience flawless business travel in late-model, leather-clad Mercedes-Benz or BMW saloons driven by seasoned professional chauffeurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/?vehicle=executive"
                className="px-6 py-3 bg-gold hover:bg-gold-light text-black font-bold text-sm rounded-xl transition shadow-lg shadow-gold/10 text-center"
              >
                Book Executive Class
              </Link>
              <a
                href="#corporate-fleet"
                className="px-6 py-3 border border-zinc-800 hover:bg-zinc-900 text-zinc-300 font-bold text-sm rounded-xl transition text-center"
              >
                View Luxury Fleet
              </a>
            </div>

            {/* Micro badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-zinc-800/60">
              <div className="space-y-1">
                <span className="block text-white font-bold text-sm">Full Leather</span>
                <span className="block text-zinc-500 text-[10px] uppercase font-semibold">Heated massage seating</span>
              </div>
              <div className="space-y-1">
                <span className="block text-white font-bold text-sm">Corporate Billing</span>
                <span className="block text-zinc-500 text-[10px] uppercase font-semibold">Invoicing & VAT receipts</span>
              </div>
              <div className="space-y-1">
                <span className="block text-white font-bold text-sm">Chauffeurs</span>
                <span className="block text-zinc-500 text-[10px] uppercase font-semibold">Professional attire</span>
              </div>
            </div>
          </div>

          <div className="bg-[#121215] p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white font-display border-b border-zinc-800 pb-3">Corporate Standards</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-gold flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-200 text-sm">Discretion & Trust</h4>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Our professional drivers sign full NDAs and respect our passengers&apos; silence and privacy on every business transit.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-gold flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-200 text-sm">Guaranteed Punctuality</h4>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    With high-priority dispatch and flight-gate monitoring, we guarantee flawless timing for international delegates and meetings.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-gold flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-200 text-sm">Bespoke Standby</h4>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Book dedicated hourly-rate standby service where your chauffeur remains stationed at your immediate call between corporate events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Rates */}
      <section className="py-20 bg-[#09090b]" id="popular-routes">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-gold font-bold text-xs uppercase tracking-wider">Premium Transfers</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
              Popular Executive Rates
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We operate consistent airport shuttle transfers with fully-inclusive prices. Click a route to pre-populate the booking system on our home page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {EXECUTIVE_ROUTES.map((route, i) => (
              <Link 
                key={i}
                href={`/?pickup=${route.fromId}&dropoff=${route.toId}&vehicle=executive`}
                className="group p-6 bg-[#121215] hover:bg-[#1a1a1f] border border-zinc-800/80 hover:border-gold/30 rounded-2xl cursor-pointer transition shadow-md flex flex-col justify-between min-h-[160px]"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] text-zinc-500 font-bold font-mono uppercase">ORIGIN</span>
                  </div>
                  <h4 className="font-bold text-zinc-100 text-sm leading-tight group-hover:text-gold transition">{route.from}</h4>
                  <div className="text-zinc-600 text-xs py-0.5 pl-1">➔</div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] text-zinc-500 font-bold font-mono uppercase">EXECUTIVE GATEWAY</span>
                  </div>
                  <h4 className="font-bold text-zinc-100 text-sm leading-tight group-hover:text-gold transition">{route.to}</h4>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-zinc-800/50 mt-4 text-xs">
                  <span className="text-zinc-500">{route.time} travel</span>
                  <div className="flex items-center gap-1 font-bold">
                    <span className="text-zinc-500 text-[10px]">executive class</span>
                    <span className="text-sm text-gold font-mono">{route.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Luxury Vehicles */}
      <section className="py-20 bg-[#121215]/40 border-y border-zinc-800/50" id="corporate-fleet">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-gold font-bold text-xs uppercase tracking-wider">Premium Fleet</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
              Corporate Showroom Vehicles
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Pristinely valeted inside and out, smoke-free, featuring active passenger climate zone control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {RECOMMENDED_VEHICLES.map((vehicle, i) => (
              <div key={i} className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-lg">{vehicle.name}</h3>
                    <span className="text-[10px] bg-amber-500/10 text-gold px-2 py-0.5 rounded-md font-mono border border-amber-500/20">PREMIUM</span>
                  </div>
                  <p className="text-xs text-zinc-500 font-mono">{vehicle.example}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-zinc-300 py-3 border-y border-zinc-800">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gold" />
                      <span>{vehicle.passengers} Passengers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-gold" />
                      <span>{vehicle.luggage} Suitcases</span>
                    </div>
                  </div>

                  <ul className="space-y-2 pt-2">
                    {vehicle.features.map((feature, fIndex) => (
                      <li key={fIndex} className="text-xs text-zinc-400 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/60 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Rates start at</span>
                    <span className="text-base font-bold text-gold font-mono">{vehicle.priceFrom}</span>
                  </div>
                  <Link 
                    href="/"
                    className="px-4 py-2 bg-zinc-800 hover:bg-gold hover:text-black text-zinc-200 text-xs font-semibold rounded-xl transition"
                  >
                    Select Class
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-[#09090b]">
        <div className="max-w-3xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-gold font-bold text-xs uppercase tracking-wider">Help & Billing</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
              Executive Travel FAQs
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Everything you need to know about setting up professional corporate transport accounts with us.
            </p>
          </div>

          <div className="space-y-4">
            {EXEC_FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          <div className="bg-[#121215] p-6 rounded-3xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-bold text-white text-sm">Need a bespoke multi-stop business itinerary?</h4>
              <p className="text-xs text-zinc-500">Email our executive dispatch desk with your corporate flight lists.</p>
            </div>
            <a 
              href="mailto:bookings@roystonlynxx.co.uk"
              className="bg-gold hover:bg-gold-light text-black font-bold text-xs px-5 py-2.5 rounded-xl transition shrink-0"
            >
              Email Executive Desk
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#0a0a0c] text-zinc-400 border-t border-zinc-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-black font-bold">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-white font-bold tracking-tight text-lg font-display">
                Quick<span className="text-gold">Hop</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500">
              Premium airport transfers and private hire taxis operating across Southampton, Winchester, Hampshire, and major London airports. Fixed, inclusive prices.
            </p>
            <div className="text-xs space-y-1">
              <p className="text-zinc-400">Licensed Private Hire Operator</p>
              <p className="text-zinc-600 font-mono text-[10px]">OPERATOR NO: PH-1849/HAMP</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">Our Services</h4>
            <ul className="text-xs space-y-2">
              <li><Link href="/services/airport-transfers" className="hover:text-gold transition">Airport Transfers</Link></li>
              <li><Link href="/services/seaport-transfers" className="hover:text-gold transition">Cruise Seaports</Link></li>
              <li><span className="text-gold">Executive Class</span></li>
              <li><Link href="/services/long-distance" className="hover:text-gold transition">Long Distance</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">Fleet Classes</h4>
            <ul className="text-xs space-y-2">
              <li><Link href="/" className="hover:text-gold transition">Executive E-Class</Link></li>
              <li><Link href="/" className="hover:text-gold transition">First-Class S-Class</Link></li>
              <li><Link href="/" className="hover:text-gold transition">Premium Corporate Saloon</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white">Support & Contact</h4>
            <div className="text-xs space-y-2 leading-relaxed text-zinc-500">
              <p>Royston Lynxx Booking Centre<br />Southampton Business Park, SO16 7PX<br />Hampshire, United Kingdom</p>
              <p>Hotline: <strong className="text-white">+44 (0) 23 8000 0000</strong></p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-zinc-800 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Royston Lynxx. All rights reserved. Premium Dark Gold Identity.</p>
        </div>
      </footer>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-800 rounded-2xl bg-[#121215]/50 overflow-hidden">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 text-left font-bold text-sm text-white flex justify-between items-center hover:bg-[#121215] transition"
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
            <div className="p-5 pt-0 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800 bg-[#121215]/30">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
