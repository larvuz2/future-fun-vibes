
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GameCardGrid } from "@/components/GameCardGrid";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Star, Clock, CheckCircle, TrendingUp, Video, Globe } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";

interface GameSlug {
  slug: string;
}

const HIDE_ON_MOBILE = [
  'drillhorn',
  'subway-chase',
  'galleon-wars',
  'hyperrail',
  'shenlong'
];

const featureItems = [
  {
    title: "Text-to-Game AI: Build Instantly",
    description: "Type & Play – Describe your game, and AI builds it instantly.",
    icon: <Star className="w-4 h-4 text-yellow-500" />,
    status: "Featured",
    tags: ["AI", "Instant"],
  },
  {
    title: "AI-Powered Mechanics",
    description: "Define actions, physics, and logic—no coding needed.",
    icon: <Clock className="w-4 h-4 text-emerald-500" />,
    status: "Active",
    tags: ["Mechanics", "No-Code"],
  },
  {
    title: "Multiplayer & Backend",
    description: "Seamless real-time gameplay and hosting.",
    icon: <CheckCircle className="w-4 h-4 text-blue-500" />,
    status: "New",
    tags: ["Multiplayer", "Hosting"],
  },
  {
    title: "Live Editing",
    description: "Instantly tweak levels, mechanics, and UI.",
    icon: <TrendingUp className="w-4 h-4 text-purple-500" />,
    status: "Advanced",
    tags: ["Editing", "Real-time"],
  },
  {
    title: "One-Click Launch",
    description: "Publish to web, mobile, or cloud in seconds.",
    icon: <Video className="w-4 h-4 text-pink-500" />,
    status: "Verified",
    tags: ["Publishing", "Cross-platform"],
  },
  {
    title: "AI-Generated Assets",
    description: "Get 3D models, textures, and animations on demand.",
    icon: <Globe className="w-4 h-4 text-indigo-500" />,
    status: "Active",
    tags: ["Assets", "3D"],
  },
];

const Index = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [games, setGames] = useState<GameSlug[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('slug')
        .order('name');

      if (error) {
        console.error('Error fetching games:', error);
        return;
      }

      setGames(data || []);
      setLoading(false);
    };

    fetchGames();

    // Subscribe to changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'games'
        },
        () => {
          fetchGames();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (location.state?.scrollToGames) {
      const gamesSection = document.getElementById('games-grid');
      gamesSection?.scrollIntoView({
        behavior: 'smooth'
      });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const filteredGames = games.filter(game => !isMobile || !HIDE_ON_MOBILE.includes(game.slug));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-6 mt-20">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background to-black pointer-events-none" />
      
      <Navbar />
      <Hero />
      
      <section id="games-grid" className="relative pt-8 pb-12 z-10">
        <div className="container px-4 md:px-6 max-w-7xl">
          <GameCardGrid gamesList={filteredGames} />
        </div>
      </section>

      <section className="relative py-12 z-10 bg-gradient-to-b from-background/50 to-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <GradientText 
              className="text-4xl md:text-5xl font-bold tracking-tight"
              colors={["#ffaa40", "#9c40ff", "#ffaa40"]}
              animationSpeed={8}
            >
              Platform Features
            </GradientText>
            <p className="text-muted-foreground mt-2">🚀 Just type your idea—play within minutes!</p>
          </div>
          <BentoGrid items={featureItems} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
