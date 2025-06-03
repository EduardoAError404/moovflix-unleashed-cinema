
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContentCarousel from "@/components/ContentCarousel";

const HomePage = () => {
  const discoverContent = [
    {
      id: "1",
      title: "Stranger Things",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop",
      badge: "Nova temporada"
    },
    {
      id: "2",
      title: "The Crown",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "3",
      title: "Casa de Papel",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=400&auto=format&fit=crop",
      badge: "Novidade"
    },
    {
      id: "4",
      title: "The Witcher",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "5",
      title: "Bridgerton",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "6",
      title: "Ozark",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop"
    }
  ];

  const gamesContent = [
    {
      id: "1",
      title: "Cozy Grove",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400&auto=format&fit=crop",
      badge: "BETA"
    },
    {
      id: "2",
      title: "Stranger Things 3: The Game",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "3",
      title: "Netflix Stories",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop"
    }
  ];

  const dramaContent = [
    {
      id: "1",
      title: "The Queen's Gambit",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "2",
      title: "Succession",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "3",
      title: "Breaking Bad",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "4",
      title: "The Office",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=400&auto=format&fit=crop"
    }
  ];

  const realityContent = [
    {
      id: "1",
      title: "The Circle",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "2",
      title: "Love is Blind",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "3",
      title: "Too Hot to Handle",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header isLoggedIn={true} />
      <HeroSection type="homepage" />
      
      <div className="pb-16">
        <ContentCarousel 
          title="Descubra suas próximas histórias" 
          items={discoverContent}
        />
        
        <ContentCarousel 
          title="Jogos" 
          items={gamesContent}
        />
        
        <ContentCarousel 
          title="Séries dramáticas aclamadas pela crítica para maratonar" 
          items={dramaContent}
        />
        
        <ContentCarousel 
          title="Reality shows com ilusão" 
          items={realityContent}
        />
      </div>
      
      {/* Footer */}
      <footer className="px-4 md:px-8 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              YouTube
            </a>
          </div>
          <div className="text-center text-gray-400 text-sm">
            © 2024 MoovFlix Brasil. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
