import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import Inspirations from "@/components/Inspirations";
import { Footer } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e8e7e3] text-gray-900 font-sans selection:bg-[#91A57D] selection:text-white">
      <Navbar />
      <HeroSection />
      <Categories />
      <BestSellers />
      <Inspirations />
      <Footer />
    </main>
  );
}
