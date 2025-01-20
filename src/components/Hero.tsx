import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { motion } from "framer-motion";
import { StarBorder } from "@/components/ui/star-border";
import { LampContainer } from "@/components/ui/lamp";

export function Hero() {
  const scrollToFeaturedGames = () => {
    const featuredSection = document.querySelector('#featured-games');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Card className="w-full max-w-6xl mx-auto bg-background relative overflow-hidden border-0">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        <div className="flex flex-col md:flex-row h-full min-h-[500px]">
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-relaxed pb-2">
                The Future of Gaming is Here
              </h1>
              <p className="text-lg text-neutral-300 max-w-2xl">
                Experience premium Unreal Engine and Unity games directly in your browser. No downloads required.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
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

          <div className="flex-1 relative flex flex-col">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
            <LampContainer className="min-h-[20vh] -mt-20">
              <div className="h-0 w-0"></div>
            </LampContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}