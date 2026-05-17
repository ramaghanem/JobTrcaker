// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import api from "../api/axios";

// export default function CreateJob() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     location: "",
//     salary: "",
//     employment_type: "full-time",
//     status: "open",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await api.post("/jobs", form);
//       navigate("/company");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create job");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-2xl mx-auto px-4 py-10">
//         <h2 className="text-xl font-semibold text-gray-800 mb-6">
//           Post a New Job
//         </h2>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
//             {error}
//           </div>
//         )}

//         <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="text-gray-600 text-sm font-medium mb-1 block">
//                 Job Title
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Frontend Developer"
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-gray-600 text-sm font-medium mb-1 block">
//                 Description
//               </label>
//               <textarea
//                 placeholder="Describe the role..."
//                 value={form.description}
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//                 rows={4}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-gray-600 text-sm font-medium mb-1 block">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g. Remote, Gaza"
//                   value={form.location}
//                   onChange={(e) =>
//                     setForm({ ...form, location: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="text-gray-600 text-sm font-medium mb-1 block">
//                   Salary ($)
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="e.g. 1500"
//                   value={form.salary}
//                   onChange={(e) => setForm({ ...form, salary: e.target.value })}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-gray-600 text-sm font-medium mb-1 block">
//                   Employment Type
//                 </label>
//                 <select
//                   value={form.employment_type}
//                   onChange={(e) =>
//                     setForm({ ...form, employment_type: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 >
//                   <option value="full-time">Full-time</option>
//                   <option value="part-time">Part-time</option>
//                   <option value="internship">Internship</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="text-gray-600 text-sm font-medium mb-1 block">
//                   Status
//                 </label>
//                 <select
//                   value={form.status}
//                   onChange={(e) => setForm({ ...form, status: e.target.value })}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 >
//                   <option value="open">Open</option>
//                   <option value="draft">Draft</option>
//                   <option value="closed">Closed</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 pt-2">
//               <button
//                 type="button"
//                 onClick={() => navigate("/company")}
//                 className="px-5 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-5 py-2.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
//               >
//                 Post Job
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    employment_type: "full-time",
    status: "open",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/jobs", form);
      navigate("/company");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="bg-gradient-to-b from-violet-50/80 to-white border-b border-violet-100/50">
          <div className="max-w-2xl mx-auto px-6 pt-12 pb-10">
            <p className="text-sm font-medium text-violet-500 mb-1.5 tracking-wide uppercase">Company</p>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Post a New Job
            </h2>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-8">
          {error && (
            <div className="bg-red-50/80 border border-red-100 text-red-600 text-sm px-5 py-4 rounded-2xl mb-6 flex items-start gap-3 shadow-sm">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-violet-100/80 shadow-[0_4px_24px_rgb(124_58_237/0.06)] p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">
                  Description
                </label>
                <textarea
                  placeholder="Describe the role..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px] resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Remote, Gaza"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">
                    Salary ($)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 1500"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">
                    Employment Type
                  </label>
                  <select
                    value={form.employment_type}
                    onChange={(e) =>
                      setForm({ ...form, employment_type: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px] appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px] appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="open">Open</option>
                    <option value="draft">Draft</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-8">
                <button
                  type="button"
                  onClick={() => navigate("/company")}
                  className="px-6 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="border-t border-violet-100/60 mt-auto">
        <div className="max-w-2xl mx-auto px-6 py-6">
          <p className="text-center text-xs text-gray-300 font-medium">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
