import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Twitter } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

// Mock images for the carousel
const gameImages = [
  "/lovable-uploads/f121f658-5bf7-460c-9e1f-f0fb7375181f.png",
  "https://placehold.co/1920x1080/111827/ffffff?text=Game+Screenshot+2",
  "https://placehold.co/1920x1080/111827/ffffff?text=Game+Screenshot+3",
  "https://placehold.co/1920x1080/111827/ffffff?text=Game+Screenshot+4",
  "https://placehold.co/1920x1080/111827/ffffff?text=Game+Screenshot+5",
];

export default function GameDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(gameImages[0]);
  
  console.log("Game ID:", id);
  console.log("Selected Image:", selectedImage);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section with Game Display */}
            <div className="relative rounded-lg overflow-hidden">
              <div className="aspect-video bg-card relative">
                {/* Main Image Display */}
                <img 
                  src={selectedImage} 
                  alt="Game Screenshot" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                  <p className="text-xl mb-4">You need tokens to start</p>
                  <Button className="bg-primary hover:bg-primary/90">
                    Launch Game
                  </Button>
                </div>
              </div>
              
              {/* Thumbnail Carousel */}
              <div className="mt-4">
                <Carousel className="w-full">
                  <CarouselContent>
                    {gameImages.map((image, index) => (
                      <CarouselItem key={index} className="basis-1/4 cursor-pointer" onClick={() => setSelectedImage(image)}>
                        <div className="relative aspect-video">
                          <img 
                            src={image} 
                            alt={`Screenshot ${index + 1}`}
                            className={`w-full h-full object-cover rounded-lg transition-opacity ${selectedImage === image ? 'opacity-100 ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </Carousel>
              </div>
            </div>

            {/* GeckoTerminal Chart */}
            <Card className="p-4">
              <div className="aspect-[16/9] bg-black/90 rounded-lg">
                <iframe 
                  src="https://www.geckoterminal.com/solana/pools/22WrmyTj8x2TRVQen3fxxi2r4Rn6JDHWoMTpsSmn8RUd?embed=1&info=1&swaps=1&grayscale=0&light_chart=0"
                  className="w-full h-full rounded-lg"
                  title="GeckoTerminal Chart"
                  frameBorder="0"
                  allow="clipboard-write"
                  allowFullScreen
                />
              </div>
            </Card>

            {/* Comments Section */}
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Comments</h3>
                <Button variant="outline">Post a Reply</Button>
              </div>
              <div className="space-y-4">
                {[
                  { user: "CryptoWhale", time: "2h ago", comment: "This game looks amazing!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
                  { user: "GameMaster", time: "3h ago", comment: "The graphics are next level!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
                  { user: "TokenHunter", time: "4h ago", comment: "Can't wait to earn some tokens!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
                  { user: "Web3Gamer", time: "5h ago", comment: "The mechanics are so smooth.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4" },
                  { user: "NFTCollector", time: "6h ago", comment: "Love the art style!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5" },
                  { user: "BlockchainDev", time: "7h ago", comment: "Smart contracts look solid.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6" },
                  { user: "MetaGamer", time: "8h ago", comment: "Best P2E game I've seen!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=7" },
                  { user: "DeFiExplorer", time: "9h ago", comment: "Token economics are well thought out.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=8" },
                  { user: "GameInvestor", time: "10h ago", comment: "This has huge potential!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=9" },
                  { user: "CryptoArtist", time: "11h ago", comment: "Visual effects are stunning!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=10" },
                  { user: "Web3Pioneer", time: "12h ago", comment: "Revolutionary gameplay!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=11" }
                ].map((comment, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-card/50 rounded-lg">
                    <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{comment.user}</p>
                        <span className="text-sm text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-sm mt-1">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Buy/Sell Card */}
            <Card className="p-4">
              <div className="flex gap-2 mb-4">
                <Button className="flex-1" variant="default">Buy</Button>
                <Button className="flex-1" variant="outline">Sell</Button>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    className="w-full p-2 bg-background border rounded-md"
                    placeholder="0.00"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2">
                    SOL
                  </span>
                </div>
                <Button className="w-full">Place Trade</Button>
              </div>
            </Card>

            {/* Project Details */}
            <Card className="p-4">
              <h2 className="text-2xl font-bold mb-2">Peanut the Squirrel</h2>
              <p className="text-muted-foreground mb-4">
                Help save peanut the squirrel! Sign the petition!
              </p>
              <div className="space-y-6">
                {/* Progress Bars */}
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

                {/* External Links */}
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                </div>

                {/* Holder Distribution */}
                <div>
                  <h3 className="font-semibold mb-2">Holder Distribution</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
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
                  <Button variant="outline" className="w-full mt-4">
                    Generate Bubble Map
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}