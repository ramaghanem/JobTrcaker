import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [location, setLocation] = useState("");
  const [cv, setCv] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.get(`/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("cv", cv);
      formData.append("location", location);
      await api.post(`/jobs/${id}/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply");
    }
  };

  if (!job)
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-[2.5px] border-violet-200 border-t-violet-600 rounded-full animate-spin" />
            <p className="text-[#8b7fa8] text-sm tracking-wide">
              Loading position details
            </p>
          </div>
        </div>
        <footer className="border-t border-violet-100 py-6">
          <p className="text-center text-xs text-[#a89ec4] tracking-wide">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </footer>
      </div>
    );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-5 pt-12 pb-16">
          <div className="mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400 mb-3">
              Application
            </p>
            <h1 className="text-[28px] font-semibold text-[#1e1533] tracking-tight leading-tight">
              You're almost there
            </h1>
            <p className="text-sm text-[#8b7fa8] mt-2 leading-relaxed">
              Review the position and submit your details below.
            </p>
          </div>

          <div className="bg-white border border-violet-100 rounded-2xl shadow-[0_1px_3px_rgba(124,58,237,0.04),0_8px_24px_rgba(124,58,237,0.03)] p-7 mb-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-[17px] font-semibold text-[#1e1533] tracking-tight leading-snug">
                  {job.title}
                </h2>
                <p className="text-sm text-[#8b7fa8] mt-1.5">
                  {job.company?.name}
                  <span className="mx-2 text-violet-200">·</span>
                  {job.location}
                </p>
              </div>
            </div>

            <p className="text-[13px] text-[#6b5f87] mt-5 leading-relaxed line-clamp-4">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2.5 mt-6">
              <span className="bg-[#ede9fe] text-[#6d28d9] text-[11px] font-semibold tracking-wide px-3.5 py-[6px] rounded-full">
                {job.employment_type}
              </span>
              <span className="bg-violet-50 text-[#7c5cbf] text-[11px] font-semibold tracking-wide px-3.5 py-[6px] rounded-full">
                ${job.salary}
              </span>
            </div>
          </div>

          <div className="bg-white border border-violet-100 rounded-2xl shadow-[0_1px_3px_rgba(124,58,237,0.04),0_8px_24px_rgba(124,58,237,0.03)] p-7">
            <h3 className="text-[15px] font-semibold text-[#1e1533] tracking-tight mb-6">
              Submit your application
            </h3>

            {success && (
              <div className="bg-violet-50 border border-violet-200 text-[#6d28d9] text-[13px] font-medium px-5 py-3.5 rounded-xl mb-6 flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Applied successfully! Redirecting...
              </div>
            )}

            {error && (
              <div className="bg-red-50/80 border border-red-200/80 text-red-500 text-[13px] font-medium px-5 py-3.5 rounded-xl mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[12px] font-semibold text-[#6b5f87] uppercase tracking-[0.08em] mb-2 block">
                  Your Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gaza, Palestine"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-violet-150 bg-violet-50/30 rounded-xl px-4 py-3 text-[14px] text-[#1e1533] placeholder:text-[#b8aed0] focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#6b5f87] uppercase tracking-[0.08em] mb-2 block">
                  Upload CV
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setCv(e.target.files[0])}
                    className="w-full border border-dashed border-violet-200 bg-[#faf8fe] rounded-xl px-4 py-4 text-[13px] text-[#6b5f87] file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-[12px] file:font-semibold file:tracking-wide file:bg-violet-100 file:text-[#6d28d9] hover:file:bg-violet-200 file:transition-colors file:duration-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition-all duration-200 cursor-pointer"
                    required
                  />
                </div>
                <p className="text-[11px] text-[#a89ec4] mt-1.5">
                  PDF format only
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => navigate("/jobs")}
                  className="px-5 py-2.5 text-[13px] font-medium text-[#6b5f87] border border-violet-150 rounded-xl hover:bg-violet-50 hover:border-violet-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-[13px] font-semibold text-white bg-[#7c3aed] hover:bg-[#6d28d9] rounded-xl shadow-[0_1px_2px_rgba(124,58,237,0.3),0_4px_12px_rgba(124,58,237,0.15)] hover:shadow-[0_2px_4px_rgba(124,58,237,0.3),0_8px_20px_rgba(124,58,237,0.2)] transition-all duration-200 active:scale-[0.98]"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t border-violet-100 py-6">
        <p className="text-center text-xs text-[#a89ec4] tracking-wide">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
}
