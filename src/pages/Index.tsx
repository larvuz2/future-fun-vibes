import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GameCard } from "@/components/GameCard";
import { FilterBar } from "@/components/FilterBar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const featuredGames = [
  {
    title: "Neon Horizon",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
    genre: "Action RPG",
    developer: "Future Studios",
    marketCap: "$2.3M",
    dateAdded: "3 days ago"
  },
  {
    title: "Quantum Break",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80",
    genre: "Adventure",
    developer: "Quantum Games",
    marketCap: "$890K",
    dateAdded: "1 week ago"
  },
  {
    title: "Star Voyager",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80",
    genre: "Space Sim",
    developer: "Stellar Interactive",
    marketCap: "$1.5M",
    dateAdded: "2 weeks ago"
  },
  {
    title: "Cyber Protocol",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80",
    genre: "Strategy",
    developer: "Digital Dreams",
    marketCap: "$450K",
    dateAdded: "1 month ago"
  },
  {
    title: "Tech Empire",
    image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?auto=format&fit=crop&q=80",
    genre: "Simulation",
    developer: "Future Tech Games",
    marketCap: "$3.1M",
    dateAdded: "2 months ago"
  },
  {
    title: "Digital Frontier",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
    genre: "RPG",
    developer: "Frontier Studios",
    marketCap: "$720K",
    dateAdded: "3 months ago"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <section className="py-8 md:py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 text-center mb-8"
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