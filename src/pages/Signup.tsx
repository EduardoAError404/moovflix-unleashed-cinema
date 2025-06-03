
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: location.state?.email || "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    // Simular cadastro bem-sucedido
    toast.success("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-moovflix-black flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=1920&auto=format&fit=crop')"
        }}
      ></div>

      <Card className="w-full max-w-md bg-moovflix-gray-dark/95 border-moovflix-gray-medium text-white relative z-10">
        <CardHeader className="text-center pb-2">
          <Link to="/" className="text-moovflix-red text-3xl font-black tracking-tight mb-4 block">
            MOOVFLIX
          </Link>
          <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nome</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-moovflix-gray-medium border-moovflix-gray-light text-white placeholder:text-moovflix-gray-light"
                placeholder="Digite seu nome completo"
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="bg-moovflix-gray-medium border-moovflix-gray-light text-white placeholder:text-moovflix-gray-light"
                placeholder="Confirme sua senha"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-moovflix-red hover:bg-moovflix-red-hover text-white font-bold py-3 mt-6"
            >
              Criar conta
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-moovflix-gray-light">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-white hover:underline font-semibold">
                Faça login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
