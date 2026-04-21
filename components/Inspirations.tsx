"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Inspirations() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "The 3D view feature completely changed how I shop for furniture. Being able to see the exact size and texture of the sofa before buying meant it fit perfectly in my living room. Outstanding quality too!",
      name: "Sarah Jenkins",
      role: "Interior Designer",
      image: "https://placehold.co/100x100.png",
    },
    {
      id: 2,
      text: "Furnify has amazing customer service and fast shipping. The olive green accent chair I bought matched their 3D model perfectly. I couldn't be happier with the fast delivery and easy assembly.",
      name: "Michael Chen",
      role: "Homeowner",
      image: "https://placehold.co/100x100.png",
    },
    {
      id: 3,
      text: "I was skeptical about buying an expensive dining table online, but Furnify's modern selection and realistic textures gave me confidence. It looks incredible and sturdy in real life.",
      name: "Emily Rodriguez",
      role: "Architect",
      image: "https://placehold.co/100x100.png",
    },
  ];

  const handlePrev = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full px-4 md:px-8 py-16 bg-[#e8e7e3]">
      <div className="max-w-7xl mx-auto">
        
        {/* Inspirations Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              70+ Unique <br /> Furniture <br /> Inspirations
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our designer has carefully curated a lot of beautiful prototypes of rooms that inspire you. Browse through our immersive 3D gallery to find the perfect modern aesthetic for your home.
            </p>
            <button className="bg-[#91A57D] text-white font-semibold flex items-center gap-2 px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#7e916c] transition-all group">
              Explore More
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Gallery / Carousel Placeholder */}
          <div className="lg:w-2/3 flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scroll-bar">
            {/* Main Image */}
            <div className="min-w-[280px] md:min-w-[400px] h-[500px] flex-shrink-0 snap-center relative rounded-3xl overflow-hidden shadow-xl group">
              <img src="https://placehold.co/400x500.png" alt="Inspiration 1" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                 <div>
                   <h4 className="font-bold text-gray-900 text-sm">Minimalist Bedroom</h4>
                   <p className="text-xs text-gray-500">2 Items</p>
                 </div>
                 <button className="w-10 h-10 rounded-full bg-[#91A57D] text-white flex items-center justify-center hover:scale-110 transition-transform">
                   <ArrowRight size={16} />
                 </button>
              </div>
            </div>

            {/* Smaller Gallery Images */}
            <div className="min-w-[240px] md:min-w-[320px] h-[450px] mt-12 flex-shrink-0 snap-center relative rounded-3xl overflow-hidden shadow-lg group">
              <img src="https://placehold.co/320x450.png" alt="Inspiration 2" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>

            <div className="min-w-[240px] md:min-w-[320px] h-[450px] mt-12 flex-shrink-0 snap-center relative rounded-3xl overflow-hidden shadow-lg group">
              <img src="https://placehold.co/320x450.png" alt="Inspiration 3" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="md:w-1/3">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
               Our Clients <br /> Beautiful Words
             </h2>
             <p className="text-gray-600">
               Don&apos;t just take our word for it—see what our satisfied customers have to say about their Furnify experience.
             </p>
          </div>
          
          <div className="md:w-2/3 relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[#f8f8f6] p-8 md:p-12 rounded-3xl relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 left-8 text-[#91A57D]/20 text-6xl font-serif leading-none rotate-180">
                &#10077;
              </div>
              
              <div className="relative z-10 pl-4 md:pl-8">
                <p className="text-lg md:text-xl text-gray-800 italic mb-8 leading-relaxed font-medium">
                  {testimonials[currentTestimonial].text}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name} 
                      className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-white"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-sm text-gray-500">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#91A57D] hover:text-white hover:border-[#91A57D] transition-all shadow-sm"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full border border-[#91A57D] bg-[#91A57D] text-white flex items-center justify-center hover:bg-[#7e916c] hover:border-[#7e916c] transition-all shadow-sm"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2 rounded-full transition-all ${currentTestimonial === idx ? 'w-8 bg-[#91A57D]' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}