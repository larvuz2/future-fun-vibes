import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Card className="w-full max-w-6xl mx-auto relative overflow-hidden border-0">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        <div className="flex h-full">
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Future.Fun
            </h1>
            <p className="mt-4 text-neutral-300 max-w-lg">
              Discover and invest in the next generation of gaming. Join a community of gamers and investors shaping the future of interactive entertainment.
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore Games
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/hero-image.png"
                alt="Gaming visual"
                className="object-cover w-full h-full opacity-80"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}