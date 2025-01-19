import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Testimonials } from "@/components/ui/testimonials";
import { ButtonDemo } from "@/components/ui/toggle-group-socials";
import { useEffect } from "react";

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop",
    text: "Future.fun has revolutionized how I share my game prototypes. The instant feedback from players is invaluable!",
    name: "Alex Chen",
    username: "@alexdevs",
    social: "https://twitter.com"
  },
  {
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop",
    text: "Being able to play high-end games on my phone without downloads is amazing. The future of gaming is here!",
    name: "David Smith",
    username: "@dsmith",
    social: "https://twitter.com"
  },
  {
    image: "https://i.imgur.com/kaDy9hV.jpeg",
    text: "The token system is brilliant - it's so easy to support developers and get instant access to their games.",
    name: "Emma Brown",
    username: "@emmab",
    social: "https://twitter.com"
  },
  {
    image: "https://i.imgur.com/cRwFxtE.png",
    text: "As a Unity developer, Future.fun gives me a platform to test new mechanics and get real player feedback quickly.",
    name: "James Wilson",
    username: "@jwgames",
    social: "https://twitter.com"
  },
  {
    image: "https://i.imgur.com/TQIqsob.png",
    text: "The streaming quality is incredible. I can't believe I'm playing Unreal Engine games on my mid-range phone!",
    name: "Sarah Lee",
    username: "@sarahplays",
    social: "https://twitter.com"
  },
  {
    image: "https://i.imgur.com/3ROmJ0S.png",
    text: "Future.fun's fair launch system means everyone has an equal chance to participate. No more FOMO!",
    name: "Michael Davis",
    username: "@cryptomike",
    social: "https://twitter.com"
  }
];

const Community = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <Testimonials 
          testimonials={testimonials}
          title="Join Our Growing Community"
          description="Discover what developers and players love about Future.fun"
        />
        
        <div className="mt-24 text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter">Join Our Socials</h2>
          <div className="flex justify-center">
            <ButtonDemo />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;