
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/3d-button";
import { Heart, Gamepad2, Clock, Coins } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

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
  videoUrl?: string;
  profilePictureUrl?: string;
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
  mints = 0,
  videoUrl,
  profilePictureUrl
}: GameCardProps) {
  const gameUrl = `/game/${title.toLowerCase().replace(/\s+/g, '-')}`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      if (isVisible) {
        console.log(`Attempting to play video for ${title}:`, videoUrl);
        videoRef.current.play().catch((error) => {
          console.error('Video playback failed:', error);
          setVideoError(true);
          toast.error(`Failed to play video for ${title}`);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible, videoUrl, title]);

  const handleVideoError = () => {
    console.error(`Video error for ${title}:`, videoUrl);
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log(`Video loaded successfully for ${title}`);
    setVideoError(false);
  };
  
  return (
    <motion.div 
      ref={cardRef}
      className="group relative overflow-hidden rounded-xl bg-card flex flex-col md:flex-row border border-border/10"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={gameUrl} className={`relative ${isMobile ? 'w-full aspect-video' : 'w-[60%]'}`}>
        <div className="w-full h-full overflow-hidden rounded-xl">
          {videoUrl && !videoError ? (
            <video
              ref={videoRef}
              key={videoUrl}
              src={videoUrl}
              className="w-full h-full object-cover"
              preload="auto"
              autoPlay={isVisible}
              loop
              muted
              playsInline
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
            />
          ) : (
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          )}
          <img
            src="https://cdn2.unrealengine.com/ue-logotype-2023-vertical-white-1686x2048-bbfded26daa7.png"
            alt="Unreal Engine"
            className="absolute top-2 right-2 w-8 h-8 object-contain z-10"
          />
        </div>
      </Link>
      
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
        <div className="space-y-4 md:space-y-6">
          <Button 
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 h-10 w-10 rounded-full"
          >
            <Heart className="h-4 w-4" />
          </Button>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-card overflow-hidden border border-border/50 flex-shrink-0">
                <img 
                  src={profilePictureUrl || "https://api.dicebear.com/7.x/pixel-art/svg?seed=studio1"}
                  alt={developer}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold leading-tight">{title}</h3>
                <p className="text-sm text-muted-foreground">{developer}</p>
              </div>
            </div>
            
            <div>
              <Badge variant="secondary">
                {genre}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:flex md:gap-6 gap-2 text-xs md:text-sm text-muted-foreground">
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

        <div className="flex items-center gap-4 mt-4 md:mt-6">
          <div className="flex-1 flex flex-col items-center">
            <Link to={gameUrl} className="w-full">
              <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] border-[#6E59A5] border-b-4 text-white shadow-md flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 mr-1 text-white" /> Go to Game
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
