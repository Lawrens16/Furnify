import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import Inspirations from "@/components/Inspirations";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e8e7e3] text-gray-900 font-sans selection:bg-[#91A57D] selection:text-white">
      <Navbar />
      <HeroSection />
      <Categories />
      <BestSellers />
      <Inspirations />
      {/* Footer Placeholder */}
      <div id="footer-placeholder" className="w-full h-32 bg-[#e8e7e3] flex items-center justify-center border-t border-gray-300">
        <p className="text-gray-500 font-medium tracking-widest uppercase text-sm">Footer Section (Reserved)</p>
      </div>
    </main>
  );
}
