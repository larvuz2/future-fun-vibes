
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, Timer, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GradientText } from "@/components/ui/gradient-text";
import { ProfilePicture } from "@/components/ui/profile-picture";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useRef } from "react";

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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleGameClick = () => {
    navigate(gameUrl);
  };

  const handleVideoError = (error: any) => {
    console.error('Video loading error:', error);
    if (retryCount < 2) {
      // Retry loading with a slight delay
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, 1000);
    } else {
      setHasVideoError(true);
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
        // For mobile browsers that block autoplay
        if (isMobile) {
          const playPromise = videoRef.current?.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Show poster image if autoplay is blocked
              setHasVideoError(true);
            });
          }
        }
      });
    }
  };

  return (
    <Card className={`overflow-hidden glass-card ${!isMobile && 'elegant-hover'}`}>
      <div className="flex flex-col md:flex-row w-full">
        <div className="relative w-full md:w-2/3 cursor-pointer" onClick={handleGameClick}>
          <div className="aspect-video relative gradient-overlay">
            {!isVideoLoaded && !hasVideoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {hasVideoError ? (
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                src={videoUrl}
                poster={image}
                className="w-full h-full object-cover"
                loop
                muted
                autoPlay
                playsInline
                webkit-playsinline="true"
                preload="metadata"
                crossOrigin="anonymous"
                type="video/mp4"
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
              />
            )}
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
