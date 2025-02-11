
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGamesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToGames: true } });
    } else {
      const gamesSection = document.getElementById('featured-games');
      gamesSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 w-full z-50 pt-4">
      <nav className={`relative mx-4 transition-all duration-300 ${scrolled ? "glass py-4" : "bg-background/80 backdrop-blur-md py-6"}`}>
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/50"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/50"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/50"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/50"></div>
        
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors">
            future.fun
          </Link>
          <div className="flex gap-8 items-center">
            <a href="#games" onClick={handleGamesClick} className="hidden md:block hover:text-primary transition-colors">Games</a>
            <Link to="/upload" className="hidden md:block hover:text-primary transition-colors">Upload</Link>
            <Link to="/how-it-works" className="hidden md:block hover:text-primary transition-colors">How It Works</Link>
            <Link to="/documentation" className="hidden md:block hover:text-primary transition-colors">Documentation</Link>
            <Button className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
