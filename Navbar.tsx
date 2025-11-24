import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Circle } from 'lucide-react';
import { NAV_LINKS, PRODUCTS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Default to first product's checkout URL or shop root
  const shopUrl = PRODUCTS[0].checkoutUrl || '#product';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-[10px] sm:text-xs font-bold text-center py-2 tracking-widest uppercase">
        Free Shipping Australia Wide for orders over $100 AUD
      </div>

      <nav className={`sticky top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/95 backdrop-blur-md border-gray-200 shadow-sm' : 'bg-white border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Circle size={24} className="text-black" strokeWidth={2.5} />
                <div className="absolute inset-0 bg-cyan-400 blur-md opacity-20 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <span className="text-xl font-bold tracking-[0.2em] text-black uppercase font-sans">
                Aikyam
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-widest font-semibold text-slate-500 hover:text-black hover:underline underline-offset-4 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-6 border-l border-gray-200 pl-6">
                <button className="relative text-slate-600 hover:text-black transition-colors">
                  <ShoppingBag size={20} />
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
                </button>
                <a 
                  href={shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-6 py-2.5 rounded-sm font-bold text-xs tracking-widest uppercase hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-cyan-200"
                >
                  Shop Now
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
               <button className="relative text-slate-800">
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-900 hover:text-cyan-600 focus:outline-none transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl">
            <div className="flex flex-col px-6 py-8 space-y-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-widest text-slate-800 hover:text-cyan-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
              >
                Purchase
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;