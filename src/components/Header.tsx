
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 py-6 md:px-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-moovflix-red text-3xl md:text-4xl font-black tracking-tight">
          MOOVFLIX
        </Link>
        <Link 
          to="/login" 
          className="bg-moovflix-red hover:bg-moovflix-red-hover text-white px-6 py-2 rounded-md font-semibold transition-colors duration-200"
        >
          Entrar
        </Link>
      </div>
    </header>
  );
};

export default Header;
