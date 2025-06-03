
import { Tv, Download, Globe, Users } from "lucide-react";

const benefits = [
  {
    icon: Tv,
    title: "Aproveite na sua TV",
    description: "Assista em Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, aparelhos de Blu-ray e outros dispositivos."
  },
  {
    icon: Download,
    title: "Baixe suas séries para assistir offline",
    description: "Salve seus títulos favoritos e sempre tenha algo para assistir."
  },
  {
    icon: Globe,
    title: "Assista em qualquer lugar",
    description: "Assista a quantos filmes e séries quiser no celular, tablet, laptop e TV."
  },
  {
    icon: Users,
    title: "Crie perfis para crianças",
    description: "Deixe as crianças se aventurarem com seus personagens favoritos em um espaço feito só para elas."
  }
];

const BenefitsSection = () => {
  return (
    <section className="px-4 md:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Mais razões para se juntar
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-gray-700/50">
                <div className="bg-gradient-to-br from-[#E50914] to-pink-600 rounded-lg p-3 w-fit mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
