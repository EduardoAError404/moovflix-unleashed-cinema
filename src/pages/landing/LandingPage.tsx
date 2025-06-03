
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import ContentCarousel from "@/components/ContentCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

interface LandingPageProps {
  onLoginClick: () => void;
  onEmailSubmit: (email: string) => void;
}

const LandingPage = ({ onLoginClick, onEmailSubmit }: LandingPageProps) => {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onEmailSubmit(email);
    }
  };

  const trendingContent = [
    {
      id: "1",
      title: "Round 6",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop",
      rank: 1
    },
    {
      id: "2", 
      title: "Lyle Lyle Crocodilo",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400&auto=format&fit=crop",
      rank: 2
    },
    {
      id: "3",
      title: "Irmãos de Honra", 
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=400&auto=format&fit=crop",
      rank: 3
    },
    {
      id: "4",
      title: "Avatar: O Caminho da Água",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop", 
      rank: 4
    },
    {
      id: "5",
      title: "La Casa de Papel",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=400&auto=format&fit=crop",
      rank: 5
    },
    {
      id: "6",
      title: "A Casa Monstro",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop",
      rank: 6
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onLoginClick={onLoginClick} />
      
      {/* Hero Section with Email Form */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/lovable-uploads/4f551d4b-fc2c-4ff2-8dde-522a25e95371.png')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Filmes, séries e muito mais ilimitados
          </h1>
          <p className="text-xl md:text-2xl text-white mb-4">
            Começa por R$18,90. Cancele quando quiser.
          </p>
          <p className="text-lg md:text-xl text-white mb-8">
            Pronto para assistir? Digite seu email para criar ou reiniciar sua assinatura.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <Input
              type="email"
              placeholder="Endereço de email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border-gray-600 text-white placeholder-gray-400 h-14 text-lg flex-1"
              required
            />
            <Button 
              type="submit"
              className="bg-[#E50914] hover:bg-[#E50914]/90 text-white font-semibold px-8 h-14 text-lg"
            >
              Começar
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </div>
      </section>
      
      {/* Plan Section */}
      <section className="px-4 md:px-8 py-16 bg-gradient-to-b from-black/80 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🍿</div>
            <p className="text-xl md:text-2xl text-white mb-6">
              O MoovFlix que você ama por apenas R$18,90. Obtenha nosso plano mais acessível com anúncios.
            </p>
            <Button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 text-lg">
              Saiba mais
            </Button>
          </div>
        </div>
      </section>
      
      <ContentCarousel 
        title="Em alta agora" 
        items={trendingContent}
        showRanking={true}
      />
      
      <BenefitsSection />
    </div>
  );
};

export default LandingPage;
