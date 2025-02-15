
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  title: string;
  image: string;
  genre: string;
  developer: string;
  marketCap: string;
  dateAdded: string;
  plays: number;
  hours: number;
  mints: number;
  videoUrl: string;
  profilePictureUrl: string;
}

export function GameCard({
  title,
  genre,
  developer,
  marketCap,
  dateAdded,
  plays,
  hours,
  mints,
  videoUrl,
  profilePictureUrl
}: GameCardProps) {
  const navigate = useNavigate();

  const handleGameClick = () => {
    const gameId = title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/game/${gameId}`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row w-full">
        <div className="relative w-full md:w-2/3">
          <div className="aspect-video relative">
            <video
              src={videoUrl}
              className="w-full h-full object-cover"
              loop
              muted
              autoPlay
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4 md:p-6 relative">
          <div className="flex items-start gap-3 absolute -top-12 md:top-6 left-4 md:left-6 z-10">
            <img
              src={profilePictureUrl}
              alt={developer}
              className="w-16 h-16 rounded-full border-2 border-background"
            />
            <div className="text-white md:text-foreground">
              <h3 className="font-bold text-lg leading-tight">{title}</h3>
              <p className="text-sm opacity-90">{developer}</p>
            </div>
          </div>

          <div className="mt-16 md:mt-32 space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Users className="w-4 h-4 mx-auto mb-1" />
                <p className="text-sm font-medium">{plays.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Plays</p>
              </div>
              <div>
                <Timer className="w-4 h-4 mx-auto mb-1" />
                <p className="text-sm font-medium">{hours.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Hours</p>
              </div>
              <div>
                <BarChart3 className="w-4 h-4 mx-auto mb-1" />
                <p className="text-sm font-medium">{mints.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Mints</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-medium">{marketCap}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Added</span>
                <span className="font-medium">{dateAdded}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Genre</span>
                <span className="font-medium">{genre}</span>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handleGameClick}
            >
              View Game
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
