"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/ui/footer-section";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#e8e7e3] text-gray-900 font-sans selection:bg-[#91A57D] selection:text-white">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24"
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question about our furniture or need help with a 3D model? We&apos;re here to help.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Column 1: Contact Information */}
          <div className="bg-[#e8e7e3] p-8 md:p-10 rounded-3xl shadow-sm border border-gray-300 h-fit">
            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#91A57D] text-white p-3 rounded-full shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600 mt-1">123 Furniture Ave, Design District</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#91A57D] text-white p-3 rounded-full shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600 mt-1">support@furnify.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#91A57D] text-white p-3 rounded-full shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-gray-300">
                <div className="bg-[#91A57D] text-white p-3 rounded-full shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Support Hours</h3>
                  <p className="text-gray-600 mt-1">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-md">
            <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent transition-all bg-gray-50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent transition-all bg-gray-50"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent transition-all bg-gray-50"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent transition-all bg-gray-50 resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#91A57D] hover:bg-[#7e916c] text-white font-semibold py-4 rounded-xl transition-colors shadow-sm hover:shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </motion.div>

      <Footer />
    </main>
  );
}