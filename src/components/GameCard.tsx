
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, Timer, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GradientText } from "@/components/ui/gradient-text";
import { ProfilePicture } from "@/components/ui/profile-picture";
import { useIsMobile } from "@/hooks/use-mobile";

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
  image,
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
  const isMobile = useIsMobile();
  const gameUrl = `/game/${title.toLowerCase().replace(/\s+/g, '-')}`;

  const handleGameClick = () => {
    navigate(gameUrl);
  };

  return (
    <Card className={`overflow-hidden glass-card ${!isMobile && 'elegant-hover'}`}>
      <div className="flex flex-col md:flex-row w-full">
        <div className="relative w-full md:w-2/3 cursor-pointer" onClick={handleGameClick}>
          <div className="aspect-video relative gradient-overlay">
            <video
              src={videoUrl}
              className="w-full h-full object-cover"
              loop
              muted
              autoPlay
              playsInline
            />
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4 md:p-6 relative bg-card/40 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <ProfilePicture
              src={profilePictureUrl}
              alt={developer}
              size="md"
              className="border-2 border-background shadow-xl"
            />
            <div className="text-foreground">
              <h3 className="font-bold text-xl md:text-2xl leading-tight">{title}</h3>
              <p className="text-sm text-foreground/80">{developer}</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-black/20 rounded-lg p-2">
                <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium">{plays.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Plays</p>
              </div>
              <div className="bg-black/20 rounded-lg p-2">
                <Timer className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium">{hours.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Hours</p>
              </div>
              <div className="bg-black/20 rounded-lg p-2">
                <BarChart3 className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium">{mints.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Mints</p>
              </div>
            </div>

            <div className="space-y-2 bg-black/20 rounded-lg p-3">
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

            <div className="flex flex-col items-center">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 border-primary-foreground/20 border-b-4 text-primary-foreground shadow-xl flex items-center justify-center transition-all duration-300" 
                onClick={handleGameClick}
              >
                <Gamepad2 className="w-4 h-4 mr-1" /> Play Now
              </Button>
              <div className="flex items-center gap-1 mt-1">
                <GradientText colors={["#FF6B6B", "#4ECDC4", "#45B7D1"]} className="text-xs" animationSpeed={4}>
                  Instant Play
                </GradientText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
