
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
import { GAMES, Game } from "@/data/games";

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: Game[]): Game[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Index = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // Shuffle games on mount
    setGames(shuffleArray(GAMES));
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

  return <div className="min-h-screen bg-background relative overflow-hidden">
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
            {games.map((game, index) => <motion.div key={game.id} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} viewport={{
            once: true
          }}>
                <GameCard title={game.game_name} image={game.image_1_url} genre="Action" developer={game.studio_name} marketCap="$1.5M" dateAdded="Recently added" plays={10000} hours={30000} mints={1500} videoUrl={game.video_url} profilePictureUrl={game.profile_picture_url} />
              </motion.div>)}
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};

export default Index;
