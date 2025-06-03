
import { Search, Bell, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
}

const Header = ({ isLoggedIn = false, onLoginClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent px-4 md:px-8 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-[#E50914] text-2xl md:text-3xl font-bold tracking-tight">
            MoovFlix
          </h1>
        </div>

        {isLoggedIn ? (
          <>
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                Início
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                Séries
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                Filmes
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                Jogos
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                Bombando
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                Minha lista
              </a>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-white cursor-pointer hover:text-gray-300 transition-colors" />
              <div className="relative">
                <Bell className="w-5 h-5 text-white cursor-pointer hover:text-gray-300 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-[#E50914] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
                <User className="w-5 h-5 text-white" />
                <ChevronDown className="w-4 h-4 text-white" />
              </div>
            </div>
          </>
        ) : (
          <Button
            onClick={onLoginClick}
            className="bg-[#E50914] hover:bg-[#E50914]/90 text-white font-medium px-6 py-2 rounded"
          >
            Entrar
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
