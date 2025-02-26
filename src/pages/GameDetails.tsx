
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Twitter, Calendar, Users, Target, Clock, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfilePicture } from "@/components/ui/profile-picture";
import { GAMES } from "@/data/games";
import { Badge } from "@/components/ui/badge";

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

interface Milestone {
  date: string;
  title: string;
  completed: boolean;
}

interface BackingTier {
  name: string;
  amount: number;
  perks: string[];
  limited?: number;
  remaining?: number;
}

const BACKING_TIERS: BackingTier[] = [
  {
    name: "Early Bird",
    amount: 25,
    perks: ["Early Access", "Name in Credits", "Digital Soundtrack"],
    limited: 100,
    remaining: 45
  },
  {
    name: "Developer's Circle",
    amount: 100,
    perks: ["Previous Tier", "Beta Access", "Discord Role", "Digital Artbook"],
    limited: 50,
    remaining: 28
  },
  {
    name: "Founding Member",
    amount: 500,
    perks: ["Previous Tiers", "Design a Character", "5% Revenue Share", "Physical Collector's Box"],
    limited: 10,
    remaining: 4
  }
];

const MILESTONES: Milestone[] = [
  { date: "2024-01-15", title: "Project Kickoff", completed: true },
  { date: "2024-03-01", title: "Alpha Release", completed: false },
  { date: "2024-04-15", title: "Beta Testing", completed: false },
  { date: "2024-06-01", title: "Official Launch", completed: false }
];

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameMedia, setGameMedia] = useState<GameMedia | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentFunding, setCurrentFunding] = useState(75000);
  const [fundingGoal] = useState(100000);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!id) return;
    
    const gameSlug = id.toLowerCase();
    const foundGame = GAMES.find(g => g.game_name.toLowerCase().replace(/\s+/g, '-') === gameSlug);
    
    if (foundGame) {
      setGameMedia({
        game_name: foundGame.game_name,
        studio_name: foundGame.studio_name,
        video_url: foundGame.video_url,
        profile_picture_url: foundGame.profile_picture_url,
        image_1_url: foundGame.image_1_url,
        image_2_url: foundGame.image_1_url,
        image_3_url: foundGame.image_1_url,
        image_4_url: foundGame.image_1_url
      });
      setSelectedImage(foundGame.video_url);
    } else {
      toast({
        title: "Game Not Found",
        description: "The requested game could not be found",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
  }, [id, toast, navigate]);

  const handlePlaytest = () => {
    navigate(`/game/${id}/play`);
  };

  const handleImageSelect = (url: string) => {
    setSelectedImage(url);
  };

  const getNextMilestone = () => {
    const upcoming = MILESTONES.find(m => !m.completed);
    return upcoming || MILESTONES[MILESTONES.length - 1];
  };

  const calculateDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-2">Back this Project</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join {gameMedia?.game_name}'s journey and get exclusive rewards
            </p>
          </div>

          {BACKING_TIERS.map((tier, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">{tier.name}</h4>
                <span className="text-xl font-bold">${tier.amount}</span>
              </div>
              {tier.limited && (
                <div className="text-sm text-muted-foreground">
                  {tier.remaining} of {tier.limited} remaining
                </div>
              )}
              <ul className="space-y-2">
                {tier.perks.map((perk, i) => (
                  <li key={i} className="text-sm flex items-center gap-2">
                    <span className="text-primary">•</span> {perk}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Select Reward</Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{gameMedia?.game_name}</h2>
            <p className="text-muted-foreground mb-4">
              A fast-paced, third-person action roguelike where Capy, a heroic capybara, teams up with viral internet icons like MoodDeng and Doge to battle across chaotic multiverses and restore balance.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Funding Progress</span>
              <span>{Math.round((currentFunding / fundingGoal) * 100)}%</span>
            </div>
            <Progress value={(currentFunding / fundingGoal) * 100} className="h-2" />
            <div className="flex justify-between text-sm pt-1">
              <span className="font-medium">${currentFunding.toLocaleString()}</span>
              <span className="text-muted-foreground">of ${fundingGoal.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 border rounded-lg">
              <Users className="w-5 h-5 mx-auto mb-1" />
              <div className="font-semibold">389</div>
              <div className="text-xs text-muted-foreground">Backers</div>
            </div>
            <div className="p-3 border rounded-lg">
              <Clock className="w-5 h-5 mx-auto mb-1" />
              <div className="font-semibold">{calculateDaysUntil(getNextMilestone().date)}</div>
              <div className="text-xs text-muted-foreground">Days Left</div>
            </div>
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
            <h3 className="font-semibold mb-2">Project Timeline</h3>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div className="space-y-4">
                {MILESTONES.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      milestone.completed ? 'text-muted-foreground' : ''
                    }`}
                  >
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      milestone.completed ? 'bg-primary' : 'bg-muted-foreground'
                    }`} />
                    <div>
                      <div className="text-sm font-medium">{milestone.title}</div>
                      <div className="text-xs">
                        {new Date(milestone.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
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
                  {selectedImage?.endsWith('.mp4') ? (
                    <video 
                      src={selectedImage} 
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img 
                      src={selectedImage || gameMedia.image_1_url} 
                      alt="Game preview"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="absolute bottom-4 right-4 left-4 flex flex-row items-center justify-between bg-black/70 p-3 rounded-lg">
                  <p className="text-sm text-white">Early Access Available</p>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={handlePlaytest}
                    size="sm"
                  >
                    Playtest
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 p-2">
                {[gameMedia.video_url, gameMedia.image_1_url, gameMedia.image_2_url, gameMedia.image_3_url].map((url, index) => (
                  <div
                    key={index}
                    className={`aspect-video cursor-pointer rounded-md overflow-hidden border-2 ${
                      selectedImage === url ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => handleImageSelect(url)}
                  >
                    {url.endsWith('.mp4') ? (
                      <video 
                        src={url}
                        className="w-full h-full object-cover"
                        muted
                      />
                    ) : (
                      <img 
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Latest Updates</h2>
                  <div className="space-y-6">
                    {[
                      {
                        date: "2024-02-15",
                        title: "Combat System Preview",
                        category: "Development",
                        content: "We're excited to share the first look at our revolutionary combat system..."
                      },
                      {
                        date: "2024-02-10",
                        title: "New Character Designs",
                        category: "Art",
                        content: "Check out these awesome new character concepts from our art team..."
                      }
                    ].map((update, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{update.category}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(update.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{update.title}</h3>
                        <p className="text-muted-foreground">{update.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {!isMobile && (
            <div>
              <SidebarContent />
            </div>
          )}
          
          {isMobile && <SidebarContent />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
