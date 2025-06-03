
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

interface RegistrationFormProps {
  email: string;
  onRegistrationComplete: () => void;
  onBackToLanding: () => void;
}

const RegistrationForm = ({ email, onRegistrationComplete, onBackToLanding }: RegistrationFormProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptOffers, setAcceptOffers] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      setPasswordError("Sua senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 0) {
      validatePassword(value);
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword(password)) {
      onRegistrationComplete();
    }
  };

  const isFormValid = password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/4f551d4b-fc2c-4ff2-8dde-522a25e95371.png')`
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
      
      {/* Registration Form */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <button onClick={onBackToLanding}>
            <h1 className="text-[#E50914] text-3xl font-bold tracking-tight hover:text-[#E50914]/90 transition-colors">
              MoovFlix
            </h1>
          </button>
          <div className="text-right mt-4">
            <button 
              onClick={onBackToLanding}
              className="text-white hover:underline text-sm"
            >
              Entrar
            </button>
          </div>
        </div>

        <div className="bg-black/80 rounded-lg p-8 backdrop-blur-sm border border-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step Indicator */}
            <div className="text-sm text-gray-400 mb-2">
              Passo 1 de 3
            </div>
            
            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-4">Crie uma conta</h2>
            
            {/* Welcome Text */}
            <p className="text-lg text-white mb-2">
              Crie uma senha para começar sua assinatura.
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Faltam apenas alguns passos! Nós também detestamos formulários.
            </p>
            
            {/* Email Field (Read-only) */}
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                readOnly
                className="bg-gray-600/50 border-gray-600 text-gray-300 h-12 text-base cursor-not-allowed"
              />
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm text-gray-400 mb-2">
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Adicione uma senha"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 h-12 text-base pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-[#E87C03] text-sm mt-2">{passwordError}</p>
              )}
            </div>
            
            {/* Special Offers Checkbox */}
            <div className="flex items-start space-x-3 py-4">
              <Checkbox
                id="offers"
                checked={acceptOffers}
                onCheckedChange={(checked) => setAcceptOffers(checked as boolean)}
                className="border-gray-600 mt-1"
              />
              <label htmlFor="offers" className="text-white text-sm leading-relaxed">
                Sim, quero receber ofertas especiais da MoovFlix por email.
              </label>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-[#E50914] hover:bg-[#E50914]/90 text-white font-semibold h-12 text-base disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Próximo
            </Button>
            
            {/* reCAPTCHA Notice */}
            <div className="text-xs text-gray-500 leading-relaxed">
              Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô.
            </div>
            
            {/* Terms Links */}
            <div className="text-xs text-gray-400 text-center">
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                Termos de Uso
              </a>
              {" "}e{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                Política de Privacidade
              </a>
            </div>
          </form>
        </div>
        
        {/* Footer */}
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

export default RegistrationForm;
