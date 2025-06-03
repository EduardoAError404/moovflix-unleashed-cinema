
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentItem {
  id: string;
  title: string;
  image: string;
  badge?: string;
  rank?: number;
}

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
  showRanking?: boolean;
}

const ContentCarousel = ({ title, items, showRanking = false }: ContentCarouselProps) => {
  return (
    <section className="px-4 md:px-8 mb-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
        
        <div className="relative group">
          {/* Left Arrow */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          {/* Content Grid */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 md:gap-4 pb-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-32 md:w-48 lg:w-56 group/item cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-gray-800">
                    {showRanking && (
                      <div className="absolute -left-4 top-0 z-20">
                        <span className="text-6xl md:text-8xl font-black text-white stroke-black stroke-2">
                          {index + 1}
                        </span>
                      </div>
                    )}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                    />
                    {item.badge && (
                      <div className="absolute top-2 left-2 bg-[#E50914] text-white text-xs px-2 py-1 rounded">
                        {item.badge}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors duration-300" />
                  </div>
                  <h3 className="text-white text-sm mt-2 line-clamp-2">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Arrow */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContentCarousel;
