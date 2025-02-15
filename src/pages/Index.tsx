
import { Navbar } from "@/components/Navbar";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { GameCard } from "@/components/GameCard";
import { FilterBar } from "@/components/FilterBar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface GameMedia {
  id: string;
  game_name: string;
  studio_name: string;
  video_url: string;
  profile_picture_url: string;
  image_1_url: string;
  image_2_url: string;
  image_3_url: string;
  image_4_url: string;
  created_at: string;
  updated_at: string;
}

const Index = () => {
  const location = useLocation();
  const [games, setGames] = useState<GameMedia[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from('game_media')
        .select('*');
      
      if (error) {
        console.error('Error fetching games:', error);
        return;
      }

      setGames(data);
    };

    fetchGames();

    // Set up real-time subscription
    const channel = supabase
      .channel('game_media_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_media'
        },
        (payload) => {
          console.log('Received real-time update:', payload);
          if (payload.eventType === 'DELETE') {
            setGames(prevGames => prevGames.filter(game => game.id !== payload.old.id));
          } else if (payload.eventType === 'INSERT') {
            setGames(prevGames => [...prevGames, payload.new as GameMedia]);
          } else if (payload.eventType === 'UPDATE') {
            setGames(prevGames => prevGames.map(game => 
              game.id === payload.new.id ? payload.new as GameMedia : game
            ));
          }
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
      gamesSection?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <FeaturedCarousel />
      </div>
      
      <section id="games-grid" className="py-8 md:py-12">
        <div className="container max-w-7xl">
          <FilterBar />
          
          <div className="flex flex-col gap-8 mt-8">
            {games.map((game, index) => (
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
                  genre="Action" // Default genre since it's not in the database
                  developer={game.studio_name}
                  marketCap="$1.5M" // Default value
                  dateAdded="Recently added" // Default value
                  plays={10000} // Default value
                  hours={30000} // Default value
                  mints={1500} // Default value
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
