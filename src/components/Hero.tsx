import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="container relative z-10 px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
            The Future of Gaming is Here
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience premium Unreal Engine and Unity games directly in your browser. No downloads required.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Explore Games
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}