
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, Timer, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GradientText } from "@/components/ui/gradient-text";
import { ProfilePicture } from "@/components/ui/profile-picture";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useRef, useEffect } from "react";
import type { SyntheticEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GameCardProps {
  gameSlug: string;
}

interface GameData {
  name: string;
  slug: string;
  studio: {
    name: string;
  };
  media: {
    profile_picture_url: string;
    video_url: string;
    image_1_url: string | null;
    image_2_url: string | null;
    image_3_url: string | null;
    image_4_url: string | null;
  };
}

export function GameCard({ gameSlug }: GameCardProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  
  useEffect(() => {
    const fetchGameData = async () => {
      let { data: game, error } = await supabase
        .from('games')
        .select(`
          name,
          slug,
          studio:studio_id (
            name
          ),
          media:game_media (
            profile_picture_url,
            video_url,
            image_1_url,
            image_2_url,
            image_3_url,
            image_4_url
          )
        `)
        .eq('slug', gameSlug)
        .single();

      if (error) {
        console.error('Error fetching game:', error);
        return;
      }

      if (game) {
        console.log('Game data fetched:', game);
        setGameData(game);
      }
    };

    fetchGameData();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'games'
        },
        (payload) => {
          console.log('Game changed:', payload);
          fetchGameData();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'studios'
        },
        (payload) => {
          console.log('Studio changed:', payload);
          fetchGameData();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_media'
        },
        (payload) => {
          console.log('Media changed:', payload);
          fetchGameData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameSlug]);

  const handleVideoError = (e: SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    console.error('Video loading error for:', gameData?.name, 
      'Mobile:', isMobile,
      'Error:', video.error?.message,
      'Network State:', video.networkState,
      'Ready State:', video.readyState
    );
    setHasVideoError(true);
  };

  if (!gameData?.media) {
    return null;
  }

  return (
    <Card className={`overflow-hidden glass-card ${!isMobile && 'elegant-hover'}`}>
      <div className="flex flex-col md:flex-row w-full">
        <div className="relative w-full md:w-2/3 cursor-pointer" onClick={() => navigate(`/game/${gameData.slug}`)}>
          <div className="aspect-video relative gradient-overlay">
            {!isVideoLoaded && !hasVideoError && !isMobile && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {hasVideoError ? (
              <img 
                src={gameData.media.image_1_url || ''} 
                alt={gameData.name}
                className="w-full h-full object-cover"
              />
            ) : isMobile ? (
              <video
                src={gameData.media.video_url}
                poster={gameData.media.image_1_url || undefined}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                autoPlay
                onError={handleVideoError}
              />
            ) : (
              <video
                ref={videoRef}
                src={gameData.media.video_url}
                poster={gameData.media.image_1_url || undefined}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                webkit-playsinline="true"
                x5-playsinline="true"
                preload="auto"
                autoPlay
                onLoadedData={() => setIsVideoLoaded(true)}
                onError={handleVideoError}
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4 md:p-6 relative bg-card/40 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <ProfilePicture
              src={gameData.media.profile_picture_url}
              alt={gameData.studio.name}
              size="md"
              className="border-2 border-background shadow-xl"
            />
            <div className="text-foreground">
              <h3 className="font-bold text-xl md:text-2xl leading-tight">{gameData.name}</h3>
              <p className="text-sm text-foreground/80">{gameData.studio.name}</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-black/20 rounded-lg p-2">
                <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium">10,000</p>
                <p className="text-xs text-muted-foreground">Plays</p>
              </div>
              <div className="bg-black/20 rounded-lg p-2">
                <Timer className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium">30,000</p>
                <p className="text-xs text-muted-foreground">Hours</p>
              </div>
              <div className="bg-black/20 rounded-lg p-2">
                <BarChart3 className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium">1,500</p>
                <p className="text-xs text-muted-foreground">Mints</p>
              </div>
            </div>

            <div className="space-y-2 bg-black/20 rounded-lg p-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-medium">$1.5M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Added</span>
                <span className="font-medium">Recently added</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Genre</span>
                <span className="font-medium">Action</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Button 
                className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] border-[#6E59A5] border-b-4 text-white shadow-md flex items-center justify-center" 
                onClick={() => navigate(`/game/${gameData.slug}`)}
              >
                <Gamepad2 className="w-4 h-4 mr-1 text-white" /> Go to Game
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
