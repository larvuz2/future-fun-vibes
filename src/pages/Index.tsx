import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GameCard } from "@/components/GameCard";
import { FilterBar } from "@/components/FilterBar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const featuredGames = [
  {
    title: "Meme Legends",
    image: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/Future%20Fun//IMG_9511.png",
    genre: "Roguelite",
    developer: "Metazooie Studios",
    marketCap: "$2.3M",
    dateAdded: "3 days ago"
  },
  {
    title: "Eclipse of Shadows",
    image: "https://cdn.midjourney.com/a011d27d-bb04-4125-969b-0e5e1d44d98b/0_3.png",
    genre: "Adventure",
    developer: "Nebula Forge Games",
    marketCap: "$890K",
    dateAdded: "1 week ago"
  },
  {
    title: "Frostspire Ascendancy",
    image: "https://cdn.midjourney.com/39fe3205-7c86-44f1-91c2-c33ecc3acf7a/0_2.png",
    genre: "Space Sim",
    developer: "Glacier Veil Interactive",
    marketCap: "$1.5M",
    dateAdded: "2 weeks ago"
  },
  {
    title: "The Golden Ambush",
    image: "https://cdn.midjourney.com/8ed0c6f7-8385-4b86-ad1d-d32987276d72/0_2.png",
    genre: "Strategy",
    developer: "Verdant Echo Studio",
    marketCap: "$450K",
    dateAdded: "1 month ago"
  },
  {
    title: "Runes of Mythra Canyon",
    image: "https://cdn.midjourney.com/7eb40cc3-79c7-4021-9622-24d4e2a966c0/0_3.png",
    genre: "Simulation",
    developer: "Celestial Quill Games",
    marketCap: "$3.1M",
    dateAdded: "2 months ago"
  },
  {
    title: "Edge of Eternity",
    image: "https://cdn.midjourney.com/2eb4a59c-fc76-459a-b3cc-04c40a5224ae/0_1.png",
    genre: "RPG",
    developer: "Obsidian Rift Studios",
    marketCap: "$720K",
    dateAdded: "3 months ago"
  }
];

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToGames) {
      const gamesSection = document.getElementById('featured-games');
      gamesSection?.scrollIntoView({ behavior: 'smooth' });
      // Clean up the state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <section id="featured-games" className="py-4 md:py-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2 text-center mb-6"
          >
            <h2 className="text-3xl font-bold tracking-tighter">Featured Games</h2>
            <p className="text-muted-foreground">Discover handpicked premium gaming experiences</p>
          </motion.div>
          
          <FilterBar />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game, index) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GameCard {...game} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;