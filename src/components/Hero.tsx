
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/gradient-text";
import { ChatInputDemo } from "@/components/ui/chat-input-demo";

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
    <div className="h-auto min-h-[90vh] -mt-20 flex items-center justify-center relative overflow-hidden">
      <Card className="w-full max-w-none mx-auto bg-background/0 relative overflow-hidden border-0 h-full">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        <div className="flex flex-col h-full">
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center max-w-4xl px-4 md:px-0"
            >
              <GradientText 
                className="text-6xl md:text-8xl font-bold mb-6"
                colors={["#ffaa40", "#9c40ff", "#ffaa40"]}
                animationSpeed={8}
                showBorder={false}
              >
                Future.fun
              </GradientText>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl"
              >
                Create a game and share it with the world
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="w-full max-w-3xl mb-8"
              >
                <ChatInputDemo />
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                onClick={scrollToFeaturedGames}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium transition-all"
              >
                Explore Games
              </motion.button>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  );
}
