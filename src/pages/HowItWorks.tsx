import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, Zap, Scale, Laptop2, Users, Rocket, Crown, Smartphone, Coins } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background to-black pointer-events-none" />
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://cdn.midjourney.com/9f9b5720-8697-419a-8a35-c553d1c0107f/0_2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-3xl mx-auto text-center space-y-6 p-8"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Welcome to Future.fun
          </h1>
          <p className="text-xl text-muted-foreground">
            Where premium gaming experiences meet accessibility
          </p>
        </motion.div>
      </section>

      {/* What is Future.fun Section */}
      <section className="container py-24 bg-secondary/5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-3xl font-bold tracking-tighter text-center">What is Future.fun?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Future.fun is a platform that helps developers share their game ideas and prototypes with gamers in a fun and easy way. 
            By buying tokens, players can unlock access to games, support their favorite developers, and experience new and exciting features. 
            Our platform brings premium gaming experiences, including stunning visuals and advanced gameplay, to the average smartphone user.
          </p>
        </motion.div>
      </section>

      {/* How It Works Steps */}
      <section className="container py-24">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tighter text-center mb-16"
          >
            How It Works
          </motion.h2>
          
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                number: "1",
                title: "Game and Token Launch",
                description: "Developers create tokens connected to their games. Players buy these tokens to unlock access to the games and any special features.",
                icon: <Gamepad2 className="w-8 h-8" />
              },
              {
                number: "2",
                title: "Instant Access",
                description: "Tokens let players instantly try out games, from early prototypes to exclusive content, while supporting the developers directly.",
                icon: <Zap className="w-8 h-8" />
              },
              {
                number: "3",
                title: "Fair and Simple",
                description: "Everyone has an equal chance to buy tokens—there are no pre-sales or special treatment for anyone.",
                icon: <Scale className="w-8 h-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass rounded-lg p-6 h-full">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                  <div className="pt-8 text-center space-y-4">
                    <div className="flex justify-center items-center">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Future.fun Section */}
      <section className="container py-24 bg-secondary/5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-16"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Why Future.fun?</h2>
            <p className="text-lg text-muted-foreground">
              Discover the benefits for developers, gamers, and the crypto community
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "For Developers of Advanced Games",
                description: "Future.fun is designed for creators working with tools like Unreal Engine, Unity, or AI-driven workflows to build games that require powerful technology.",
                icon: <Laptop2 className="w-8 h-8 mb-4" />
              },
              {
                title: "For Gamers",
                description: "Explore unique games, try out new mechanics, and enjoy exclusive features while directly supporting the developers behind them.",
                icon: <Users className="w-8 h-8 mb-4" />
              },
              {
                title: "Premium Experiences Anywhere",
                description: "Our advanced streaming and AI technology make it possible to enjoy high-quality visuals and gameplay on mid-range smartphones, without the need for expensive hardware.",
                icon: <Smartphone className="w-8 h-8 mb-4" />
              },
              {
                title: "For the Crypto Community",
                description: "Tokens can be traded, used for rewards, or held as part of a growing ecosystem that values innovation and creativity.",
                icon: <Coins className="w-8 h-8 mb-4" />
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-lg p-6 space-y-4"
              >
                <div className="flex flex-col items-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl font-bold tracking-tighter">Start Exploring</h2>
          <p className="text-lg text-muted-foreground">
            Future.fun makes it easy to support developers and discover exciting new games. 
            Whether you're a gamer or a creator, Future.fun is where great games and communities come to life.
          </p>
          <Button asChild size="lg" className="animate-fade-up">
            <Link to="/">Join Today</Link>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
