"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Truck, Headset, ShieldCheck, Sparkles } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Center, Bounds } from "@react-three/drei";
import { Suspense } from "react";

function Chair({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#cbbda8" roughness={0.55} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.7, -0.2]}>
        <boxGeometry args={[0.5, 0.6, 0.08]} />
        <meshStandardMaterial color="#b8aa96" roughness={0.6} />
      </mesh>
      {[
        [-0.18, 0.2, -0.18],
        [0.18, 0.2, -0.18],
        [-0.18, 0.2, 0.18],
        [0.18, 0.2, 0.18],
      ].map((leg, index) => (
        <mesh key={index} castShadow receiveShadow position={leg as [number, number, number]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
          <meshStandardMaterial color="#7f6f5d" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function DiningSet() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.75, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.08, 48]} />
        <meshStandardMaterial color="#e7ddcf" roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.5, 24]} />
        <meshStandardMaterial color="#a8947f" roughness={0.6} />
      </mesh>
      {[
        [-0.7, 0.25, -0.7],
        [0.7, 0.25, -0.7],
        [-0.7, 0.25, 0.7],
        [0.7, 0.25, 0.7],
      ].map((leg, index) => (
        <mesh key={index} castShadow receiveShadow position={leg as [number, number, number]}>
          <cylinderGeometry args={[0.06, 0.07, 0.5, 18]} />
          <meshStandardMaterial color="#8a7561" roughness={0.6} />
        </mesh>
      ))}

      <Chair position={[-1.25, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Chair position={[1.25, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Chair position={[0, 0, -1.25]} rotation={[0, 0, 0]} />
      <Chair position={[0, 0, 1.25]} rotation={[0, Math.PI, 0]} />

      <mesh castShadow receiveShadow position={[0.7, 0.35, 0.6]}>
        <cylinderGeometry args={[0.05, 0.06, 0.7, 20]} />
        <meshStandardMaterial color="#c2b59b" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.7, 0.8, 0.6]}>
        <coneGeometry args={[0.28, 0.35, 24]} />
        <meshStandardMaterial color="#f2eee7" roughness={0.25} emissive="#f6f0e8" emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

export default function HeroSection() {
  return (
    <section className="w-full px-4 md:px-8 pb-12 pt-4 bg-[#e8e7e3]">
      {/* Hero Container */}
      <div className="relative w-full rounded-t-[3rem] rounded-bl-[4rem] rounded-br-3xl bg-[#91A57D] overflow-hidden min-h-[600px] flex flex-col items-center justify-between text-white shadow-xl">
        
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter w-full max-w-4xl mx-auto leading-tight drop-shadow-md">
            Discover Your Perfect Space
          </h1>
        </motion.div>

        {/* Hero Visual Area */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          // Change the min-h values here to control the green card height
          className="relative w-full max-w-6xl px-4 mt-8 flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-[430px] flex items-center justify-center z-0 rounded-t-3xl"
        >
          <div className="h-full w-full max-w-4xl rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_rgba(167,184,153,0.25)_45%,_rgba(145,165,125,0.2)_100%)]" />
        </motion.div>

        {/* Floating Card: Furniture Design Ideas */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute left-8 bottom-32 md:bottom-48 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xs md:max-w-sm text-gray-900 border border-white/20"
        >
          <div className="flex items-center gap-2 mb-2 text-[#91A57D]">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Premium Collection</span>
          </div>
          <h3 className="font-bold text-lg mb-2">Furniture Design Ideas</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            Explore our curated collections of modern interiors.
          </p>
          <button className="flex items-center gap-2 text-[#91A57D] font-semibold text-sm hover:underline group">
            Shop Now <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>

      {/* Feature Bar */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto px-4">
        {[
          { icon: <ShoppingBag size={24} />, text: "Easy For Shopping" },
          { icon: <Truck size={24} />, text: "Fast & Free Shipping" },
          { icon: <Headset size={24} />, text: "24/7 Support" },
          { icon: <ShieldCheck size={24} />, text: "Money Back Guarantee" },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow cursor-default"
          >
            <div className="text-[#91A57D] mb-3 bg-[#e8e7e3] p-3 rounded-full">
              {feature.icon}
            </div>
            <p className="font-semibold text-gray-800 text-sm md:text-base">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}