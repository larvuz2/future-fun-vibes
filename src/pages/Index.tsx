import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { GameCard } from "@/components/GameCard";
import { FilterBar } from "@/components/FilterBar";
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
    title: "PREMIUM QUALITY FOCUS",
    description: "Console-quality games in your browser. No downloads.",
    icon: <Star className="w-4 h-4 text-yellow-500" />,
    status: "Featured",
    tags: ["Quality", "Gaming"],
  },
  {
    title: "INSTANT ACCESS MODEL",
    description: "Start playing in seconds.",
    icon: <Clock className="w-4 h-4 text-emerald-500" />,
    status: "Active",
    tags: ["Speed", "Access"],
  },
  {
    title: "OWNERSHIP & COMMUNITY",
    description: "True ownership of your games.",
    icon: <CheckCircle className="w-4 h-4 text-blue-500" />,
    status: "New",
    tags: ["Ownership", "Community"],
  },
  {
    title: "TECHNOLOGY EDGE",
    description: "Next-gen graphics in your browser.",
    icon: <TrendingUp className="w-4 h-4 text-purple-500" />,
    status: "Advanced",
    tags: ["Tech", "Innovation"],
  },
  {
    title: "CURATED EXPERIENCE",
    description: "Carefully selected premium games.",
    icon: <Video className="w-4 h-4 text-pink-500" />,
    status: "Verified",
    tags: ["Curated", "Premium"],
  },
  {
    title: "DEVELOPER FRIENDLY",
    description: "Direct connection to creators.",
    icon: <Globe className="w-4 h-4 text-indigo-500" />,
    status: "Active",
    tags: ["Developers", "Community"],
  },
];

export default function Index() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [games, setGames] = useState<GameSlug[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    const { data: games, error } = await supabase
      .from('games')
      .select(`
        name,
        slug,
        studio:studio_id (
          name
        ),
        media:game_media (
          profile_picture_url,
          media_1_url,
          media_2_url,
          media_3_url,
          media_4_url,
          media_5_url
        ),
        funding:game_funding (
          funding_goal,
          current_funding,
          funding_end_date
        )
      `)
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching games:', error);
      return;
    }

    setGames(games || []);
  };

  useEffect(() => {
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
      
      <div className="relative pt-4 md:pt-8 z-10 my-0 px-0 md:px-[103px]">
        <FeaturedCarousel />
      </div>
      
      <section id="games-grid" className="relative py-4 md:py-12 z-10">
        <div className="container px-4 md:px-6 max-w-7xl">
          <FilterBar />
          
          <div className="flex flex-col gap-4 md:gap-8 mt-4 md:mt-8">
            {filteredGames.map((game, index) => (
              <motion.div 
                key={game.slug} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GameCard gameSlug={game.slug} />
              </motion.div>
            ))}
          </div>
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
            <p className="text-muted-foreground mt-2">What sets us apart from other gaming platforms</p>
          </div>
          <BentoGrid items={featureItems} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
