"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, RoundedBox, AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { Check, ShoppingCart, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

// --- 3D Configurable Component ---
function ConfigurableFurniture({ shape, fabricColor, legColor }: { shape: string, fabricColor: string, legColor: string }) {
  // Realistic physical material properties
  const isMetal = legColor === "#111111" || legColor === "#e0e0e0";
  const legMaterialParams = { 
    roughness: isMetal ? 0.2 : 0.6, 
    metalness: isMetal ? 0.8 : 0.05,
    clearcoat: isMetal ? 1.0 : 0.1,
    clearcoatRoughness: 0.2
  };

  const fabricParams = {
    roughness: 0.9,
    metalness: 0.0,
    clearcoat: 0.0,
    sheen: 0.5,
    sheenColor: "white",
    sheenRoughness: 0.5
  };

  const tableTopParams = {
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1
  };

  return (
    <group position={[0, -0.6, 0]}>
      {shape === "chair" && (
        <group>
          {/* Seat */}
          <RoundedBox args={[0.7, 0.15, 0.7]} radius={0.05} smoothness={4} castShadow receiveShadow position={[0, 0.4, 0]}>
            <meshPhysicalMaterial color={fabricColor} {...fabricParams} />
          </RoundedBox>
          {/* Backrest */}
          <RoundedBox args={[0.7, 0.9, 0.15]} radius={0.06} smoothness={4} castShadow receiveShadow position={[0, 0.9, -0.28]}>
            <meshPhysicalMaterial color={fabricColor} {...fabricParams} />
          </RoundedBox>
          {/* Legs */}
          {[
            [-0.3, 0.2, -0.25], [0.3, 0.2, -0.25], 
            [-0.3, 0.2, 0.25], [0.3, 0.2, 0.25]
          ].map((pos, i) => (
            <mesh key={i} castShadow receiveShadow position={pos as [number, number, number]}>
              <cylinderGeometry args={[0.025, 0.015, 0.4, 24]} />
              <meshPhysicalMaterial color={legColor} {...legMaterialParams} />
            </mesh>
          ))}
        </group>
      )}

      {shape === "sofa" && (
        <group>
          {/* Seat Cushions */}
          <RoundedBox args={[0.95, 0.2, 0.7]} radius={0.06} smoothness={4} castShadow receiveShadow position={[-0.48, 0.4, 0]}>
            <meshPhysicalMaterial color={fabricColor} {...fabricParams} />
          </RoundedBox>
          <RoundedBox args={[0.95, 0.2, 0.7]} radius={0.06} smoothness={4} castShadow receiveShadow position={[0.48, 0.4, 0]}>
            <meshPhysicalMaterial color={fabricColor} {...fabricParams} />
          </RoundedBox>
          
          {/* Backrest */}
          <RoundedBox args={[2.0, 0.6, 0.25]} radius={0.08} smoothness={4} castShadow receiveShadow position={[0, 0.8, -0.3]}>
            <meshPhysicalMaterial color={fabricColor} {...fabricParams} />
          </RoundedBox>
          
          {/* Armrests */}
          <RoundedBox args={[0.25, 0.45, 0.75]} radius={0.06} smoothness={4} castShadow receiveShadow position={[-0.9, 0.65, 0.05]}>
            <meshPhysicalMaterial color={fabricColor} {...fabricParams} />
          </RoundedBox>
          <RoundedBox args={[0.25, 0.45, 0.75]} radius={0.06} smoothness={4} castShadow receiveShadow position={[0.9, 0.65, 0.05]}>
            <meshPhysicalMaterial color={fabricColor} {...fabricParams} />
          </RoundedBox>
          
          {/* Legs */}
          {[
            [-0.9, 0.15, -0.25], [0.9, 0.15, -0.25], 
            [-0.9, 0.15, 0.25], [0.9, 0.15, 0.25],
            [0, 0.15, -0.25], [0, 0.15, 0.25] // center support
          ].map((pos, i) => (
            <mesh key={i} castShadow receiveShadow position={pos as [number, number, number]}>
              <cylinderGeometry args={[0.03, 0.02, 0.3, 24]} />
              <meshPhysicalMaterial color={legColor} {...legMaterialParams} />
            </mesh>
          ))}
        </group>
      )}

      {shape === "table" && (
        <group>
          {/* Table Top (Smooth cylinder using large segments & careful bevel) */}
          <mesh castShadow receiveShadow position={[0, 0.7, 0]}>
            <cylinderGeometry args={[1.0, 1.0, 0.06, 64]} />
            <meshPhysicalMaterial color={fabricColor} {...tableTopParams} />
          </mesh>
          {/* Center Column */}
          <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.7, 32]} />
            <meshPhysicalMaterial color={legColor} {...legMaterialParams} />
          </mesh>
          {/* Base Plate */}
          <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.45, 0.5, 0.04, 48]} />
            <meshPhysicalMaterial color={legColor} {...legMaterialParams} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// --- Data ---
const SHAPES = [
  { id: "chair", name: "Accent Chair", basePrice: 299 },
  { id: "sofa", name: "Lounge Sofa", basePrice: 899 },
  { id: "table", name: "Dining Table", basePrice: 499 },
];

const FABRIC_COLORS = [
  { id: "sage", name: "Sage Green", value: "#91A57D" },
  { id: "sand", name: "Desert Sand", value: "#cbbda8" },
  { id: "navy", name: "Deep Navy", value: "#2c3e50" },
  { id: "terracotta", name: "Terracotta", value: "#cc6a51" },
  { id: "charcoal", name: "Charcoal", value: "#4a4a4a" },
  { id: "cream", name: "Cream White", value: "#f5f5f0" },
];

