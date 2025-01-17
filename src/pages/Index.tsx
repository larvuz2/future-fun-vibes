import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GameCard } from "@/components/GameCard";
import { FilterBar } from "@/components/FilterBar";
import { motion } from "framer-motion";

const featuredGames = [
  {
    title: "Neon Horizon",
    image: "https://source.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    genre: "Action RPG",
    developer: "Future Studios"
  },
  {
    title: "Quantum Break",
    image: "https://source.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    genre: "Adventure",
    developer: "Quantum Games"
  },
  {
    title: "Star Voyager",
    image: "https://source.unsplash.com/photo-1485827404703-89b55fcc595e",
    genre: "Space Sim",
    developer: "Stellar Interactive"
  },
  {
    title: "Cyber Protocol",
    image: "https://source.unsplash.com/photo-1487887235947-a955ef187fcc",
    genre: "Strategy",
    developer: "Digital Dreams"
  },
  {
    title: "Tech Empire",
    image: "https://source.unsplash.com/photo-1483058712412-4245e9b90334",
    genre: "Simulation",
    developer: "Future Tech Games"
  },
  {
    title: "Digital Frontier",
    image: "https://source.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    genre: "RPG",
    developer: "Frontier Studios"
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
    </div>
  );
};

export default Index;