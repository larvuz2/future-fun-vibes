
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_USER_ID = "b1101d11-a765-4706-84f0-683cf045f956";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message,
        });
        return;
      }

      // Check if the logged-in user is the admin
      if (data.user?.id === ADMIN_USER_ID) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        toast({
          title: "Success",
          description: "Welcome back, admin!",
        });
        navigate("/admin/dashboard", { replace: true });
      } else {
        // Not the admin user
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have administrator privileges.",
        });
        await supabase.auth.signOut();
        localStorage.removeItem('isAdminAuthenticated');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
      
      if (user?.id === ADMIN_USER_ID && isAuthenticated === 'true') {
        navigate("/admin/dashboard", { replace: true });
      } else {
        localStorage.removeItem('isAdminAuthenticated');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Future.fun Admin</h1>
          <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          <Button 
            className="w-full" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
