import { motion } from "framer-motion";

interface GameCardProps {
  title: string;
  image: string;
  genre: string;
  developer: string;
}

export function GameCard({ title, image, genre, developer }: GameCardProps) {
  return (
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
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
      <div className="absolute bottom-0 p-4 w-full">
        <div className="space-y-2">
          <p className="text-xs text-primary">{genre}</p>
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{developer}</p>
        </div>
      </div>
    </motion.div>
  );
}