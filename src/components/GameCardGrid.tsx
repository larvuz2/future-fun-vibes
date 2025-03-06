
import { GameCardSimple } from "@/components/GameCardSimple";
import { motion } from "framer-motion";

interface GameGridProps {
  gamesList: { slug: string }[];
}

// Updated game placeholders with new images and titles
const placeholderGames = [
  {
    id: 1,
    name: "Capybara Adventure",
    creator: "Wildlife Studios",
    plays: 24532,
    image: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/hero-images//NZj8EZrdS_y6bcqK9YHV3g.jpg"
  },
  {
    id: 2,
    name: "Beafish",
    creator: "Aquatic Games",
    plays: 18974,
    image: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/hero-images//beafish.png"
  },
  {
    id: 3,
    name: "Space",
    creator: "Cosmic Interactive",
    plays: 31245,
    image: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/hero-images//space.png"
  },
  {
    id: 4,
    name: "Astro Breaker",
    creator: "Stellar Games",
    plays: 15768,
    image: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/hero-images//astro-breaker.png"
  },
  {
    id: 5,
    name: "Bubble Basher",
    creator: "Pop Studios",
    plays: 28943,
    image: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/hero-images//bubble-basher.png"
  },
  {
    id: 6,
    name: "Combat Mission",
    creator: "Tactical Games",
    plays: 42156,
    image: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/hero-images//combat-mission.png"
  },
  {
    id: 7,
    name: "Cars",
    creator: "Racing Productions",
    plays: 12783,
    image: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/hero-images//cars.png"
  },
  {
    id: 8,
    name: "Space Explorer",
    creator: "Galaxy Games",
    plays: 35214,
    image: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/hero-images//space.png"
  },
  {
    id: 9,
    name: "Nautical Adventure",
    creator: "Seafaring Studios",
    plays: 19876,
    image: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/hero-images//sail-the-world.png"
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
            className="h-full" // Added height to ensure parent container maintains consistent height
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