const LEG_MATERIALS = [
  { id: "light-oak", name: "Light Oak", value: "#d4a976", price: 0 },
  { id: "walnut", name: "Dark Walnut", value: "#5c3a21", price: 20 },
  { id: "black-metal", name: "Matte Black", value: "#111111", price: 35 },
  { id: "chrome", name: "Polished Chrome", value: "#e0e0e0", price: 50 },
];

export default function BuildPage() {
  const { addLocalBuildItem } = useCart();
  const [activeShape, setActiveShape] = useState(SHAPES[0]);
  const [activeFabric, setActiveFabric] = useState(FABRIC_COLORS[0]);
  const [activeLegs, setActiveLegs] = useState(LEG_MATERIALS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalPrice = activeShape.basePrice + activeLegs.price;

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2000);

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [toastMessage]);

  const handleAddToCart = async () => {
    addLocalBuildItem(
      activeShape.name,
      activeFabric.name,
      activeFabric.value,
      activeLegs.name,
      totalPrice,
    );
    setToastMessage("Custom build added to cart!");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Custom Builder</h1>
          <p className="mt-2 text-lg text-gray-600">Design your perfect piece of furniture in real-time 3D.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left panel: 3D Preview Workspace */}
          <div className="w-full lg:w-3/5">
            <div className="bg-[#e8e7e3] rounded-3xl h-[600px] relative overflow-hidden shadow-inner border border-[#d6d4ce]">
              
              <div className="absolute top-6 left-6 z-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm flex items-center gap-2">
                <Info size={16} className="text-[#91A57D]"/>
                Drag to rotate, scroll to zoom
              </div>

              <Canvas shadows camera={{ position: [2.5, 1.8, 3.5], fov: 45 }}>
                <color attach="background" args={["#e8e7e3"]} />
                <ambientLight intensity={0.6} />
                <directionalLight castShadow position={[5, 8, 5]} intensity={1.5} shadow-mapSize={[2048, 2048]} />
                <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                
                {/* Advanced Studio Environment */}
                <Environment preset="apartment" background={false} blur={0.5} />
                
                {/* Realistic soft floor shadows */}
                <AccumulativeShadows temporal frames={100} alphaTest={0.85} opacity={0.7} scale={12} position={[0, -0.6, 0]}>
                  <RandomizedLight amount={8} radius={4} ambient={0.5} intensity={1} position={[5, 5, -10]} bias={0.001} />
                </AccumulativeShadows>

                <OrbitControls 
                  makeDefault 
                  minPolarAngle={0} 
                  maxPolarAngle={Math.PI / 2 + 0.1} // Prevent looking completely under
                  enablePan={false}
                  minDistance={2}
                  maxDistance={7}
                />
                
                <group rotation={[0, -Math.PI / 4, 0]}>
                  <ConfigurableFurniture 
                    shape={activeShape.id} 
                    fabricColor={activeFabric.value} 
                    legColor={activeLegs.value} 
                  />
                </group>

                {/* Optional subtle contact shadow as a base beneath the accumulative shadows */}
                <ContactShadows position={[0, -0.59, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#333333" />
              </Canvas>
            </div>
          </div>

          {/* Right panel: Configuration Tools */}
          <div className="w-full lg:w-2/5 flex flex-col">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex-1">
              
              {/* Step 1: Base Shape */}
              <div className="mb-10">
                <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase mb-4">1. Select Base</h3>
                <div className="grid grid-cols-3 gap-3">
                  {SHAPES.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => setActiveShape(shape)}
                      className={`py-3 px-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        activeShape.id === shape.id 
                          ? "border-[#91A57D] bg-[#91A57D]/10 text-[#5a6a4d]" 
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {shape.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Fabric/Surface Color */}
              <div className="mb-10">
                <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase mb-4 flex justify-between items-center">
                  2. {activeShape.id === 'table' ? 'Surface Color' : 'Fabric Color'}
                  <span className="text-gray-900 font-medium normal-case">{activeFabric.name}</span>
                </h3>
                <div className="flex flex-wrap gap-4">
                  {FABRIC_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setActiveFabric(color)}
                      className={`relative w-12 h-12 rounded-full shadow-sm border-2 transition-transform hover:scale-110 ${
                        activeFabric.id === color.id ? "border-gray-900 scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {activeFabric.id === color.id && (
                        <Check size={16} className={`absolute inset-0 m-auto ${["cream", "sand"].includes(color.id) ? "text-gray-900" : "text-white"}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Leg Material */}
              <div className="mb-10">
                <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase mb-4 flex justify-between items-center">
                  3. Base / Legs
                  <span className="text-gray-900 font-medium normal-case">{activeLegs.name} (+${activeLegs.price})</span>
                </h3>
                <div className="space-y-3">
                  {LEG_MATERIALS.map((leg) => (
                    <button
                      key={leg.id}
                      onClick={() => setActiveLegs(leg)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        activeLegs.id === leg.id
                          ? "border-[#91A57D] bg-[#91A57D]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border border-gray-300 shadow-inner" style={{ backgroundColor: leg.value }}></div>
                        <span className="font-medium text-gray-800">{leg.name}</span>
                      </div>
                      <span className="text-gray-500 text-sm">{leg.price === 0 ? "Included" : `+$${leg.price}`}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100 pb-2">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Total Estimated Price</p>
                    <p className="text-4xl font-bold text-gray-900">${totalPrice}</p>
                  </div>
                  <p className="text-sm text-[#91A57D] font-medium">Ships in 2-3 weeks</p>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#91A57D] hover:bg-[#839670] text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#91A57D]/30"
                >
                  <ShoppingCart size={22} />
                  Add to Cart
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#91A57D] text-white px-5 py-3 rounded-2xl shadow-xl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
