
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
  onLogin: () => void;
  onBackToLanding: () => void;
}

const LoginForm = ({ onLogin, onBackToLanding }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/4f551d4b-fc2c-4ff2-8dde-522a25e95371.png')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
      
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-black/80 rounded-lg p-8 backdrop-blur-sm border border-gray-700/50">
          <div className="text-center mb-8">
            <button onClick={onBackToLanding}>
              <h1 className="text-[#E50914] text-3xl font-bold tracking-tight hover:text-[#E50914]/90 transition-colors">
                MoovFlix
              </h1>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8">Entrar</h2>
            
            <div>
              <Input
                type="email"
                placeholder="Email ou número de telefone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 h-12 text-base"
                required
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 h-12 text-base"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-[#E50914] hover:bg-[#E50914]/90 text-white font-semibold h-12 text-base"
            >
              Entrar
            </Button>
            
            <div className="text-center">
              <span className="text-gray-500">OU</span>
            </div>
            
            <Button
              type="button"
              variant="secondary"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold h-12 text-base"
            >
              Use um código de login
            </Button>
            
            <div className="text-center">
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                Esqueceu a senha?
              </a>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="border-gray-600"
              />
              <label htmlFor="remember" className="text-white text-sm">
                Lembrar de mim
              </label>
            </div>
            
            <div className="text-sm text-gray-400">
              Novo no MoovFlix?{" "}
              <button 
                type="button"
                onClick={onBackToLanding}
                className="text-white hover:underline"
              >
                Cadastre-se agora
              </button>
              .
            </div>
            
            <div className="text-xs text-gray-500 leading-relaxed">
              Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô.{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Saiba mais
              </a>
              .
            </div>
          </form>
        </div>
        
        <footer className="mt-8 text-sm text-gray-400">
          <div className="text-center mb-6">
            Dúvidas? Ligue{" "}
            <a href="tel:0800" className="text-white hover:underline">
              0800 XXX XXXX
            </a>{" "}
            (grátis)
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <a href="#" className="hover:underline">Perguntas frequentes</a>
            <a href="#" className="hover:underline">Central de Ajuda</a>
            <a href="#" className="hover:underline">Termos de Uso</a>
            <a href="#" className="hover:underline">Privacidade</a>
            <a href="#" className="hover:underline">Preferências de Cookies</a>
            <a href="#" className="hover:underline">Informações Corporativas</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LoginForm;
