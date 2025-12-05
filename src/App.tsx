import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScanPage from "./pages/ScanPage/ScanPage";
import HistoryPage from "./pages/HistoryPage";
import NavBar from "./components/NavBar";
import AboutPage from "./pages/AboutPage";


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#071019] text-white">
        <Routes>
          {/* Layout Route */}
          <Route path="/" element={<NavBar />}>
            <Route index element={<ScanPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="/about" element={<AboutPage />} />

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
