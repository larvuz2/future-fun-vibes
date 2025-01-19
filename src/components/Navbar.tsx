import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Future.fun
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/how-it-works"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              How it Works
            </Link>
            <Link
              to="/community"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Community
            </Link>
            <Link
              to="/documentation"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Documentation
            </Link>
            <Link
              to="/upload"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Upload
            </Link>
          </nav>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};

export default Navbar;