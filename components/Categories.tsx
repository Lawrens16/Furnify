"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

type CategoryKind = "table" | "chair" | "light";

function TableModel() {
  return (
    <group position={[0, -0.25, 0]}>
      {/* Dark Modern Stone Top */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.05, 64]} />
        <meshStandardMaterial color="#2c2c2c" roughness={0.15} metalness={0.2} />
      </mesh>
      {/* Luxury Metallic Rim */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <torusGeometry args={[0.72, 0.025, 16, 64]} />
        <meshStandardMaterial color="#cfa461" roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Ribbed Wooden Pedestal Base */}
      <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.26, 0.36, 0.58, 48]} />
        <meshStandardMaterial color="#4a3b2c" roughness={0.7} />
      </mesh>
      
      {/* Centerpiece Decorative Bowl */}
      <mesh castShadow receiveShadow position={[0, 0.64, 0]}>
        <sphereGeometry args={[0.18, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e3ddd5" roughness={0.3} metalness={0.1} side={2} />
      </mesh>
    </group>
  );
}

function ChairModel() {
  return (
    <group position={[0, -0.25, 0]}>
      {/* Luxury Velvet Seat Cushion */}
      <mesh castShadow receiveShadow position={[0, 0.35, 0.05]}>
        <cylinderGeometry args={[0.38, 0.38, 0.12, 48]} />
        <meshStandardMaterial color="#556b50" roughness={0.9} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.41, 0.05]}>
        <torusGeometry args={[0.36, 0.02, 16, 48]} />
        <meshStandardMaterial color="#556b50" roughness={0.9} />
      </mesh>
      
      {/* Sweeping Velvet Backrest/Armrest */}
      <mesh castShadow receiveShadow position={[0, 0.55, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.14, 32, 64, Math.PI]} />
        <meshStandardMaterial color="#556b50" roughness={0.9} />
      </mesh>
      {/* Seamless armrest caps */}
      <mesh castShadow receiveShadow position={[-0.38, 0.43, 0.05]}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#556b50" roughness={0.9} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.38, 0.43, 0.05]}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#556b50" roughness={0.9} />
      </mesh>

      {/* Sleek Matte Metal Legs */}
      {[
        [-0.22, 0.175, 0.22, 0.1, 0, 0.1],
        [0.22, 0.175, 0.22, 0.1, 0, -0.1],
        [-0.22, 0.175, -0.15, -0.1, 0, 0.1],
        [0.22, 0.175, -0.15, -0.1, 0, -0.1],
      ].map((leg, index) => (
        <mesh key={index} castShadow receiveShadow position={[leg[0], leg[1], leg[2]]} rotation={[leg[3], leg[4], leg[5]]}>
          <cylinderGeometry args={[0.015, 0.01, 0.35, 16]} />
          <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function LampModel() {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Solid Black Minimalist Base */}
      <mesh castShadow receiveShadow position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.08, 48]} />
        <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.5} />
      </mesh>
      
      {/* Elegant Brass Stem */}
      <mesh castShadow receiveShadow position={[0, 0.33, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 0.58, 32]} />
        <meshStandardMaterial color="#d9ae6c" roughness={0.15} metalness={0.8} />
      </mesh>
      
      {/* Soft Internal Glowing Bulb */}
      <mesh position={[0, 0.68, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial color="#ffe4b8" />
      </mesh>
      
      {/* Premium Translucent Mushroom Dome Glass */}
      <mesh castShadow receiveShadow position={[0, 0.68, 0]}>
        <sphereGeometry args={[0.38, 64, 32, 0, Math.PI * 2, 0, Math.PI / 1.6]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          roughness={0.15} 
          transmission={0.8} 
          transparent 
          opacity={0.85} 
          metalness={0.05}
          side={2}
        />
      </mesh>
      
      {/* Brass Finial Top */}
      <mesh castShadow receiveShadow position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.05, 16]} />
        <meshStandardMaterial color="#d9ae6c" roughness={0.15} metalness={0.8} />
      </mesh>
    </group>
  );
}

function CategoryModel({ kind }: { kind: CategoryKind }) {
  return (
    <Canvas dpr={[1, 1.5]} frameloop="always" camera={{ position: [0, 1.1, 2.4], fov: 36 }}>
      <Suspense fallback={null}>
        <color attach="background" args={["#efe4d6"]} />
        <ambientLight intensity={0.75} />
        <directionalLight intensity={1.35} position={[3.1, 3.8, 2.4]} />
        <directionalLight intensity={0.75} position={[-2.8, 2.2, -1.7]} />
        <pointLight intensity={0.35} position={[0.8, 1.2, 0.8]} color="#ffe2bf" />
        <Environment preset="studio" />
        <Bounds fit observe margin={1.3}>
          <Center>
            <group rotation={[0, -0.35, 0]}>
              {kind === "table" && <TableModel />}
              {kind === "chair" && <ChairModel />}
              {kind === "light" && <LampModel />}
            </group>
          </Center>
        </Bounds>
        <ContactShadows position={[0, 0.02, 0]} opacity={0.55} scale={2.7} blur={2.8} far={1.75} />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.2}
          enableDamping
          dampingFactor={0.08}
        />
      </Suspense>
    </Canvas>
  );
}

export default function Categories() {
  const categories = [
    {
      title: "Table",
      count: "1200+ Items",
      types: ["Dining Table", "Coffee Table", "Side Table"],
      kind: "table",
      link: "#",
    },
    {
      title: "Chairs",
      count: "800+ Items",
      types: ["Armchair", "Lounge Chair", "Dining Chair"],
      kind: "chair",
      link: "#",
    },
    {
      title: "Light",
      count: "500+ Items",
      types: ["Floor Lamp", "Pendant Light", "Table Lamp"],
      kind: "light",
      link: "#",
    },
  ];

  return (
    <section className="w-full px-4 md:px-8 py-16 bg-[#e8e7e3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 md:mb-0 w-full md:w-1/2">
            Explore <br /> Top Categories
          </h2>
          <p className="text-gray-600 md:w-1/3 leading-relaxed">
            Discover a wide variety of furniture designed specifically for modern and minimalist styles. Find pieces that define your space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* 30% Offer Box */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-[2.5rem] bg-[#91A57D] text-white p-8 flex flex-col justify-center items-center shadow-lg transform transition-all cursor-pointer min-h-[300px]"
          >
            <h3 className="text-4xl lg:text-5xl font-extrabold mb-4 text-center">30% <br /> OFFER</h3>
            <p className="opacity-90 font-medium tracking-wide uppercase text-sm">On Select Items</p>
          </motion.div>

          {/* Category Cards */}
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">{cat.title}</h4>
                  <p className="text-sm font-medium text-[#91A57D] bg-[#91A57D]/10 inline-block px-3 py-1 rounded-full">{cat.count}</p>
                </div>
                <div className="w-24 h-24 rounded-2xl shadow-sm bg-[#f1ede7] overflow-hidden">
                  <CategoryModel kind={cat.kind as CategoryKind} />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-6 flex-1">
                {cat.types.map((type, tIdx) => (
                  <span key={tIdx} className="text-gray-500 text-sm font-medium flex items-center gap-2 before:w-1.5 before:h-1.5 before:bg-gray-300 before:rounded-full">
                    {type}
                  </span>
                ))}
              </div>

              <a href={cat.link} className="flex items-center gap-2 text-gray-800 font-semibold text-sm hover:text-[#91A57D] group w-max">
                View All <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}