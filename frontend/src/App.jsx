import { Link, Route, Routes } from "react-router-dom";
import { WelcomeParagraph } from "./utils/constants";
import ExplorePage from "./pages/ExploreMars";
import Home from "./pages/Home";
import AsteroidDashboard from "./pages/AsteroidDashboard";

function App() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore-mars" element={<ExplorePage />} />
        {/* <Route path="/trivia" element={<Trivia />} /> */}
        <Route path="/feed" element={<AsteroidDashboard />} />
      </Routes>
    </main>
  );
}

export default App;
