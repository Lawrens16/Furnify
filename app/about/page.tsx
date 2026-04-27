"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cuboid, HeartHandshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/ui/footer-section";

const Facebook = ({ size = 20 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const Instagram = ({ size = 20 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#e8e7e3] text-gray-900 font-sans selection:bg-[#91A57D] selection:text-white">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24"
      >
        {/* A. Hero Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6"
          >
            About Furnify
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            We believe in helping you visualize and create your perfect space with modern furniture and interactive 3D technology. Furnify brings the showroom directly into your home.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full rounded-3xl overflow-hidden shadow-2xl relative h-[300px] md:h-[500px]"
          >
            <img
              src="https://placehold.co/1200x500.png"
              alt="Beautiful living space"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* B. Meet the Founders Section */}
        <div className="mb-24 md:mb-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">
            Meet the Founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 max-w-5xl mx-auto">
            {/* Founder 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="flex flex-col items-center text-center bg-white p-10 rounded-t-[4rem] rounded-b-[2rem] shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src="https://placehold.co/400x400.png"
                alt="Lawrence Magnetico"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover mb-8 shadow-lg border-4 border-[#e8e7e3]"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Lawrence Magnetico</h3>
              <p className="text-[#91A57D] font-medium uppercase tracking-widest text-sm mb-6">
                Co-Founder
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/Magneticlaww/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#e8e7e3] text-gray-600 hover:text-white hover:bg-[#91A57D] p-3 rounded-full transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/ren_laww/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#e8e7e3] text-gray-600 hover:text-white hover:bg-[#91A57D] p-3 rounded-full transition-colors"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </motion.div>

            {/* Founder 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="flex flex-col items-center text-center bg-white p-10 rounded-t-[4rem] rounded-b-[2rem] shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src="https://placehold.co/400x400.png"
                alt="John Paul Macanas"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover mb-8 shadow-lg border-4 border-[#e8e7e3]"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">John Paul Macanas</h3>
              <p className="text-[#91A57D] font-medium uppercase tracking-widest text-sm mb-6">
                Co-Founder
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/johnpaul.macanas.98"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#e8e7e3] text-gray-600 hover:text-white hover:bg-[#91A57D] p-3 rounded-full transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/paulgorithm_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#e8e7e3] text-gray-600 hover:text-white hover:bg-[#91A57D] p-3 rounded-full transition-colors"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* C. Core Values/Story */}
        <div className="bg-[#91A57D] text-white rounded-[3rem] p-12 md:p-16 shadow-lg">
          <div className="text-center mb-16">
            <span className="uppercase tracking-widest text-sm font-bold text-white/80 mb-4 block">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white/90">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-5 rounded-full mb-6 backdrop-blur-md shadow-sm">
                <ShieldCheck size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Quality Craftsmanship</h3>
              <p className="leading-relaxed">
                We source only the finest materials, ensuring that every piece of furniture we deliver is built to last and designed to impress.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-5 rounded-full mb-6 backdrop-blur-md shadow-sm">
                <Cuboid size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Interactive 3D Experience</h3>
              <p className="leading-relaxed">
                Say goodbye to guesswork. Our immersive 3D technology allows you to view textures, spin models, and perfectly match furniture to your space.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-5 rounded-full mb-6 backdrop-blur-md shadow-sm">
                <HeartHandshake size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Customer Satisfaction</h3>
              <p className="leading-relaxed">
                From browsing our catalog to final delivery, providing exceptional customer service and support is at the core of everything we do.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </main>
  );
}