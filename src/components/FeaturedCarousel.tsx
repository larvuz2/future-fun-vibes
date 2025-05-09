
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/3d-button";
import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { GradientText } from "@/components/ui/gradient-text";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeaturedGame {
  id: string;
  title: string;
  description: string;
  image: string;
  genre: string;
  developer: string;
  plays: number;
  hours: number;
  mints: number;
}

const featuredGames: FeaturedGame[] = [{
  id: "1",
  title: "Meme Legends",
  description: "Battle through procedurally generated dungeons in this roguelite adventure",
  image: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/Future%20Fun//IMG_9511.png",
  genre: "Roguelite",
  developer: "Metazooie Studios",
  plays: 15000,
  hours: 45000,
  mints: 2500
}, {
  id: "2",
  title: "Eclipse of Shadows",
  description: "Explore a mysterious world filled with ancient secrets and powerful artifacts",
  image: "https://cdn.midjourney.com/a011d27d-bb04-4125-969b-0e5e1d44d98b/0_3.png",
  genre: "Adventure",
  developer: "Nebula Forge Games",
  plays: 12000,
  hours: 36000,
  mints: 1800
}, {
  id: "3",
  title: "Frostspire Ascendancy",
  description: "Command your fleet in epic space battles across the galaxy",
  image: "https://cdn.midjourney.com/39fe3205-7c86-44f1-91c2-c33ecc3acf7a/0_2.png",
  genre: "Space Sim",
  developer: "Glacier Veil Interactive",
  plays: 18000,
  hours: 54000,
  mints: 3200
}];

export function FeaturedCarousel() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full">
      <Carousel className="w-full max-w-7xl mx-auto">
        <CarouselContent>
          {featuredGames.map((game) => {
            const gameUrl = `/game/${game.title.toLowerCase().replace(/\s+/g, '-')}`;
            
            return (
              <CarouselItem key={game.id}>
                <div className="relative h-[70vh] w-full overflow-hidden rounded-lg">
                  <Link to={gameUrl}>
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4 md:text-left text-center"
                    >
                      <Badge variant="secondary" className="mb-2 inline-block text-xs md:text-sm">
                        {game.genre}
                      </Badge>
                      <h2 className="text-4xl font-bold">{game.title}</h2>
                      <p className="text-lg text-muted-foreground max-w-2xl md:mx-0 mx-auto">
                        {game.description}
                      </p>
                      {!isMobile && (
                        <div className="flex items-center gap-6 text-sm text-muted-foreground md:justify-start justify-center flex-wrap">
                          <div className="flex items-center gap-2">
                            {game.plays.toLocaleString()} plays
                          </div>
                          <div className="flex items-center gap-2">
                            {game.hours.toLocaleString()} hours
                          </div>
                          <div className="flex items-center gap-2">
                            {game.mints.toLocaleString()} mints
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-4 pt-4 md:justify-start justify-center">
                        <div className="flex flex-col items-center">
                          <Link to={gameUrl}>
                            <Button className="w-72 bg-[#9b87f5] hover:bg-[#7E69AB] border-[#6E59A5] border-b-4 text-white shadow-md flex items-center justify-center">
                              <Gamepad2 className="w-4 h-4 mr-1 text-white" /> Go to Game
                            </Button>
                          </Link>
                          <div className="flex items-center gap-1 mt-1">
                            <GradientText colors={["#FF6B6B", "#4ECDC4", "#45B7D1"]} className="text-xs" animationSpeed={4}>
                              Instant Play
                            </GradientText>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
