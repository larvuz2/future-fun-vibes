
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { GameCard } from "@/components/GameCard";
import { FilterBar } from "@/components/FilterBar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const HARDCODED_GAMES = [
  {
    id: "1",
    game_name: "Drillhorn",
    studio_name: "Future Studios",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//Bulldozer.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=drillhorn",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    game_name: "Skyfang",
    studio_name: "Dragon Games",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//DRAGON.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=skyfang",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    game_name: "Big Hairy Snowman",
    studio_name: "Snow Studios",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//HAIRY.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=snowman",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "4",
    game_name: "Meme Legends",
    studio_name: "Meme Factory",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//MEME.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=meme",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "5",
    game_name: "Fluid Simulation Puzzles",
    studio_name: "Physics Games",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//FLUID.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=fluid",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "6",
    game_name: "Forest Drone",
    studio_name: "Drone Games",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//Drone%20and%20Basic%20Controller%20-%20Unreal%20Engine%20(1).mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=drone",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const Index = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (location.state?.scrollToGames) {
      const gamesSection = document.getElementById('games-grid');
      gamesSection?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <div className="pt-4 md:pt-8">
        <FeaturedCarousel />
      </div>
      
      <section id="games-grid" className="py-4 md:py-12">
        <div className="container px-4 md:px-6 max-w-7xl">
          <FilterBar />
          
          <div className="flex flex-col gap-4 md:gap-8 mt-4 md:mt-8">
            {HARDCODED_GAMES.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GameCard 
                  title={game.game_name}
                  image={game.image_1_url}
                  genre="Action"
                  developer={game.studio_name}
                  marketCap="$1.5M"
                  dateAdded="Recently added"
                  plays={10000}
                  hours={30000}
                  mints={1500}
                  videoUrl={game.video_url}
                  profilePictureUrl={game.profile_picture_url}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Index;
