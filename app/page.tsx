import HeroSection from "@/components/HeroSection";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import Inspirations from "@/components/Inspirations";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <Categories />
      <BestSellers />
      <Inspirations />
    </div>
  );
}
