import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GameDetails from "./pages/GameDetails";
import GamePlay from "./pages/GamePlay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/game/:id/play" element={<GamePlay />} />
      </Routes>
    </Router>
  );
}

export default App;
