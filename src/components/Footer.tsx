import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              future.fun
            </Link>
            <p className="text-muted-foreground">
              Premium browser-based gaming platform for next-generation experiences
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/games" className="text-muted-foreground hover:text-primary transition-colors">Games</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/upload" className="text-muted-foreground hover:text-primary transition-colors">Upload</Link></li>
              <li><Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} Future Fun Labs, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}