import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    api.get("/notifications").then((res) => {
      setUnread(res.data.filter((n) => !n.read_at).length);
    });
  }, []);

  const handleLogout = async () => {
    await api.post("/logout");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-violet-100/60 px-6 lg:px-10 h-16 flex justify-between items-center sticky top-0 z-40">
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 shadow-md shadow-violet-600/20 group-hover:shadow-violet-600/30 transition-shadow duration-300 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent tracking-tight">
          JobTrackr
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          to="/notifications"
          className="relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-all duration-200"
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 bg-violet-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg shadow-violet-600/30 ring-2 ring-white">
              {unread}
            </span>
          )}
        </Link>

        <div className="w-px h-6 bg-violet-100 mx-2" />

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2.5 pl-1">
            <div className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center">
              <span className="text-xs font-bold text-violet-600">
                {user.name ? user.name.charAt(0).toUpperCase() : ""}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
              {user.name}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-500 hover:text-violet-600 hover:bg-violet-50 px-3.5 py-2 rounded-xl transition-all duration-200"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}
