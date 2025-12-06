import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function NavBar() {
  // Tracks mobile menu open/close state
  const [open, setOpen] = useState(false);

  return (
    <>
       {/* NAVIGATION BAR WRAPPER */}
      <header className="bg-linear-to-r from-[#02121a] via-[#051827] to-[#02121a] border-b border-[#063047]">
        <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full bg-linear-to-br from-[#00ffd0] to-[#00a6ff] 
              blur-[0.6px] shadow-lg flex items-center justify-center 
              font-extrabold text-green-900 text-lg"
            >
              OCR
            </div>

            <h1 className="text-xl font-extrabold tracking-tight">
              OCR Scanner
            </h1>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white focus:outline-none"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="hidden md:flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-[#033543]" : "hover:bg-[#022f39]"
                }`
              }
            >
              Main
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-[#033543]" : "hover:bg-[#022f39]"
                }`
              }
            >
              History
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-[#033543]" : "hover:bg-[#022f39]"
                }`
              }
            >
              About
            </NavLink>
          </nav>
        </div>

         {/* MOBILE DROPDOWN MENU */}
        {open && (
          <nav className="md:hidden bg-[#02161f] border-t border-[#063047] flex flex-col px-6 py-3 gap-3">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-[#033543]" : "hover:bg-[#022f39]"
                }`
              }
            >
              Main
            </NavLink>

            <NavLink
              to="/history"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-[#033543]" : "hover:bg-[#022f39]"
                }`
              }
            >
              History
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-[#033543]" : "hover:bg-[#022f39]"
                }`
              }
            >
              About
            </NavLink>
          </nav>
        )}
      </header>

      {/* PAGE CONTENT RENDERED BY ROUTER */}
      <main className="grow max-w-5xl mx-auto w-full px-6 py-6">
        <Outlet />
      </main>

      {/* FOOTER SECTION */}
      <footer className="w-full text-center py-4 mt-8 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} OCR Scanner App — Built by Ugonna
        </p>
      </footer>
    </>
  );
}
