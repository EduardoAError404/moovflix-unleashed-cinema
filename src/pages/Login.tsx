
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular login bem-sucedido
    toast.success("Login realizado com sucesso!");
    // Aqui você redirecionaria para o dashboard
    console.log("Login successful with:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-h-screen bg-moovflix-black flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920&auto=format&fit=crop')"
        }}
      ></div>

      <Card className="w-full max-w-md bg-moovflix-gray-dark/95 border-moovflix-gray-medium text-white relative z-10">
        <CardHeader className="text-center pb-2">
          <Link to="/" className="text-moovflix-red text-3xl font-black tracking-tight mb-4 block">
            MOOVFLIX
          </Link>
          <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-moovflix-gray-medium border-moovflix-gray-light text-white placeholder:text-moovflix-gray-light"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-moovflix-gray-medium border-moovflix-gray-light text-white placeholder:text-moovflix-gray-light"
                placeholder="Digite sua senha"
              />
            </div>

            <div className="flex items-center space-x-2 py-2">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, rememberMe: checked as boolean })
                }
                className="border-moovflix-gray-light data-[state=checked]:bg-moovflix-red data-[state=checked]:border-moovflix-red"
              />
              <Label htmlFor="rememberMe" className="text-moovflix-gray-light text-sm">
                Lembre-se de mim
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-moovflix-red hover:bg-moovflix-red-hover text-white font-bold py-3 mt-6"
            >
              Entrar
            </Button>
          </form>

          <div className="text-center mt-4">
            <Link to="/help" className="text-moovflix-gray-light hover:text-white text-sm hover:underline">
              Precisa de ajuda?
            </Link>
          </div>

          <div className="text-center mt-6 pt-4 border-t border-moovflix-gray-medium">
            <p className="text-moovflix-gray-light">
              Novo por aqui?{" "}
              <Link to="/signup" className="text-white hover:underline font-semibold">
                Assine agora com a MoovFlix
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
