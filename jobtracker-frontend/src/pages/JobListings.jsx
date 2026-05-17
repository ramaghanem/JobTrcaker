import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs/listings", { params: { search } }).then((res) => {
      setJobs(res.data);
      setLoading(false);
    });
    api.get("/applications").then((res) => {
      setAppliedJobs(res.data.map((a) => a.job_id));
    });
  }, [search]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1">
        <div className="bg-gradient-to-b from-violet-50/80 to-white border-b border-violet-100/50">
          <div className="max-w-5xl mx-auto px-6 pt-12 pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5">
              <div>
                <p className="text-sm font-medium text-violet-500 mb-1.5 tracking-wide uppercase">Explore</p>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Available Jobs</h2>
              </div>
              <div className="relative w-full sm:w-80">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200"
                />
              </div>
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
                <svg className="w-7 h-7 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">No jobs found.</p>
              <p className="text-gray-300 text-sm mt-1">Try adjusting your search terms.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="group bg-white rounded-2xl border border-violet-100/80 shadow-[0_2px_12px_rgb(124_58_237/0.04)] p-6 lg:p-7 hover:shadow-[0_4px_24px_rgb(124_58_237/0.08)] hover:border-violet-200/80 transition-all duration-300"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-[17px] font-bold text-gray-900 tracking-tight group-hover:text-violet-700 transition-colors duration-200">
                          {job.title}
                        </h3>
                        {job.salary && (
                          <span className="text-violet-600 font-bold text-sm whitespace-nowrap bg-violet-50 px-2.5 py-0.5 rounded-lg">
                            ${job.salary}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span className="font-medium text-gray-500">{job.company?.name}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-200" />
                        <span>{job.location}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 pt-5 border-t border-gray-50">
                    {appliedJobs.includes(job.id) ? (
                      <span className="inline-flex items-center gap-2 text-sm text-gray-400 bg-gray-50 border border-gray-100 px-5 py-2 rounded-xl font-medium">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Already Applied
                      </span>
                    ) : (
                      <button
                        onClick={() => navigate(`/jobs/${job.id}/apply`)}
                        className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
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
