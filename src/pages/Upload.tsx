import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Upload = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background to-black pointer-events-none" />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 text-left"
            >
              <h1 className="text-4xl font-bold tracking-tighter">Share Your Game with Future.fun</h1>
              
              <p className="text-muted-foreground text-lg">
                Future.fun is the perfect platform to showcase your game prototypes, pilots, and mechanics to a community of gamers eager to explore and support new ideas.
              </p>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex gap-4"
                >
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Create an Account</h3>
                    <p className="text-muted-foreground">Sign up or log in to get started. Your account will give you access to the upload tools and a dashboard to manage your games and tokens.</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Submit Your Game for Review</h3>
                    <p className="text-muted-foreground">Upload your game details, files, and assets. Our internal team will review your submission to ensure it meets platform guidelines and is ready for launch. Reviews typically take <strong>3 working days</strong>.</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex gap-4"
                >
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">Launch Your Game and Token</h3>
                    <p className="text-muted-foreground">Once approved, your game will go live, and players can use tokens to access and explore your game. You'll have tools to track performance, sales, and engagement.</p>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6 bg-secondary/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Important Notes</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Your game must meet basic quality and compatibility requirements for approval.</li>
                  <li>Compute-intensive games using engines like <strong>Unreal Engine</strong>, <strong>Unity</strong>, or <strong>AI-driven features</strong> are ideal for the platform.</li>
                  <li>A complete submission, including visuals, descriptions, and any playable demos, speeds up the review process.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Ready to Share Your Game?</h3>
                <Button size="lg" className="w-full sm:w-auto">
                  Sign Up / Log In
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-xl overflow-hidden sticky top-24"
            >
              <img
                src="https://cdn.midjourney.com/91d24bd7-38d9-41c5-a372-de81e80b6cdd/0_3.png"
                alt="Future.fun Upload Illustration"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;
