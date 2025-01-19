import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import HowItWorks from "@/pages/HowItWorks";
import Community from "@/pages/Community";
import Documentation from "@/pages/Documentation";
import Upload from "@/pages/Upload";
import GameDetails from "@/pages/GameDetails";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/community" element={<Community />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
