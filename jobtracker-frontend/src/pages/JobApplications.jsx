import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function JobApplications() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(null);
  const [matchResults, setMatchResults] = useState({});

  useEffect(() => {
    api.get(`/jobs/${id}`).then((res) => {
      setJob(res.data);
      setApplications(res.data.applications || []);
      setLoading(false);
    });
  }, [id]);

  const handleStatus = async (appId, status) => {
    await api.patch(`/applications/${appId}/${status}`);
    setApplications(
      applications.map((a) => (a.id === appId ? { ...a, status } : a))
    );
  };

  const analyzeCV = async (appId) => {
    setAnalyzing(appId);
    try {
      const res = await api.get(`/applications/${appId}/match`);
      setMatchResults({ ...matchResults, [appId]: res.data });
    } catch {
      setMatchResults({
        ...matchResults,
        [appId]: { error: "Analysis failed" },
      });
    }
    setAnalyzing(null);
  };

  const scoreColor = (score) => {
    if (score >= 75) return "text-emerald-600";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  const scoreBarColor = (score) => {
    if (score >= 75) return "bg-emerald-500";
    if (score >= 50) return "bg-amber-400";
    return "bg-red-500";
  };

  const statusStyle = {
    accepted: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
    rejected: "bg-red-50 text-red-500 ring-1 ring-red-100",
    pending: "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1">
        <div className="bg-gradient-to-b from-violet-50/80 to-white border-b border-violet-100/50">
          <div className="max-w-4xl mx-auto px-6 pt-12 pb-10">
            <button
              onClick={() => navigate("/company")}
              className="text-gray-400 hover:text-violet-600 transition-colors duration-200 flex items-center gap-1.5 text-sm font-medium mb-5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Jobs
            </button>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-violet-500 mb-1.5 tracking-wide uppercase">Applications</p>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  {job?.title}
                </h2>
                <p className="text-gray-400 text-sm mt-1.5 font-medium">
                  {applications.length} applicant{applications.length !== 1 ? "s" : ""}
                </p>
              </div>
              {applications.length > 0 && (
                <div className="hidden sm:flex items-center gap-2 bg-violet-50 px-4 py-2 rounded-xl">
                  <svg className="w-4 h-4 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <span className="text-sm font-semibold text-violet-600">{applications.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
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
              <p className="text-gray-300 text-sm mt-1">Applications will appear here once candidates apply.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-violet-100/80 shadow-[0_2px_12px_rgb(124_58_237/0.04)] overflow-hidden hover:shadow-[0_4px_24px_rgb(124_58_237/0.07)] transition-shadow duration-300"
                >
                  <div className="p-6 lg:p-7">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-lavender flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-sm font-bold text-violet-600">
                            {app.user?.name ? app.user.name.charAt(0).toUpperCase() : ""}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-[15px]">
                            {app.user?.name}
                          </p>
                          <p className="text-gray-400 text-sm mt-0.5">{app.user?.email}</p>
                          <div className="flex items-center gap-1.5 mt-2 text-gray-400 text-sm">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {app.location}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${statusStyle[app.status] || statusStyle.pending
                          }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${app.status === "accepted"
                            ? "bg-emerald-400"
                            : app.status === "rejected"
                              ? "bg-red-400"
                              : "bg-amber-400"
                          }`} />
                        {app.status}
                      </span>
                    </div>

                    <div className="flex gap-2.5 mt-6 flex-wrap">
                      {app.status !== "accepted" && (
                        <button
                          onClick={() => handleStatus(app.id, "accepted")}
                          className="text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-sm shadow-emerald-600/20"
                        >
                          Accept
                        </button>
                      )}
                      {app.status !== "rejected" && (
                        <button
                          onClick={() => handleStatus(app.id, "rejected")}
                          className="text-sm font-medium bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-sm shadow-red-500/20"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => analyzeCV(app.id)}
                        disabled={analyzing === app.id}
                        className="text-sm font-medium border border-violet-200 text-violet-600 hover:bg-violet-50 px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                        {analyzing === app.id ? "Analyzing..." : "Analyze CV"}
                      </button>
                    </div>
                  </div>

                  {matchResults[app.id] && (
                    <div className="border-t border-violet-50 p-6 lg:p-7 bg-gradient-to-b from-violet-50/30 to-white">
                      {matchResults[app.id].error ? (
                        <div className="flex items-center gap-2.5">
                          <svg className="w-5 h-5 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                          </svg>
                          <p className="text-red-500 text-sm font-medium">
                            {matchResults[app.id].error}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-5">
                          <div className="flex items-center gap-5">
                            <p
                              className={`text-4xl font-bold tracking-tight ${scoreColor(
                                matchResults[app.id].score
                              )}`}
                            >
                              {matchResults[app.id].score}
                            </p>
                            <div className="flex-1">
                              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                Match Score
                              </p>
                              <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                <div
                                  className={`h-2.5 rounded-full transition-all duration-700 ease-out ${scoreBarColor(
                                    matchResults[app.id].score
                                  )}`}
                                  style={{
                                    width: `${matchResults[app.id].score}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-500 text-sm leading-relaxed">
                            {matchResults[app.id].summary}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100/60">
                              <p className="text-emerald-600 text-xs font-bold mb-3 uppercase tracking-wider flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Strengths
                              </p>
                              <ul className="space-y-2">
                                {matchResults[app.id].strengths?.map((s, i) => (
                                  <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                                    <span className="w-1 h-1 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                    {s}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-red-50/60 rounded-xl p-4 border border-red-100/60">
                              <p className="text-red-500 text-xs font-bold mb-3 uppercase tracking-wider flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                                Weaknesses
                              </p>
                              <ul className="space-y-2">
                                {matchResults[app.id].weaknesses?.map((w, i) => (
                                  <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                                    <span className="w-1 h-1 rounded-full bg-red-400 mt-2 shrink-0" />
                                    {w}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-violet-100/60 mt-auto">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <p className="text-center text-xs text-gray-300 font-medium">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}