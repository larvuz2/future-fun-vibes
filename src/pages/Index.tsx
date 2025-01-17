import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FilterBar } from "@/components/FilterBar";
import { Footer } from "@/components/Footer";
import { FocusCards } from "@/components/ui/focus-cards";
import { motion } from "framer-motion";

const featuredGames = [
  {
    title: "Neon Horizon",
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
    genre: "Action RPG",
    developer: "Future Studios"
  },
  {
    title: "Quantum Break",
    src: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80",
    genre: "Adventure",
    developer: "Quantum Games"
  },
  {
    title: "Star Voyager",
    src: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80",
    genre: "Space Sim",
    developer: "Stellar Interactive"
  },
  {
    title: "Cyber Protocol",
    src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80",
    genre: "Strategy",
    developer: "Digital Dreams"
  },
  {
    title: "Tech Empire",
    src: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?auto=format&fit=crop&q=80",
    genre: "Simulation",
    developer: "Future Tech Games"
  },
  {
    title: "Digital Frontier",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
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
          
          <FocusCards cards={featuredGames} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;