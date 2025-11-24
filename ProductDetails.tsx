
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Zap, Quote, BrainCircuit, Activity, BookOpen, Star, ShieldCheck, ThumbsUp, PenTool, Check, X, Coffee } from 'lucide-react';
import { getHealthAdvice } from '../services/geminiService';
import { ChatMessage, ChatSender } from '../types';
import { INGREDIENTS_DATA, TESTIMONIALS, COMPARISON_FEATURES, ALL_REVIEWS, PRODUCTS } from '../constants';

const ProductDetails: React.FC = () => {
  // Chat State
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: ChatSender.AI,
      text: "Protocol online. I am your Aikyam Bio-Advisor. Do you have questions about Pure Focus+ ingredients or dosing?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: ChatSender.USER,
      text: query,
      timestamp: new Date(),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const responseText = await getHealthAdvice(userMsg.text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: ChatSender.AI,
        text: responseText,
        timestamp: new Date(),
      };
      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="bg-white text-slate-900">
      
      {/* INGREDIENTS / SCIENCE SECTION */}
      <section id="ingredients" className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-3">Clinical Formulation</h2>
             <h3 className="text-3xl font-bold text-slate-900 mb-6">Transparent Science. No Hidden Blends.</h3>
             <p className="text-slate-600 leading-relaxed">
               Most nootropics rely on caffeine and sugar to give you a fake boost. We use clinical dosages of adaptogens and precursors to fuel actual neural performance.
             </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INGREDIENTS_DATA.map((ing, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:border-cyan-100 group">
                 <div className="w-12 h-12 rounded-lg bg-cyan-50 flex items-center justify-center mb-6 group-hover:bg-cyan-100 transition-colors">
                    {i === 0 && <BrainCircuit className="text-cyan-600" />}
                    {i === 1 && <Zap className="text-cyan-600" />}
                    {i === 2 && <Activity className="text-cyan-600" />}
                    {i === 3 && <BookOpen className="text-cyan-600" />}
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-1">{ing.name}</h3>
                 <p className="text-xs text-cyan-600 font-bold mb-3 uppercase tracking-wider">{ing.sub}</p>
                 <p className="text-sm text-slate-500 leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* REVIEWS HIGHLIGHTS */}
      <section id="reviews-highlight" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 font-sans mb-4">Real Customers, Real Results</h2>
            <div className="flex justify-center items-center gap-1 text-yellow-400 mb-2">
               {[...Array(5)].map((_, i) => <Zap key={i} size={20} fill="currentColor" />)}
            </div>
            <p className="text-slate-500 font-medium">Rated 4.9/5 based on 130+ reviews</p>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
               <div key={t.id} className="bg-gray-50 p-8 rounded-2xl relative hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                  <Quote className="absolute top-8 right-8 text-gray-200" size={40} />
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-slate-200">
                        {t.avatar}
                     </div>
                     <div>
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-xs text-green-600 font-bold uppercase tracking-wider flex items-center gap-1">
                           <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> {t.role}
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-1 mb-4 text-yellow-400">
                     {[...Array(5)].map((_, i) => <Zap key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed relative z-10 italic">"{t.content}"</p>
               </div>
            ))}
         </div>
      </section>

      {/* AI ADVISOR SECTION */}
      <section id="advisor" className="py-24 bg-slate-900 relative overflow-hidden text-white">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-900/20 to-transparent"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
                
                {/* Left Side: Copy */}
                <div className="flex-1 space-y-6">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-900/20 text-cyan-300 text-xs font-bold uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                      AI Protocol Advisor
                   </div>
                   <h2 className="text-4xl font-bold text-white">Have questions about the stack?</h2>
                   <p className="text-slate-400 text-lg leading-relaxed">
                      Our custom AI model is trained on the exact biochemical profile of Pure Focus+. Ask it about timing, stacking with coffee, interactions, or specific benefits for your workflow.
                   </p>
                   <div className="flex gap-3 pt-4">
                      <div className="px-4 py-2 bg-slate-800 rounded-lg text-xs font-mono text-cyan-400 border border-slate-700">"Can I take this while fasting?"</div>
                      <div className="px-4 py-2 bg-slate-800 rounded-lg text-xs font-mono text-cyan-400 border border-slate-700 hidden sm:block">"How much Caffeine?"</div>
                   </div>
                </div>

                {/* Right Side: Chat Interface */}
                <div className="flex-1 w-full">
                    <div className="bg-white rounded-xl overflow-hidden shadow-2xl h-[450px] flex flex-col relative border border-slate-700">
                        {/* Header */}
                        <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center gap-3">
                           <Bot size={20} className="text-slate-900" />
                           <div>
                              <div className="text-xs font-bold text-slate-900 tracking-wider uppercase">Aikyam Intelligence</div>
                              <div className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                              </div>
                           </div>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                            {chatHistory.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === ChatSender.USER ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                        msg.sender === ChatSender.USER 
                                        ? 'bg-slate-900 text-white rounded-tr-none' 
                                        : 'bg-gray-100 text-slate-800 rounded-tl-none border border-gray-200'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-gray-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about ingredients, dosage..."
                                    className="flex-1 bg-gray-50 border border-gray-200 text-slate-900 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-cyan-500 focus:border-transparent focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-400"
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={isLoading}
                                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 rounded-lg transition-colors flex items-center justify-center"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* COMPARISON CHECKLIST (Us vs Them) */}
      <section className="pt-24 pb-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 relative">
          
          {/* Satisfaction Guarantee Badge (Absolute positioned) */}
          <div className="hidden lg:flex flex-col items-center justify-center absolute -top-12 -left-16 z-20 w-32 h-32 rounded-full bg-cyan-500 text-white shadow-xl rotate-12 animate-pulse border-4 border-white ring-4 ring-cyan-100">
             <div className="text-center">
                <span className="block text-2xl font-black leading-none">100%</span>
                <span className="block text-[8px] font-bold uppercase tracking-wide leading-tight">Satisfaction<br/>Guarantee</span>
             </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-sans tracking-tight">Goodbye, Caffeine. <br/><span className="text-cyan-500">Hello, Flow Fuel.</span></h2>
            <p className="text-slate-500 text-lg">See why high performers are switching to Pure Focus+</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
             
             {/* Product Column */}
             <div className="flex-1 bg-gradient-to-b from-cyan-50 to-white p-8 md:p-12 relative border-b md:border-b-0 md:border-r border-cyan-100">
                <div className="flex flex-col items-center mb-8">
                   <div className="h-24 w-auto aspect-[3/4] mb-4 relative">
                      {/* Using the first image from gallery as visual reference for the product */}
                      <img src={PRODUCTS[0].images[0]} alt="Pure Focus" className="h-full object-contain drop-shadow-lg" />
                   </div>
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">Pure Focus+</h3>
                   <div className="text-cyan-600 font-bold text-xs uppercase tracking-widest mt-1">The Apex Choice</div>
                </div>
                
                <div className="space-y-6">
                   {COMPARISON_FEATURES.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-700">{item.feature}</span>
                         <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-200">
                            <Check size={18} className="text-white" strokeWidth={3} />
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Competitor Column */}
             <div className="flex-1 bg-gray-50 p-8 md:p-12 grayscale opacity-90">
                <div className="flex flex-col items-center mb-8">
                   <div className="h-24 w-24 mb-4 flex items-center justify-center bg-gray-200 rounded-full text-gray-400">
                      <Coffee size={40} />
                   </div>
                   <h3 className="text-xl font-bold text-gray-500 uppercase tracking-wider">Coffee & Energy Drinks</h3>
                   <div className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">The Old Way</div>
                </div>

                <div className="space-y-6">
                   {COMPARISON_FEATURES.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <span className="text-sm font-medium text-gray-400">{item.feature}</span>
                         <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <X size={18} className="text-gray-400" strokeWidth={3} />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 30-DAY GUARANTEE (MOVED) */}
      <section className="bg-slate-900 text-white py-12">
         <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center shrink-0 border border-cyan-500/30">
               <ShieldCheck size={40} className="text-cyan-400" />
            </div>
            <div>
               <h3 className="text-xl font-bold mb-2">30-Day Money-Back Guarantee</h3>
               <p className="text-slate-400 text-sm max-w-lg">
                  We are confident Pure Focus+ will change the way you work. If you don't feel the difference in your focus and clarity within 30 days, simply contact us for a full refund. No questions asked.
               </p>
            </div>
         </div>
      </section>

      {/* NEW: PRODUCT BUNDLES */}
      <section id="bundles" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900 font-sans">Choose Your Package</h2>
             <p className="text-slate-500 mt-2">Invest in your mind today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-end">
            
            {/* OPTION 1: Try It Out */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
               <div className="aspect-[4/3] mb-6 flex items-center justify-center">
                  <img src="https://cdn.shopify.com/s/files/1/0584/4349/7535/files/Bundle_1.png?v=1762759506" alt="1 Pouch" className="h-full object-contain" />
               </div>
               <h3 className="text-xl font-medium text-slate-900 text-center mb-4 font-serif">Try It Out</h3>
               <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-slate-900 block text-cyan-500">$52.00 <span className="text-sm text-slate-400 uppercase">USD</span></span>
                  <span className="text-sm text-slate-500 block mt-1">1 Pouch (42 Servings)</span>
               </div>
               <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-600"><Check size={16} className="text-green-500 shrink-0" /> Free shipping over $100</li>
                  <li className="flex gap-2 text-sm text-slate-600"><Check size={16} className="text-green-500 shrink-0" /> 30-day money-back guarantee</li>
                  <li className="flex gap-2 text-sm text-slate-600"><Check size={16} className="text-green-500 shrink-0" /> Made in Australia</li>
               </ul>
               <a href={PRODUCTS[0].checkoutUrl} className="block w-full py-4 rounded-full bg-slate-100 text-slate-900 font-bold uppercase tracking-widest text-center hover:bg-slate-200 transition-colors shadow-sm">
                  Get Started
               </a>
            </div>

            {/* OPTION 2: Best Value (Highlighted) */}
            <div className="bg-white rounded-2xl p-6 border-2 border-cyan-500 relative shadow-xl transform scale-105 z-10">
               <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md">
                  Most Popular
               </div>
               <div className="aspect-[4/3] mb-6 flex items-center justify-center relative">
                  <img src="https://cdn.shopify.com/s/files/1/0584/4349/7535/files/Bundle_2.png?v=1762759508" alt="2 Pouches" className="h-full object-contain" />
               </div>
               <h3 className="text-2xl font-medium text-slate-900 text-center mb-4 font-serif">Best Value</h3>
               <div className="text-center mb-2">
                  <span className="text-sm text-slate-400 line-through decoration-red-500">$104.00</span>
                  <span className="text-5xl font-bold text-cyan-500 block">$98.80 <span className="text-sm text-slate-400 uppercase">USD</span></span>
                  <span className="text-sm font-bold text-green-600 block mt-1">Save $5.20 (5% OFF)</span>
                  <span className="text-sm text-slate-500 block mt-1">2 Pouches (84 Servings)</span>
               </div>
               <ul className="space-y-3 mb-8 mt-6">
                  <li className="flex gap-2 text-sm text-slate-800 font-medium"><Check size={16} className="text-green-500 shrink-0" /> Free shipping</li>
                  <li className="flex gap-2 text-sm text-slate-800 font-medium"><Check size={16} className="text-green-500 shrink-0" /> 30-day money-back guarantee</li>
                  <li className="flex gap-2 text-sm text-slate-800 font-medium"><Check size={16} className="text-green-500 shrink-0" /> Made in Australia</li>
                  <li className="flex gap-2 text-sm text-slate-800 font-medium"><Check size={16} className="text-green-500 shrink-0" /> Best for 2-month protocol</li>
               </ul>
               <a href={PRODUCTS[0].checkoutUrl} className="block w-full py-4 rounded-full bg-cyan-500 text-white font-bold uppercase tracking-widest text-center hover:bg-cyan-600 transition-colors shadow-lg hover:shadow-cyan-200">
                  Get Started
               </a>
            </div>

            {/* OPTION 3: Maximum Savings */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
               <div className="aspect-[4/3] mb-6 flex items-center justify-center">
                  <img src="https://cdn.shopify.com/s/files/1/0584/4349/7535/files/Bundle_3.png?v=1762759507" alt="3 Pouches" className="h-full object-contain" />
               </div>
               <h3 className="text-xl font-medium text-slate-900 text-center mb-4 font-serif">Maximum Savings</h3>
               <div className="text-center mb-6">
                  <span className="text-sm text-slate-400 line-through decoration-red-500">$156.00</span>
                  <span className="text-4xl font-bold text-cyan-500 block">$132.60 <span className="text-sm text-slate-400 uppercase">USD</span></span>
                  <span className="text-sm font-bold text-green-600 block mt-1">Save $23.40 (10% OFF)</span>
                  <span className="text-sm text-slate-500 block mt-1">3 Pouches (126 Servings)</span>
               </div>
               <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-600"><Check size={16} className="text-green-500 shrink-0" /> Free shipping</li>
                  <li className="flex gap-2 text-sm text-slate-600"><Check size={16} className="text-green-500 shrink-0" /> 30-day money-back guarantee</li>
               </ul>
               <a href={PRODUCTS[0].checkoutUrl} className="block w-full py-4 rounded-full bg-slate-100 text-slate-900 font-bold uppercase tracking-widest text-center hover:bg-slate-200 transition-colors shadow-sm">
                  Get Started
               </a>
            </div>

          </div>
        </div>
      </section>

      {/* EXPANDED REVIEWS SECTION */}
      <section id="reviews" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
           
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                 <h2 className="text-3xl font-bold text-slate-900 mb-2">Customer Reviews</h2>
                 <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                       {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" className="stroke-none" />)}
                    </div>
                    <span className="font-bold text-slate-900 text-lg">4.9</span>
                    <span className="text-slate-500 text-sm">(130 Reviews)</span>
                 </div>
              </div>
              <button className="bg-black text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-cyan-600 transition-colors flex items-center gap-2 shadow-lg">
                 <PenTool size={14} /> Write a Review
              </button>
           </div>

           <div className="space-y-6">
              {ALL_REVIEWS.map((review) => (
                 <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-6">
                    {/* Avatar side */}
                    <div className="shrink-0 flex md:flex-col items-center gap-3">
                       <div className="w-12 h-12 rounded-full bg-cyan-50 text-cyan-700 font-bold flex items-center justify-center text-lg">
                          {review.avatar}
                       </div>
                       <div className="text-xs font-bold text-green-600 uppercase tracking-wide bg-green-50 px-2 py-1 rounded">Verified</div>
                    </div>
                    {/* Content side */}
                    <div className="flex-1">
                       <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-slate-900">{review.name}</h4>
                          <span className="text-xs text-slate-400">2 days ago</span>
                       </div>
                       <div className="flex text-yellow-400 mb-3">
                          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="stroke-none" />)}
                       </div>
                       <p className="text-slate-600 text-sm leading-relaxed">{review.content}</p>
                       <div className="mt-4 flex gap-4 text-xs text-slate-400 font-medium cursor-pointer">
                          <span className="hover:text-slate-900 flex items-center gap-1"><ThumbsUp size={12} /> Helpful</span>
                          <span className="hover:text-slate-900">Report</span>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-12 text-center">
              <button className="text-slate-900 font-bold underline underline-offset-4 hover:text-cyan-600 transition-colors">Load More Reviews</button>
           </div>

        </div>
      </section>

    </div>
  );
};

export default ProductDetails;
