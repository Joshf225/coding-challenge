import { ToastContainer, toast } from "react-toastify";
import { Link, Route, Routes } from "react-router-dom";
import { WelcomeParagraph } from "./utils/constants";
import ExplorePage from "./pages/ExploreMars";
import Home from "./pages/Home";
import AsteroidDashboard from "./pages/AsteroidDashboard";
import Trivia from "./pages/Trivia";
import CustomToast from "./components/toasts/CustomToast";

function App() {
  return (
    <main className="min-h-screen bg-[#b8c6db] flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore-mars" element={<ExplorePage />} />
        <Route path="/trivia" element={<Trivia />} />
        <Route path="/dashboard" element={<AsteroidDashboard />} />
      </Routes>
      <ToastContainer className="sm:w-[1000px] px-5" autoClose={10000} />
    </main>
  );
}

export default App;
