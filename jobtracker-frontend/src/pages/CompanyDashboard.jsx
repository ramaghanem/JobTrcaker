import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    api.get("/jobs").then((res) => {
      setJobs(res.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async () => {
    await api.delete(`/jobs/${deleteId}`);
    setJobs(jobs.filter((j) => j.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {deleteId && (
        <div className="fixed inset-0 bg-violet-950/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgb(124_58_237/0.15)] p-8 max-w-sm w-full mx-4 text-center border border-violet-100">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
              Delete Job
            </h3>
            <p className="text-gray-400 text-sm mb-7 leading-relaxed">
              Are you sure you want to delete this job? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteId(null)}
                className="px-6 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 font-medium shadow-lg shadow-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1">
        <div className="bg-gradient-to-b from-violet-50/80 to-white border-b border-violet-100/50">
          <div className="max-w-5xl mx-auto px-6 pt-12 pb-10">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-medium text-violet-500 mb-1.5 tracking-wide uppercase">Company</p>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  My Job Listings
                </h2>
              </div>
              <Link
                to="/jobs/create"
                className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-5 py-2.5 rounded-xl transition-all duration-200 font-medium shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5"
              >
                + Post a Job
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
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
          ) : jobs.length === 0 ? (
            <div className="bg-white border border-violet-100 rounded-2xl p-16 text-center shadow-[0_1px_3px_rgb(124_58_237/0.04)]">
              <div className="w-16 h-16 rounded-2xl bg-lavender flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">No jobs posted yet.</p>
              <p className="text-gray-300 text-sm mt-1">Create your first listing to start receiving applications.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-violet-100/80 shadow-[0_4px_24px_rgb(124_58_237/0.06)] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-violet-50">
                    <th className="px-6 py-4 text-[11px] font-semibold text-violet-400 uppercase tracking-widest">Title</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-violet-400 uppercase tracking-widest">Location</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-violet-400 uppercase tracking-widest">Salary</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-violet-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-violet-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-50">
                  {jobs.map((job) => (
                    <tr key={job.id} className="group hover:bg-violet-50/40 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900 text-[15px]">{job.title}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{job.location}</td>
                      <td className="px-6 py-4">
                        <span className="text-violet-600 font-medium text-sm">
                          {job.salary ? `$${job.salary}` : "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                            job.status === "open"
                              ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100"
                              : job.status === "closed"
                              ? "bg-red-50 text-red-500 ring-1 ring-red-100"
                              : "bg-gray-50 text-gray-400 ring-1 ring-gray-100"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            job.status === "open"
                              ? "bg-emerald-400"
                              : job.status === "closed"
                              ? "bg-red-400"
                              : "bg-gray-300"
                          }`} />
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/jobs/${job.id}/applications`}
                            className="text-xs font-medium text-violet-500 hover:text-violet-700 px-2.5 py-1.5 rounded-lg hover:bg-violet-50 transition-all duration-200"
                          >
                            Applications
                          </Link>
                          <Link
                            to={`/jobs/${job.id}/edit`}
                            className="text-xs font-medium text-violet-500 hover:text-violet-700 px-2.5 py-1.5 rounded-lg hover:bg-violet-50 transition-all duration-200"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteId(job.id)}
                            className="text-xs font-medium text-red-400 hover:text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-200"
                          >
                            Delete
                          </button>
                        </div>
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
