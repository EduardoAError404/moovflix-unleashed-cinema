
import { useEffect } from 'react';

const FaviconGenerator = () => {
  useEffect(() => {
    const generateFavicon = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      // Configurações do canvas
      canvas.width = 64;
      canvas.height = 64;
      
      // Fundo vermelho estilo Netflix
      ctx.fillStyle = '#E50914';
      ctx.fillRect(0, 0, 64, 64);
      
      // Configurações da fonte
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 42px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Desenhar a letra M
      ctx.fillText('M', 32, 32);
      
      // Converter para URL de dados
      const dataURL = canvas.toDataURL('image/png');
      
      // Atualizar o favicon
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (link) {
        link.href = dataURL;
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.type = 'image/png';
        newLink.href = dataURL;
        document.head.appendChild(newLink);
      }
      
      // Também atualizar apple-touch-icon
      const appleLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
      if (appleLink) {
        appleLink.href = dataURL;
      }
    };
    
    generateFavicon();
  }, []);

  return null;
};

export default FaviconGenerator;
