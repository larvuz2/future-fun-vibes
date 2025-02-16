
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import { StarBorder } from "@/components/ui/star-border";
import { GradientText } from "@/components/ui/gradient-text";
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
    <div className="min-h-[80vh] md:min-h-screen flex items-center justify-center relative overflow-hidden">
      <Card className="w-full max-w-6xl mx-auto bg-background relative overflow-hidden border-0">
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
        
        <div className="flex flex-col h-full min-h-[500px] pt-20 md:pt-0">
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="text-center md:text-left">
                <GradientText 
                  colors={["#ffaa40", "#9c40ff", "#45B7D1"]} 
                  className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight inline-block"
                >
                  The Future is Fun
                </GradientText>
              </div>
              <p className="text-lg md:text-xl text-neutral-300 max-w-2xl text-center md:text-left">
                Cloud-Powered Indie Games: From Metahumans to AI Worlds
              </p>
              <div className="text-center md:text-left">
                <GradientText 
                  colors={["#FF6B6B", "#4ECDC4", "#45B7D1"]} 
                  className="text-sm inline-block" 
                  animationSpeed={4}
                >
                  Instant Play
                </GradientText>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center md:justify-start pt-4"
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
