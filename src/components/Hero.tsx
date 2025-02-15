import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { motion } from "framer-motion";
import { StarBorder } from "@/components/ui/star-border";
import { GradientText } from "@/components/ui/gradient-text";
export function Hero() {
  const scrollToFeaturedGames = () => {
    const gamesSection = document.querySelector('#games-grid');
    if (gamesSection) {
      gamesSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className="min-h-[80vh] md:min-h-screen flex items-center justify-center relative overflow-hidden">
      <Card className="w-full max-w-6xl mx-auto bg-background relative overflow-hidden border-0">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        <div className="flex flex-col md:flex-row h-full min-h-[500px]">
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="space-y-6">
              <div className="text-center md:text-left">
                <GradientText colors={["#ffaa40", "#9c40ff", "#45B7D1"]} className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight inline-block">
                  The Future is Fun
                </GradientText>
              </div>
              <p className="text-lg md:text-xl text-neutral-300 max-w-2xl text-center md:text-left">AAA Indie Games in Your Pocket, No Downloads Required</p>
              <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.3
            }} className="flex justify-center md:justify-start pt-4">
                <StarBorder onClick={scrollToFeaturedGames} className="cursor-pointer" color="hsl(var(--primary))">
                  Explore Games
                </StarBorder>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex-1 relative min-h-[300px] md:min-h-[500px]">
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full absolute inset-0" />
          </div>
        </div>
      </Card>
    </div>;
}