
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import { StarBorder } from "@/components/ui/star-border";
import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function Hero() {
  const scrollToFeaturedGames = () => {
    const gamesSection = document.querySelector('#games-grid');
    if (gamesSection) {
      gamesSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="h-[120vh] -mt-20 flex items-end justify-center relative overflow-hidden">
      <Card className="w-full max-w-none mx-auto bg-background/0 relative overflow-hidden border-0">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        {/* 3D Scene Container */}
        <div className="absolute inset-0 w-full h-full">
          <Suspense 
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <span className="loader"></span>
              </div>
            }
          >
            <Spline 
              scene="https://prod.spline.design/9uIrAt0WtiX8HtyD/scene.splinecode" 
              className="w-full h-full"
            />
          </Suspense>
        </div>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-end pb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-3 flex flex-col items-center"
            >
              <p className="text-lg md:text-xl text-neutral-300 max-w-2xl text-center">
                Cloud-Powered Indie Games: From Metahumans to AI Worlds
              </p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
              >
                <StarBorder 
                  onClick={scrollToFeaturedGames} 
                  className="cursor-pointer" 
                  color="hsl(var(--primary))"
                >
                  Explore Games
                </StarBorder>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  );
}
