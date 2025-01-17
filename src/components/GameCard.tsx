import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface GameCardProps {
  title: string;
  image: string;
  genre: string;
  developer: string;
  marketCap: string;
  dateAdded: string;
}

export function GameCard({ title, image, genre, developer, marketCap, dateAdded }: GameCardProps) {
  return (
    <Link to={`/game/${encodeURIComponent(title)}`}>
      <motion.div 
        className="group relative overflow-hidden rounded-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <img
            src="https://www.nicepng.com/png/detail/321-3211558_unreal-logo-png-for-kids-unreal-engine-icon.png"
            alt="Unreal Engine"
            className="absolute top-2 right-2 w-8 h-8 object-contain z-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-0 p-4 w-full">
          <div className="space-y-2">
            <p className="text-xs text-primary">{genre}</p>
            <h3 className="text-lg font-semibold leading-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{developer}</p>
            <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
              <span>Market cap: {marketCap}</span>
              <span>{dateAdded}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}