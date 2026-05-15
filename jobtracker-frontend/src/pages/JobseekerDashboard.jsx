import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function JobseekerDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/applications").then((res) => {
      setApplications(res.data);
      setLoading(false);
    });
  }, []);

  const statusStyle = {
    accepted: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
    rejected: "bg-red-50 text-red-500 ring-1 ring-red-100",
    pending: "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
  };

  const stats = {
    total: applications.length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    pending: applications.filter((a) => a.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1">
        <div className="bg-gradient-to-b from-violet-50/80 to-white border-b border-violet-100/50">
          <div className="max-w-5xl mx-auto px-6 pt-12 pb-10">
            <p className="text-sm font-medium text-violet-500 mb-1.5 tracking-wide uppercase">Dashboard</p>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">My Applications</h2>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total", value: stats.total, color: "text-gray-900", bg: "bg-gray-50", ring: "ring-gray-100" },
              { label: "Pending", value: stats.pending, color: "text-amber-600", bg: "bg-amber-50/50", ring: "ring-amber-100/50" },
              { label: "Accepted", value: stats.accepted, color: "text-emerald-600", bg: "bg-emerald-50/50", ring: "ring-emerald-100/50" },
              { label: "Rejected", value: stats.rejected, color: "text-red-500", bg: "bg-red-50/50", ring: "ring-red-100/50" },
            ].map((s) => (
              <div
                key={s.label}
                className={`bg-white rounded-2xl border border-violet-100/60 p-5 text-center shadow-[0_2px_12px_rgb(124_58_237/0.04)] ring-1 ${s.ring}`}
              >
                <p className={`text-3xl font-bold tracking-tight ${s.color}`}>{s.value}</p>
                <p className="text-gray-400 text-sm mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="w-px" />
            <Link
              to="/jobs"
              className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-5 py-2.5 rounded-xl transition-all duration-200 font-semibold shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5"
            >
              Browse Jobs
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3 text-violet-400">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-sm font-medium">Loading...</span>
              </div>
            </div>
          ) : applications.length === 0 ? (
            <div className="bg-white border border-violet-100 rounded-2xl p-16 text-center shadow-[0_1px_3px_rgb(124_58_237/0.04)]">
              <div className="w-16 h-16 rounded-2xl bg-lavender flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">No applications yet.</p>
              <p className="text-gray-300 text-sm mt-1">
                <Link to="/jobs" className="text-violet-500 hover:text-violet-600 font-semibold transition-colors">
                  Browse jobs
                </Link>{" "}
                to get started.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-violet-100/80 shadow-[0_4px_24px_rgb(124_58_237/0.06)] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-violet-50">
                    <th className="px-6 py-4 text-[11px] font-semibold text-violet-400 uppercase tracking-widest">Job Title</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-violet-400 uppercase tracking-widest">Company</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-violet-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-50">
                  {applications.map((app) => (
                    <tr key={app.id} className="group hover:bg-violet-50/40 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900 text-[15px]">{app.job?.title}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{app.job?.company?.name}</td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                            statusStyle[app.status] || statusStyle.pending
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            app.status === "accepted"
                              ? "bg-emerald-400"
                              : app.status === "rejected"
                              ? "bg-red-400"
                              : "bg-amber-400"
                          }`} />
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-violet-100/60 mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <p className="text-center text-xs text-gray-300 font-medium">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
