import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScanPage from "./pages/ScanPage/ScanPage";
import HistoryPage from "./pages/HistoryPage";
import NavBar from "./pages/Layout";
import AboutPage from "./pages/AboutPage";


export default function App() {
  return (
    // Wraps the entire app with React Router so navigation works
    <BrowserRouter>
    {/* Base layout: full screen height, column layout, dark background */}
      <div className="min-h-screen flex flex-col bg-[#071019] text-white">
          {/* Defines all the app routes */}
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
