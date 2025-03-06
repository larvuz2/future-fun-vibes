
import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProfilePicture } from "@/components/ui/profile-picture";
import { GradientText } from "@/components/ui/gradient-text";
import { useNavigate } from "react-router-dom";

interface GameCardSimpleProps {
  name: string;
  creator: string;
  plays: number;
  imageUrl: string;
  slug: string;
}

export function GameCardSimple({ name, creator, plays, imageUrl, slug }: GameCardSimpleProps) {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/game/${slug}`);
  };

  return (
    <Card 
      className="overflow-hidden glass-card elegant-hover cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col h-full">
        <div className="aspect-video relative gradient-overlay">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4 bg-card/40 backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <ProfilePicture
                src={`https://api.dicebear.com/7.x/shapes/svg?seed=${creator}`}
                alt={creator}
                size="sm"
                className="border-2 border-background shadow-xl"
              />
              <div>
                <h3 className="font-bold text-lg leading-tight">{name}</h3>
                <p className="text-sm text-muted-foreground">{creator}</p>
              </div>
            </div>
            
            <div className="flex items-center text-muted-foreground text-sm">
              <Play className="w-3 h-3 mr-1" />
              <span>{plays.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-3 flex justify-end">
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
    </Card>
  );
}
