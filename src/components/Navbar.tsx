import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors">
          future.fun
        </Link>
        <div className="flex gap-8 items-center">
          <Link to="/games" className="hover:text-primary transition-colors">Games</Link>
          <Link to="/upload" className="hover:text-primary transition-colors">Upload</Link>
          <Link to="/community" className="hover:text-primary transition-colors">Community</Link>
          <Button className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
}