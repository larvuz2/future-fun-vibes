
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import GameDetails from "@/pages/GameDetails";
import GamePlay from "@/pages/GamePlay";
import Documentation from "@/pages/Documentation";
import HowItWorks from "@/pages/HowItWorks";
import DocsAdmin from "@/pages/DocsAdmin";
import Community from "@/pages/Community";
import Upload from "@/pages/Upload";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import GameEditor from "@/pages/admin/GameEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/game/:id/play" element={<GamePlay />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/docs-admin" element={<DocsAdmin />} />
        <Route path="/community" element={<Community />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/games/:id" element={<GameEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
