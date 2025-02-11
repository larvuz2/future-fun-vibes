
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Play, Gamepad2, Clock, Coins } from "lucide-react";

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
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-xl bg-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <Button 
          className="absolute top-2 left-2 h-8 w-8 rounded-full p-0"
          variant="ghost"
          size="icon"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <Badge variant="secondary" className="mb-2">
            {genre}
          </Badge>
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{developer}</p>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-3 h-3" />
            {plays.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            {hours.toLocaleString()}h
          </div>
          <div className="flex items-center gap-2">
            <Coins className="w-3 h-3" />
            {mints.toLocaleString()}
          </div>
        </div>

        <div className="pt-3 flex items-center justify-between">
          <Link 
            to={`/game/${encodeURIComponent(title)}`}
            className="w-full"
          >
            <Button className="w-full gap-2">
              <Play className="w-4 h-4" /> Play Game
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
