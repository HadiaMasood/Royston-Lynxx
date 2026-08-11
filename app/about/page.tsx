'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Car, Sparkles, Shield, Clock, Star, Users, Phone, Mail, Plane, Anchor,
  ChevronDown, Award, CheckCircle2, MapPin, Users2, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MobileMenu from '@/components/MobileMenu';

export default function AboutUs() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans antialiased flex flex-col">
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
                className="text-sm font-medium text-zinc-400 hover:text-gold transition flex items-center gap-1 py-1 cursor-pointer focus:outline-none"
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

            <Link href="/about" className="text-sm font-medium text-gold border-b-2 border-gold pb-1">About Us</Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-400 hover:text-gold transition">Contact Us</Link>
            <Link href="/ride-with-us" className="text-sm font-medium text-zinc-400 hover:text-gold transition">Ride with Us</Link>
          </nav>

          <Link 
            href="/#booking-portal"
            className="px-5 py-2.5 bg-gold hover:bg-gold-light text-black font-bold text-xs rounded-xl transition"
          >
            Book Transfer
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden border-b border-zinc-800/50">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-gold text-xs font-semibold rounded-full border border-amber-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>Hampshire Licensed Private Hire Operator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
            About <span className="text-gold">Royston Lynxx</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Hampshire&apos;s premier bespoke luxury chauffeur and transfer fleet. We operate with an unwavering commitment to precision, absolute reliability, and transparent flat-rate pricing.
          </p>
          <div className="text-gold font-mono text-xs tracking-wider font-bold">
            LICENSED PRIVATE HIRE OPERATOR NO: PH-1849/HAMP
          </div>
        </div>
      </section>

      {/* Stats Board */}
      <section className="py-12 bg-black/40 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-gold font-display">10,000+</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Trips Completed</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-white font-display">99.8%</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">On-Time Accuracy</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-white font-display">24 / 7</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Service Desk Support</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-gold font-display">4.9 ★</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Customer Rating</div>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block font-mono">Our History</span>
          <h2 className="text-3xl font-bold text-white font-display leading-tight">
            A Journey Rooted in Precision & Quality
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Founded with a vision to redefine airport and cruise transfers in Southampton and across Hampshire, Royston Lynxx has grown from a local car service to a highly trusted corporate travel partner.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We noticed that travelers frequently faced surge pricing, uncoordinated delays, and inconsistent driver standards. We created Royston Lynxx to provide a premium alternative: fixed, inclusive prices, dedicated flight tracking, clean premium vehicles, and uniform-dressed professional chauffeurs.
          </p>
        </div>
        
        <div className="bg-[#121215] rounded-3xl border border-zinc-800/80 shadow-xl overflow-hidden flex flex-col relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl z-20 pointer-events-none" />
          <div className="h-48 relative w-full">
            <img 
              src="https://images.pexels.com/photos/248747/pexels-photo-248747.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Premium Chauffeur" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121215] to-transparent" />
          </div>
          <div className="p-8 space-y-6 -mt-4 relative z-10 bg-[#121215]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
            <span>The Royston Lynxx Guarantee</span>
          </h3>
          <ul className="space-y-4 text-xs text-zinc-300">
            <li className="flex gap-2.5">
              <span className="text-gold font-bold">✓</span>
              <span><strong>Flight-Tracking Coordination:</strong> We synchronize directly with National Air Traffic Services. If your flight is delayed, your driver adapts automatically with zero penalty charge.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-gold font-bold">✓</span>
              <span><strong>Fixed-Rates:</strong> The quote you see is the absolute final price you pay. No toll surprises, no fuel add-ons, and no parking surcharges.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-gold font-bold">✓</span>
              <span><strong>Elite Comfort:</strong> Strictly modern vehicles cleaned and detailed thoroughly before every single dispatch.</span>
            </li>
          </ul>
        </div></div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-black/30 border-t border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-gold font-bold text-xs uppercase tracking-wider block">Our Core Pillars</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
              Why Discerning Travelers Choose Royston Lynxx
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121215]/50 p-8 rounded-2xl border border-zinc-800/40 hover:border-zinc-700/60 transition group space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-black transition duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Safety & Compliance First</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All vehicles pass meticulous council-backed taxi inspection checks twice a year. Every chauffeur undergoes full enhanced DBS background checks and medical clearance.
              </p>
            </div>

            <div className="bg-[#121215]/50 p-8 rounded-2xl border border-zinc-800/40 hover:border-zinc-700/60 transition group space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-black transition duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base font-mono">Punctuality Restored</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We plan dispatches with built-in buffer margins for traffic. Our track record stands at an outstanding 99.8% precision rate across Hampshire.
              </p>
            </div>

            <div className="bg-[#121215]/50 p-8 rounded-2xl border border-zinc-800/40 hover:border-zinc-700/60 transition group space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-black transition duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Refined Executive Fleet</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                From executive long-wheelbase saloons to robust multi-passenger VIP minibuses, our diverse classes cater to corporate, luggage-heavy, and VIP requirements with grace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 bg-gradient-to-tr from-[#121215] to-[#0e0e11] p-12 rounded-3xl border border-zinc-800/80 relative overflow-hidden">
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
          <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
            Experience the Royston Lynxx Difference
          </h2>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Whether arriving on an international flight at London Heathrow or departing on an ocean cruise from Southampton, we ensure your ground transport is absolutely seamless.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/#booking-portal"
              className="bg-gold hover:bg-gold-light text-black font-bold text-xs px-6 py-3.5 rounded-xl transition shadow-md shadow-gold/10"
            >
              Book Premium Transfer
            </Link>
            <Link 
              href="/contact"
              className="border border-zinc-800 hover:bg-zinc-900 text-zinc-300 font-bold text-xs px-6 py-3.5 rounded-xl transition"
            >
              Inquire Corporate Rate
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-black text-zinc-400 border-t border-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-black font-bold">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-white font-bold tracking-tight text-lg font-display">
                Royston <span className="text-gold">Lynxx</span>
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
            <h4 className="font-bold text-sm text-white">Our Service Areas</h4>
            <ul className="text-xs space-y-2">
              <li><Link href="/services/airport-transfers" className="hover:text-gold transition">Airport Transfers</Link></li>
              <li><Link href="/services/seaport-transfers" className="hover:text-gold transition">Cruise Seaports</Link></li>
              <li><Link href="/services/executive-travel" className="hover:text-gold transition">Executive Class Travel</Link></li>
              <li><Link href="/services/long-distance" className="hover:text-gold transition">Long Distance Taxis</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">Company Links</h4>
            <ul className="text-xs space-y-2">
              <li><Link href="/" className="hover:text-gold transition">Book a Ride</Link></li>
              <li><Link href="/about" className="text-gold font-semibold">About Us</Link></li>
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
          <p>© {new Date().getFullYear()} <span className="text-gold">Royston Lynxx</span>. All rights reserved.</p>
          <div className="flex items-center gap-4 text-zinc-700 font-mono text-[10px]">
            <span>Visa</span>
            <span>MasterCard</span>
            <span>American Express</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
