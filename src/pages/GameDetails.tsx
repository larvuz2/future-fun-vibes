import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Twitter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfilePicture } from "@/components/ui/profile-picture";

interface GameMedia {
  game_name: string;
  studio_name: string;
  video_url: string;
  profile_picture_url: string;
  image_1_url: string;
  image_2_url: string;
  image_3_url: string;
  image_4_url: string;
}

const HARDCODED_GAME_MEDIA: Record<string, GameMedia> = {
  'drillhorn': {
    game_name: "Drillhorn",
    studio_name: "Future Studios",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//Bulldozer.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=drillhorn",
    image_1_url: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    image_2_url: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    image_3_url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    image_4_url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
  },
  'skyfang': {
    game_name: "Skyfang",
    studio_name: "Dragon Games",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//DRAGON.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=skyfang",
    image_1_url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    image_2_url: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    image_3_url: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    image_4_url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
  },
  'big-hairy-snowman': {
    game_name: "Big Hairy Snowman",
    studio_name: "Snow Studios",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//HAIRY.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=snowman",
    image_1_url: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
    image_2_url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    image_3_url: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    image_4_url: "https://images.unsplash.com/photo-1501286353178-1ec881214838"
  },
  'meme-legends': {
    game_name: "Meme Legends",
    studio_name: "Meme Factory",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//MEME.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=meme",
    image_1_url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    image_2_url: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
    image_3_url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    image_4_url: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937"
  },
  'fluid-simulation-puzzles': {
    game_name: "Fluid Simulation Puzzles",
    studio_name: "Physics Games",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//FLUID.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=fluid",
    image_1_url: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    image_2_url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    image_3_url: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
    image_4_url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
  },
  'forest-drone': {
    game_name: "Forest Drone",
    studio_name: "Drone Games",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//Drone%20and%20Basic%20Controller%20-%20Unreal%20Engine%20(1).mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=drone",
    image_1_url: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    image_2_url: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    image_3_url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    image_4_url: "https://images.unsplash.com/photo-1473177104440-ffee2f376098"
  }
};

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameMedia, setGameMedia] = useState<GameMedia | null>(null);
  const [extractedFrames, setExtractedFrames] = useState<string[]>([]);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!id) return;
    
    const gameData = HARDCODED_GAME_MEDIA[id as keyof typeof HARDCODED_GAME_MEDIA];
    
    if (!gameData) {
      toast({
        title: "Game Not Found",
        description: "The requested game could not be found",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    setGameMedia(gameData);

    // Extract frames from video
    const extractFrames = async () => {
      try {
        const response = await supabase.functions.invoke('extract-video-frames', {
          body: {
            videoUrl: gameData.video_url,
            gameName: gameData.game_name.toLowerCase().replace(/\s+/g, '-')
          }
        });

        if (response.error) {
          console.error('Error extracting frames:', response.error);
          return;
        }

        const { frameUrls } = response.data;
        if (frameUrls && frameUrls.length > 0) {
          setExtractedFrames(frameUrls);
        }
      } catch (error) {
        console.error('Error calling extract-video-frames:', error);
      }
    };

    extractFrames();
  }, [id, toast, navigate]);
  
  const handleLaunchGame = () => {
    navigate(`/game/${id}/play`);
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex gap-2 mb-4">
          <Button className="flex-1" variant="default">Buy</Button>
          <Button className="flex-1" variant="outline">Sell</Button>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="number"
              className="w-full p-2 bg-background border rounded-md pr-16"
              placeholder="0.00"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <img 
                src="https://seeklogo.com/images/S/solana-sol-logo-12828AD23D-seeklogo.com.png" 
                alt="Solana Logo" 
                className="w-4 h-4"
              />
              <span>SOL</span>
            </div>
          </div>
          <Button className="w-full">Place Trade</Button>
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-2xl font-bold mb-2">{gameMedia?.game_name}</h2>
        <p className="text-muted-foreground mb-4">
          A fast-paced, third-person action roguelike where Capy, a heroic capybara, teams up with viral internet icons like MoodDeng and Doge to battle across chaotic multiverses and restore balance.
        </p>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Bonding Curve Progress</span>
              <span>100%</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>King of the Hill Progress</span>
              <span>100%</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.open('https://metazooie.com/', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Website
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.open('https://x.com/metazooie', '_blank')}
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter/X
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Holder Distribution</h3>
            <ScrollArea className="h-[200px] rounded-md border p-2">
              <div className="space-y-2">
                {[
                  { address: "Ze3DmU", percentage: "42.51%" },
                  { address: "BucChS", percentage: "11.40%" },
                  { address: "SPUDww", percentage: "3.94%" },
                  { address: "Kj9mNp", percentage: "3.25%" },
                  { address: "Wx5vRt", percentage: "2.87%" },
                  { address: "Hn2qLs", percentage: "2.43%" },
                  { address: "Py7kFd", percentage: "2.11%" },
                  { address: "Qm4wGx", percentage: "1.95%" },
                  { address: "Vb9nJc", percentage: "1.82%" },
                  { address: "Tc6hBv", percentage: "1.76%" },
                  { address: "Uf3gNm", percentage: "1.68%" },
                  { address: "Yz8xAw", percentage: "1.54%" },
                  { address: "Rk5pEs", percentage: "1.47%" }
                ].map((holder, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm p-2 bg-card/50 rounded-md"
                  >
                    <span className="font-mono">{holder.address}</span>
                    <span>{holder.percentage}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </Card>
    </div>
  );

  if (!gameMedia) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-6 mt-20">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <ProfilePicture 
                src={gameMedia?.profile_picture_url}
                alt={gameMedia?.studio_name || ''}
                size="md"
                className="border-2 border-border"
              />
              <div>
                <h3 className="text-xl font-bold">{gameMedia?.game_name}</h3>
                <p className="text-sm text-muted-foreground">{gameMedia?.studio_name}</p>
              </div>
            </div>

            <Card className="overflow-hidden bg-card">
              <div className="w-full relative">
                <div className="aspect-video">
                  <video 
                    src={gameMedia?.video_url} 
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
                <div className="absolute bottom-4 right-4 left-4 flex flex-row items-center justify-between bg-black/70 p-3 rounded-lg">
                  <p className="text-sm text-white">You need tokens to start</p>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleLaunchGame}
                    size="sm"
                  >
                    Launch Game
                  </Button>
                </div>
              </div>
            </Card>

            {isMobile && <SidebarContent />}

            <Card className="p-4">
              <div className={`bg-black/90 rounded-lg ${isMobile ? 'aspect-square' : 'aspect-[16/9]'}`}>
                <iframe 
                  height="100%" 
                  width="100%" 
                  id="geckoterminal-embed" 
                  title="GeckoTerminal Embed" 
                  src="https://www.geckoterminal.com/solana/pools/22WrmyTj8x2TRVQen3fxxi2r4Rn6JDHWoMTpsSmn8RUd?embed=1&info=0&swaps=0&grayscale=0&light_chart=0" 
                  frameBorder="0" 
                  allow="clipboard-write" 
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={gameMedia?.profile_picture_url}
                      alt={gameMedia?.studio_name} 
                      className="w-24 h-24 rounded-full object-cover border-2 border-border"
                    />
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-2xl font-bold">{gameMedia?.studio_name}</h3>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm text-muted-foreground">Active Developer</span>
                      </div>
                      <div className="hidden md:block h-4 w-px bg-border"></div>
                      <span className="text-sm text-muted-foreground">Joined 2024</span>
                    </div>
                    <p className="text-muted-foreground">
                      {gameMedia?.studio_name} is a pioneering Web3 game development studio focused on creating engaging, accessible experiences. 
                      With a passion for innovation and community-driven development, they're pushing the boundaries of what's possible in browser-based gaming.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <Card className="p-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Monthly Players</h4>
                      <p className="text-2xl font-bold">127.8K</p>
                      <div className="flex items-center text-xs text-green-500">
                        <span>↑ 23% from last month</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 col-span-1 md:col-span-2">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Top Player Cities</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">1.</span>
                            <span>Singapore</span>
                          </div>
                          <p className="text-sm text-muted-foreground">42.5K players</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">2.</span>
                            <span>Tokyo</span>
                          </div>
                          <p className="text-sm text-muted-foreground">38.2K players</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">3.</span>
                            <span>Seoul</span>
                          </div>
                          <p className="text-sm text-muted-foreground">31.7K players</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="border-t pt-4">
                  <p className="text-center text-muted-foreground">
                    "Thank you for being part of our journey! Together, we're building something special." <span className="text-purple-500">❤️</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {!isMobile && (
            <div>
              <SidebarContent />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
