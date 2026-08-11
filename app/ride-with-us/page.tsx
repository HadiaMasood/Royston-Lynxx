'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Car, Sparkles, Shield, Clock, Users, Phone, Mail, Plane, Anchor,
  ChevronDown, Award, CheckCircle2, UserCheck, FileCheck, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MobileMenu from '@/components/MobileMenu';

export default function RideWithUs() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    badgeNumber: '',
    council: 'Southampton City Council',
    vehicleModel: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Please fill in all required contact details.');
      return;
    }
    // Simulate partner application submission success
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

            <Link href="/about" className="text-sm font-medium text-zinc-400 hover:text-gold transition">About Us</Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-400 hover:text-gold transition">Contact Us</Link>
            <Link href="/ride-with-us" className="text-sm font-medium text-gold border-b-2 border-gold pb-1">Ride with Us</Link>
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
      <section className="relative py-24 overflow-hidden border-b border-zinc-800/50">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-gold text-xs font-semibold rounded-full border border-amber-500/20">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Driver Careers & Fleet Partners</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
            Drive & Earn with <span className="text-gold">Royston Lynxx</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Maximize your weekly revenue by partnering with Hampshire&apos;s premier luxury long-distance airport & cruise transfer operator. Flexible calendars, high-end fares, and premium support.
          </p>
        </div>
      </section>

      {/* Benefits cards */}
      <section className="py-20 max-w-6xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121215] p-8 rounded-2xl border border-zinc-800/80 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">Top-Tier Chauffeur Rates</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Our luxury airport and seaport cruise bookings yield significantly higher payouts than standard city street-hail taxi runs. Enjoy consistent corporate-backed fares.
          </p>
        </div>

        <div className="bg-[#121215] p-8 rounded-2xl border border-zinc-800/80 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">Absolute Dispatch Control</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            No forced dispatches or weekly minimum targets. Use our digital companion app to set your shift availability and lock in your own custom schedule effortlessly.
          </p>
        </div>

        <div className="bg-[#121215] p-8 rounded-2xl border border-zinc-800/80 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">Flight Delay Protection</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Our centralized automated air-traffic tracking notifies your dashboard in real-time. Never experience wasted driving runs or uncoordinated arrivals.
          </p>
        </div>
      </section>

      {/* Two Columns Requirements and application */}
      <section className="py-20 bg-black/40 border-t border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-gold font-bold text-xs uppercase tracking-wider block font-mono">Prerequisites</span>
              <h2 className="text-3xl font-extrabold text-white font-display">
                Who We Are Looking For
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                We set an exceptionally high bar for our partners to maintain our premium reputation among corporate travelers and vacationing cruise passengers in Hampshire.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-gold" />
                <span>Onboarding Checklist</span>
              </h3>
              <ul className="space-y-3.5 text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <span><strong>Private Hire Badge:</strong> Must hold a valid private hire badge issued by Southampton City, Winchester, Eastleigh, Portsmouth, or Test Valley.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <span><strong>Clean Driving Record:</strong> Minimum 3 years holding a UK driving license with no active major driving endorsements.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <span><strong>Premium Vehicle:</strong> Saloon, Estate, or VIP MPV vehicle (Mercedes, BMW, Audi, or similar luxury models) no older than 6 years, thoroughly detailed.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <span><strong>Professional Attitude:</strong> Uniformed dress-code (suit and tie) is mandatory for all executive chauffeur client journeys.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column Onboarding Form (7 columns) */}
          <div className="lg:col-span-7">
            <div className="bg-[#121215] p-8 md:p-10 rounded-3xl border border-zinc-800/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />

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
                      <h3 className="text-2xl font-bold text-white font-display">Apply to Partner</h3>
                      <p className="text-xs text-zinc-400">Complete our fast chauffeur registration form. Our partner relations manager will review and respond within 24 hours.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">First Name <span className="text-rose-500">*</span></label>
                        <input 
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          placeholder="John"
                          className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">Last Name <span className="text-rose-500">*</span></label>
                        <input 
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          placeholder="Doe"
                          className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">Email Address <span className="text-rose-500">*</span></label>
                        <input 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="john.doe@example.com"
                          className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">Mobile Phone <span className="text-rose-500">*</span></label>
                        <input 
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+44 7123 456789"
                          className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">Licensing Council Badge</label>
                        <select 
                          value={formData.council}
                          onChange={(e) => setFormData({...formData, council: e.target.value})}
                          className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white"
                        >
                          <option value="Southampton City Council">Southampton City Council</option>
                          <option value="Winchester City Council">Winchester City Council</option>
                          <option value="Eastleigh Borough Council">Eastleigh Borough Council</option>
                          <option value="Portsmouth City Council">Portsmouth City Council</option>
                          <option value="New Forest District Council">New Forest District Council</option>
                          <option value="Other UK Council">Other UK Council</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">Badge/Operator License No.</label>
                        <input 
                          type="text"
                          value={formData.badgeNumber}
                          onChange={(e) => setFormData({...formData, badgeNumber: e.target.value})}
                          placeholder="PHD-9988"
                          className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">Vehicle Make, Model & Year (e.g., Mercedes E-Class 2022)</label>
                      <input 
                        type="text"
                        value={formData.vehicleModel}
                        onChange={(e) => setFormData({...formData, vehicleModel: e.target.value})}
                        placeholder="Mercedes E220d (2021)"
                        className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">Short Introduction / Experience (Optional)</label>
                      <textarea 
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us briefly about your driving experience or details of your private hire background..."
                        className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold transition text-white resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-gold hover:bg-gold-light text-black font-bold rounded-xl transition shadow-md shadow-gold/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Submit Driver Application</span>
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
                      <h3 className="text-2xl font-bold text-white font-display">Application Received</h3>
                      <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                        Excellent, <strong>{formData.firstName}</strong>! Your partner inquiry has been processed. Our Hampshire Driver Relations team will contact you via <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> to arrange an interview.
                      </p>
                    </div>
                    <button 
                      onClick={() => { setSubmitted(false); setFormData({ firstName: '', lastName: '', email: '', phone: '', badgeNumber: '', council: 'Southampton City Council', vehicleModel: '', message: '' }); }}
                      className="px-6 py-2.5 border border-zinc-800 hover:bg-zinc-900 rounded-xl text-xs text-zinc-300 font-semibold transition"
                    >
                      Apply for another driver
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              <li><Link href="/contact" className="hover:text-gold transition">Contact Us</Link></li>
              <li><Link href="/ride-with-us" className="text-gold font-semibold">Ride with Us / Drivers</Link></li>
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
