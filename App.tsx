import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-cyan-200 selection:text-black font-sans">
      <Navbar />
      <main>
        <Hero />
        <ProductDetails />
      </main>
      
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-center md:text-left">
              <span className="text-xl font-bold tracking-[0.2em] text-slate-900 uppercase font-sans">Aikyam</span>
              <p className="text-slate-400 text-xs mt-2">© 2024 Apex Human Inc. All rights reserved.</p>
           </div>
           <div className="flex gap-8 text-xs text-slate-500 uppercase tracking-widest font-semibold">
              <a href="#" className="hover:text-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-black transition-colors">Terms</a>
              <a href="#" className="hover:text-black transition-colors">Contact</a>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;