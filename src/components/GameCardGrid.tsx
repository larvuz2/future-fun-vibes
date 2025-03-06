
import { GameCardSimple } from "@/components/GameCardSimple";
import { motion } from "framer-motion";

interface GameGridProps {
  gamesList: { slug: string }[];
}

// Sample data for the placeholder games
const placeholderGames = [
  {
    id: 1,
    name: "Cosmic Explorer",
    creator: "Nebula Studios",
    plays: 24532,
    image: "https://images.unsplash.com/photo-1614469723922-c043ad9fd036?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Voxel Kingdoms",
    creator: "BlockCraft Games",
    plays: 18974,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Neon Racer",
    creator: "Velocity Interactive",
    plays: 31245,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Quantum Quest",
    creator: "Particle Physics",
    plays: 15768,
    image: "https://images.unsplash.com/photo-1636399969264-9b1310218e2d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Stellar Odyssey",
    creator: "Cosmos Games",
    plays: 28943,
    image: "https://images.unsplash.com/photo-1548612614-e54e11d47d94?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Cyber Titans",
    creator: "Digital Frontiers",
    plays: 42156,
    image: "https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Fractal Worlds",
    creator: "Recursive Studios",
    plays: 12783,
    image: "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Polygon Heroes",
    creator: "Geometry Games",
    plays: 35214,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Vector Rush",
    creator: "Linear Labs",
    plays: 19876,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
  }
];

export function GameCardGrid({ gamesList }: GameGridProps) {
  // We'll use placeholder games for now, but in the future this could map to actual games from the database
  // Since we need to display 9 games in a grid, we'll just use the placeholderGames array

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <GameCardSimple
              name={game.name}
              creator={game.creator}
              plays={game.plays}
              imageUrl={game.image}
              slug={gamesList[index]?.slug || `game-${index}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
