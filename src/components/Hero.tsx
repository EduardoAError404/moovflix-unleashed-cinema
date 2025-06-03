
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (email) {
      navigate("/signup", { state: { email } });
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1920&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight uppercase">
          Filmes, séries e muito mais. Sem limites com a{" "}
          <span className="text-moovflix-red netflix-logo" style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>MoovFlix</span>.
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-8 font-light">
          Assista onde quiser. Cancele quando quiser.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/90 border-0 text-black placeholder:text-gray-600 text-lg py-6 px-4 flex-1"
          />
          <Button
            onClick={handleGetStarted}
            className="bg-moovflix-red hover:bg-moovflix-red-hover text-white font-bold text-lg py-6 px-8 whitespace-nowrap transition-colors duration-200"
          >
            Vamos lá!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
