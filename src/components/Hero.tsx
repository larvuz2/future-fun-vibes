
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import { ChatInputDemo } from "@/components/ui/chat-input-demo";
import { CategoryBubbles } from "@/components/ui/category-bubbles";
import { useState } from "react";
import { GradientText } from "@/components/ui/gradient-text";

export function Hero() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  
  const gameCategories = [
    "3D Platformer",
    "Shooter",
    "2D Platformer",
    "3D Art",
    "Racing",
    "Puzzle",
    "Strategy"
  ];

  return (
    <div className="h-auto min-h-[70vh] pt-20 flex items-center justify-center relative overflow-hidden">
      <Card className="w-full max-w-none mx-auto bg-background/0 relative overflow-hidden border-0 h-full">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        <div className="flex flex-col h-full">
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center max-w-5xl px-4 md:px-0"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-4"
              >
                <GradientText 
                  className="text-4xl md:text-6xl font-bold"
                  colors={["#ffaa40", "#9c40ff", "#3a86ff"]}
                  animationSpeed={8}
                >
                  Idea to Games in Seconds
                </GradientText>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl"
              >
                Type the game that you want to build or choose a template:
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-full max-w-4xl mb-4"
              >
                <CategoryBubbles 
                  categories={gameCategories} 
                  selectedCategory={selectedCategory}
                  onSelect={setSelectedCategory}
                  className="mb-6"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="w-full flex justify-center"
              >
                <ChatInputDemo />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  );
}
