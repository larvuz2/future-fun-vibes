import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/3d-button";
import { Heart, Gamepad2, Clock, Coins } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";

interface GameCardProps {
  title: string;
  image: string;
  genre: string;
  developer: string;
  marketCap: string;
  dateAdded: string;
  plays?: number;
  hours?: number;
  mints?: number;
}

export function GameCard({ 
  title, 
  image, 
  genre, 
  developer, 
  marketCap, 
  dateAdded,
  plays = 0,
  hours = 0,
  mints = 0
}: GameCardProps) {
  const gameUrl = `/game/${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-xl bg-card flex"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={gameUrl} className="relative w-[60%]">
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <img
            src="https://cdn2.unrealengine.com/ue-logotype-2023-vertical-white-1686x2048-bbfded26daa7.png"
            alt="Unreal Engine"
            className="absolute top-2 right-2 w-8 h-8 object-contain z-10"
          />
        </div>
      </Link>
      
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <Button 
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 h-10 w-10 rounded-full"
          >
            <Heart className="h-4 w-4" />
          </Button>

          <div>
            <Badge variant="secondary" className="mb-2">
              {genre}
            </Badge>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-12 h-12 rounded-full bg-card overflow-hidden border border-border/50">
                <img 
                  src="https://api.dicebear.com/7.x/pixel-art/svg?seed=studio1"
                  alt={developer}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
                <p className="text-sm text-muted-foreground">{developer}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              {plays.toLocaleString()} plays
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {hours.toLocaleString()}h played
            </div>
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              {mints.toLocaleString()} mints
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <div className="flex-1 flex flex-col items-center">
            <Link to={gameUrl} className="w-full">
              <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] border-[#6E59A5] border-b-4 text-white shadow-md">
                Go to Game
              </Button>
            </Link>
            <div className="flex items-center gap-1 mt-1">
              <GradientText 
                colors={["#FF6B6B", "#4ECDC4", "#45B7D1"]} 
                className="text-xs"
                animationSpeed={4}
              >
                Instant Play
              </GradientText>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
