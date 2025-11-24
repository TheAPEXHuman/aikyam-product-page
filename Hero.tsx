import React, { useState } from 'react';
import { Star, Check, ChevronDown, ShieldCheck, Truck, CreditCard, Leaf, Zap, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, ACCORDION_DATA } from '../constants';

const Hero: React.FC = () => {
  const product = PRODUCTS[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [purchaseOption, setPurchaseOption] = useState<'buy1' | 'buy3' | 'sub'>('buy1');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description');
  const [quantity, setQuantity] = useState(1);

  // Pricing Logic
  const priceBuy1 = 69.99;
  const priceBuy3 = 178.47; 
  const priceSub = 59.49;

  const getCurrentPrice = () => {
    switch (purchaseOption) {
      case 'buy3': return priceBuy3;
      case 'sub': return priceSub * quantity;
      default: return priceBuy1 * quantity;
    }
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <section id="product" className="relative pt-12 pb-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb (Visual only) */}
        <div className="text-xs text-slate-400 mb-8 uppercase tracking-wider font-semibold">
           Home / Shop / <span className="text-slate-900">Pure Focus+</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: PRODUCT IMAGE GALLERY */}
          <div className="lg:col-span-7">
             <div className="flex flex-col-reverse md:flex-row gap-4 mb-8">
                
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible py-2 md:py-0 w-full md:w-24 shrink-0 no-scrollbar">
                  {product.images.map((img, i) => (
                     <div 
                        key={i} 
                        onClick={() => setActiveImageIndex(i)}
                        className={`
                          relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all
                          ${activeImageIndex === i ? 'border-cyan-500 ring-2 ring-cyan-100' : 'border-gray-200 hover:border-gray-300'}
                        `}
                     >
                        <img src={img} alt={`View ${i+1}`} className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>

                {/* Main Image Stage */}
                <div className="flex-1 relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 group">
                   <img 
                      src={product.images[activeImageIndex]} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-multiply p-4 transition-transform duration-500 group-hover:scale-105" 
                   />

                   {/* Gallery Controls (Mobile/Desktop Hover) */}
                   <button 
                      onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                      <ChevronLeft size={24} />
                   </button>
                   <button 
                      onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                      <ChevronRight size={24} />
                   </button>
                </div>
             </div>

             {/* Value Props / Trust Badges */}
             <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-100">
                <div className="flex flex-col items-center text-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center"><Leaf size={18} className="text-green-600" /></div>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Vegan Friendly</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center"><ShieldCheck size={18} className="text-blue-600" /></div>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Lab Tested</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center"><Award size={18} className="text-purple-600" /></div>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">GMP Certified</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center"><Zap size={18} className="text-yellow-600" /></div>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Stimulant Free</span>
                </div>
             </div>
          </div>

          {/* RIGHT COLUMN: DETAILS & BUY BOX */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 space-y-6">
              
              {/* Header Info */}
              <div className="space-y-3 pb-2">
                <div className="flex items-center gap-2">
                   <div className="flex text-amber-400">
                     {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="stroke-none" />)}
                   </div>
                   <span className="text-slate-500 text-xs font-medium underline underline-offset-2">{product.reviews} Verified Reviews</span>
                </div>
                
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
                  {product.name}
                </h1>
                <p className="text-slate-500 text-sm font-medium">{product.tagline}</p>

                <p className="text-sm font-bold text-cyan-700 bg-cyan-50 inline-block px-3 py-1 rounded-sm">
                   Australia's #1 Natural ADHD & Cognitive Support Supplement
                </p>
                
                {/* Bullets */}
                <ul className="space-y-2 pt-2">
                   {product.features.map((feature, i) => (
                     <li key={i} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                        <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                        {feature}
                     </li>
                   ))}
                </ul>
              </div>

              {/* BUY BOX */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-5 space-y-4">
                
                {/* Buy 3 Option */}
                <div 
                  className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${purchaseOption === 'buy3' ? 'border-cyan-500 bg-cyan-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setPurchaseOption('buy3')}
                >
                   <div className="absolute -top-3 right-4 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Most Popular
                   </div>
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseOption === 'buy3' ? 'border-cyan-500' : 'border-gray-300'}`}>
                            {purchaseOption === 'buy3' && <div className="w-2.5 h-2.5 rounded-full bg-cyan-500"></div>}
                         </div>
                         <div>
                            <span className="font-bold text-slate-900 text-sm">Buy 3 & Save $21.00</span>
                            <span className="block text-xs text-slate-500">3 Month Supply - Total Cognitive Reset</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="font-bold text-slate-900 text-lg">${priceBuy3}</span>
                         <span className="block text-xs text-red-500 line-through font-medium">$199.47</span>
                      </div>
                   </div>
                </div>

                {/* Subscription Option */}
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${purchaseOption === 'sub' ? 'border-cyan-500 bg-cyan-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setPurchaseOption('sub')}
                >
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseOption === 'sub' ? 'border-cyan-500' : 'border-gray-300'}`}>
                            {purchaseOption === 'sub' && <div className="w-2.5 h-2.5 rounded-full bg-cyan-500"></div>}
                         </div>
                         <div>
                            <span className="font-bold text-slate-900 text-sm">Subscribe & Save 15%</span>
                            {purchaseOption === 'sub' && (
                                <div className="mt-2 text-xs text-cyan-700 font-medium">
                                   ✓ Cancel anytime   ✓ Free shipping
                                </div>
                            )}
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="font-bold text-slate-900 text-lg">${priceSub}</span>
                         <span className="block text-xs text-slate-500">/ pouch</span>
                      </div>
                   </div>
                </div>

                {/* Single Purchase */}
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${purchaseOption === 'buy1' ? 'border-cyan-500 bg-cyan-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setPurchaseOption('buy1')}
                >
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseOption === 'buy1' ? 'border-cyan-500' : 'border-gray-300'}`}>
                            {purchaseOption === 'buy1' && <div className="w-2.5 h-2.5 rounded-full bg-cyan-500"></div>}
                         </div>
                         <span className="font-bold text-slate-900 text-sm">One-time purchase</span>
                      </div>
                      <span className="font-bold text-slate-900 text-lg">${priceBuy1}</span>
                   </div>
                </div>

                {/* Main CTA */}
                <a 
                   href={product.checkoutUrl || '#'}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block w-full text-center bg-black hover:bg-slate-800 text-white font-bold uppercase tracking-widest py-4 rounded-lg transition-all shadow-lg hover:shadow-xl transform active:scale-[0.99]"
                >
                   Add to Cart - ${getCurrentPrice().toFixed(2)}
                </a>

                {/* Guarantee Banner */}
                <div className="bg-gray-50 p-3 rounded text-center border border-gray-100">
                   <p className="text-xs text-slate-600 font-medium flex items-center justify-center gap-2">
                      <ShieldCheck size={14} className="text-green-600" /> 
                      30-Day Money Back Guarantee. Risk Free.
                   </p>
                </div>

              </div>

              {/* Accordions */}
              <div className="pt-2">
                 {Object.entries(ACCORDION_DATA).map(([key, content]) => (
                   <div key={key} className="border-b border-gray-200">
                      <button 
                         className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 px-2 transition-colors group" 
                         onClick={() => setActiveAccordion(activeAccordion === key ? null : key)}
                      >
                         <span className="text-sm font-bold text-slate-900 capitalize group-hover:text-cyan-700 transition-colors">
                           {key.replace(/([A-Z])/g, ' $1').trim()}
                         </span>
                         <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${activeAccordion === key ? 'rotate-180 text-cyan-600' : ''}`} />
                      </button>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === key ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
                      >
                         <div 
                           className="px-2 text-sm text-slate-600 leading-relaxed space-y-2"
                           dangerouslySetInnerHTML={{ __html: content }} 
                         />
                      </div>
                   </div>
                 ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;