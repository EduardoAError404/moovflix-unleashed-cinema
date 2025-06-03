
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FaviconGenerator from "@/components/FaviconGenerator";

const Index = () => {
  return (
    <div className="bg-moovflix-black min-h-screen">
      <FaviconGenerator />
      <Header />
      <Hero />
    </div>
  );
};

export default Index;
