'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Car, Sparkles, Shield, Clock, Users, Phone, Mail, Plane, Anchor,
  ChevronDown, MapPin, Send, HelpCircle, MessageSquare, AlertCircle, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MobileMenu from '@/components/MobileMenu';

export default function ContactUs() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    // Simulate real database or API submission success
    setSubmitted(true);
  };

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
          <nav className="hidden md:flex items-center gap-6">
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

            <Link href="/about" className="text-sm font-medium text-zinc-400 hover:text-gold transition">About Us</Link>
            <Link href="/contact" className="text-sm font-medium text-gold border-b-2 border-gold pb-1">Contact Us</Link>
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

      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden border-b border-zinc-800/50">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block font-mono">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
            Contact <span className="text-gold">Royston Lynxx</span>
          </h1>
          <p className="text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Hampshire booking office desk operating 24 hours a day, 7 days a week. Contact our support or billing desks.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Info Side (5 columns) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#121215] p-8 rounded-3xl border border-zinc-800/80 space-y-6">
            <h2 className="text-xl font-bold text-white font-display">Hampshire Office</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              If you have complex itineraries, multivehicle requirements, or require invoice-backed corporate accounts, please reach out directly or schedule an office consult.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Hampshire Booking Desk</div>
                  <div className="text-sm font-semibold text-white mt-0.5">+44 (0) 23 8000 0000</div>
                  <div className="text-[10px] text-zinc-500">Available 24 hours a day for immediate bookings</div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Email Communication</div>
                  <a href="mailto:bookings@roystonlynxx.co.uk" className="text-sm font-semibold text-gold hover:underline block mt-0.5">bookings@roystonlynxx.co.uk</a>
                  <a href="mailto:accounts@roystonlynxx.co.uk" className="text-xs text-zinc-400 hover:underline block mt-1">accounts@roystonlynxx.co.uk (Billing)</a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Office Headquarters</div>
                  <div className="text-sm font-semibold text-white mt-0.5 leading-relaxed">
                    Royston Lynxx Booking Centre<br />
                    Southampton Business Park, SO16 7PX<br />
                    Hampshire, United Kingdom
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/30 p-6 rounded-2xl border border-zinc-900 flex gap-4 items-center">
            <HelpCircle className="w-10 h-10 text-gold shrink-0" />
            <div className="space-y-1">
              <h4 className="font-bold text-white text-xs">Need an immediate ride?</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">Use our fully functional booking portal on the home page for guaranteed dynamic fare pricing and rapid automatic dispatch.</p>
            </div>
          </div>
        </div>

        {/* Form Side (7 columns) */}
        <div className="lg:col-span-7">
          <div className="bg-[#121215] p-8 md:p-10 rounded-3xl border border-zinc-800/80 relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white font-display">Send a Message</h2>
                    <p className="text-xs text-zinc-400">Our customer team responds to all email inquiries within 2 hours.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">Your Full Name <span className="text-rose-500">*</span></label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">Your Email Address <span className="text-rose-500">*</span></label>
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">Phone Number (Optional)</label>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+44 7123 456789"
                        className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">Subject</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Corporate Account">Corporate Account Request</option>
                        <option value="Lost Property">Lost Property</option>
                        <option value="Custom Quote Request">Custom Route Quote</option>
                        <option value="Driver Careers">Driver / Partner Careers</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Message / Route Specifications <span className="text-rose-500">*</span></label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Enter the details of your request or itinerary..."
                      className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-gold hover:bg-gold-light text-black font-bold rounded-xl transition shadow-md shadow-gold/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Secure Message</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-6 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 text-gold border border-gold flex items-center justify-center animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white font-display">Inquiry Transmitted</h3>
                    <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong>{formData.name}</strong>. Your message regarding &ldquo;<strong>{formData.subject}</strong>&rdquo; has been secured. Our Hampshire dispatch team will respond via <strong>{formData.email}</strong> shortly.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setSubmitted(false); setFormData({ name:'', email:'', phone:'', subject:'General Inquiry', message:'' }); }}
                    className="px-6 py-2.5 border border-zinc-800 hover:bg-zinc-900 rounded-xl text-xs text-zinc-300 font-semibold transition"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
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
              <li><Link href="/about" className="hover:text-gold transition">About Us</Link></li>
              <li><Link href="/contact" className="text-gold font-semibold">Contact Us</Link></li>
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
