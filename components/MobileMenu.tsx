"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Plane, Anchor, Sparkles, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-zinc-300 hover:text-gold transition p-2 focus:outline-none bg-[#121215] rounded-xl border border-zinc-800"
        aria-label="Toggle Mobile Menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: -10, scale: 0.95, x: '-50%' }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 w-[92vw] max-w-[340px] bg-[#0e0e11] border border-zinc-800 rounded-2xl shadow-2xl p-2 flex flex-col z-[100]"
          >
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <Link href="/" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-bold text-white hover:bg-zinc-800/50 rounded-lg transition">Home</Link>
              
              <div className="bg-zinc-900/50 rounded-lg p-1">
                <button 
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between py-2 px-2 text-sm font-bold text-white"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-gold' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-0.5 mt-1"
                    >
                      <Link href="/services/airport-transfers" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2 px-3 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition">
                        <Plane className="w-3.5 h-3.5 text-gold" /> Airport Transfers
                      </Link>
                      <Link href="/services/seaport-transfers" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2 px-3 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition">
                        <Anchor className="w-3.5 h-3.5 text-gold" /> Cruise Seaports
                      </Link>
                      <Link href="/services/executive-travel" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2 px-3 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition">
                        <Sparkles className="w-3.5 h-3.5 text-gold" /> Executive Travel
                      </Link>
                      <Link href="/services/long-distance" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2 px-3 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition">
                        <Car className="w-3.5 h-3.5 text-gold" /> Long Distance Taxis
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/about" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-bold text-white hover:bg-zinc-800/50 rounded-lg transition">About Us</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-bold text-white hover:bg-zinc-800/50 rounded-lg transition">Contact Us</Link>
              <Link href="/ride-with-us" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-bold text-white hover:bg-zinc-800/50 rounded-lg transition">Ride with Us</Link>
              <Link href="/#fleet" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-bold text-white hover:bg-zinc-800/50 rounded-lg transition">Fleet</Link>
              <Link href="/#faqs" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-bold text-white hover:bg-zinc-800/50 rounded-lg transition">FAQs</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
