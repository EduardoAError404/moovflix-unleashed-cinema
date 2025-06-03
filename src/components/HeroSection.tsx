
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Play, Info } from "lucide-react";

interface HeroSectionProps {
  type: "landing" | "homepage";
}

const HeroSection = ({ type }: HeroSectionProps) => {
  if (type === "landing") {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/lovable-uploads/4f551d4b-fc2c-4ff2-8dde-522a25e95371.png')`
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
        
        {/* Content */}
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
          
          {/* Email Signup */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <Input
              type="email"
              placeholder="Endereço de email"
              className="bg-black/50 border-gray-600 text-white placeholder-gray-400 h-14 text-lg flex-1"
            />
            <Button className="bg-[#E50914] hover:bg-[#E50914]/90 text-white font-semibold px-8 h-14 text-lg">
              Começar
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen flex items-end pb-32">
      {/* Background Image - Featured Content */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          <span className="text-[#E50914] text-sm font-semibold tracking-wider uppercase mb-2 block">
            JORNADA ESPETRAL
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Cozy Grove
          </h1>
          <p className="text-lg text-gray-300 mb-2">
            Jogo • Simulação
          </p>
          <p className="text-lg text-white mb-8 max-w-lg">
            Uma experiência única de simulação onde você explora uma ilha misteriosa cheia de espíritos amigáveis e aventuras emocionantes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 text-lg">
              <Play className="mr-2 w-5 h-5 fill-current" />
              Jogar
            </Button>
            <Button className="bg-gray-600/50 text-white hover:bg-gray-600/70 font-semibold px-8 py-3 text-lg">
              <Info className="mr-2 w-5 h-5" />
              Mais informações
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
