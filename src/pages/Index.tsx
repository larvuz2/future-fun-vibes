import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GameCard } from "@/components/GameCard";
import { motion } from "framer-motion";

const featuredGames = [
  {
    title: "Neon Horizon",
    image: "/placeholder.svg",
    genre: "Action RPG",
    developer: "Future Studios"
  },
  {
    title: "Quantum Break",
    image: "/placeholder.svg",
    genre: "Adventure",
    developer: "Quantum Games"
  },
  {
    title: "Star Voyager",
    image: "/placeholder.svg",
    genre: "Space Sim",
    developer: "Stellar Interactive"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tighter">Featured Games</h2>
            <p className="text-muted-foreground">Discover handpicked premium gaming experiences</p>
          </motion.div>
          
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
    </div>
  );
};

export default Index;