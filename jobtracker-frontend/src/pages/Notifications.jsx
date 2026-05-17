import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/notifications").then((res) => {
      setNotifications(res.data);
      setLoading(false);
    });
  }, []);

  const markAsRead = async (id) => {
    await api.post(`/notifications/${id}/read`);
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n
      )
    );
  };

  const markAllAsRead = async () => {
    await Promise.all(
      notifications
        .filter((n) => !n.read_at)
        .map((n) => api.post(`/notifications/${n.id}/read`))
    );
    setNotifications(
      notifications.map((n) => ({ ...n, read_at: new Date().toISOString() }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1">
        <div className="bg-gradient-to-b from-violet-50/80 to-white border-b border-violet-100/50">
          <div className="max-w-3xl mx-auto px-6 pt-12 pb-10">
            <div className="flex justify-between items-end gap-4">
              <div>
                <p className="text-sm font-medium text-violet-500 mb-1.5 tracking-wide uppercase">
                  Updates
                </p>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Notifications
                </h2>
                {unreadCount > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                    <p className="text-sm text-violet-500 font-medium">
                      {unreadCount} unread
                    </p>
                  </div>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm font-medium text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-4 py-2 rounded-xl transition-all duration-200"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3 text-violet-400">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span className="text-sm font-medium">Loading...</span>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="bg-white border border-violet-100 rounded-2xl p-16 text-center shadow-[0_1px_3px_rgb(124_58_237/0.04)]">
              <div className="w-16 h-16 rounded-2xl bg-lavender flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-7 h-7 text-violet-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">No notifications yet.</p>
              <p className="text-gray-300 text-sm mt-1">
                We'll let you know when something arrives.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`rounded-2xl p-5 flex justify-between items-start gap-4 transition-all duration-200 border ${
                    !n.read_at
                      ? "border-violet-200 bg-violet-50/30 shadow-[0_2px_8px_rgb(124_58_237/0.04)]"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <div className="flex gap-4 items-start">
                    <div
                      className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-200 ${
                        !n.read_at
                          ? "bg-violet-500 shadow-sm shadow-violet-500/30"
                          : "bg-gray-200"
                      }`}
                    />
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          !n.read_at ? "text-gray-900" : "text-gray-600"
                        }`}
                      >
                        {n.data?.message || n.data?.title || "New notification"}
                      </p>
                      {n.data?.job_title && (
                        <p className="text-gray-400 text-xs mt-1.5 font-medium">
                          Job: {n.data.job_title}
                        </p>
                      )}
                      <p className="text-gray-300 text-xs mt-2 font-medium">
                        {new Date(n.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  {!n.read_at && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-xs font-medium text-violet-500 hover:text-violet-700 bg-white hover:bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-violet-100/60 mt-auto">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-center text-xs text-gray-300 font-medium">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
