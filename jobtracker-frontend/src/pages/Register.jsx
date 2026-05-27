import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [companyForm, setCompanyForm] = useState({
    name: "",
    description: "",
    address: "",
    website: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (role === "company") {
        await api.post("/become-company", companyForm);
        const me = await api.get("/me");
        const updatedUser = { ...me.data, role: "company" };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/company");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-violet-600/20 group-hover:shadow-violet-600/30 transition-shadow duration-300 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent tracking-tight">JobTrackr</span>
            </Link>
            <p className="text-gray-400 mt-3 text-sm font-medium">Join us today</p>
          </div>

          <div className="bg-white rounded-2xl border border-violet-100/80 shadow-[0_4px_24px_rgb(124_58_237/0.06)] p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">I am a...</h2>
            <p className="text-gray-400 text-sm mb-7">Choose your account type to get started</p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRole("jobseeker")}
                className="border-2 border-gray-100 hover:border-violet-400 rounded-2xl p-6 text-center transition-all duration-200 group hover:shadow-lg hover:shadow-violet-100 hover:-translate-y-0.5 bg-gray-50/50 hover:bg-violet-50/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-200 transition-colors">
                  <svg className="w-7 h-7 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">Job Seeker</p>
                <p className="text-gray-400 text-xs mt-1.5">Find your dream job</p>
              </button>

              <button
                onClick={() => setRole("company")}
                className="border-2 border-gray-100 hover:border-violet-400 rounded-2xl p-6 text-center transition-all duration-200 group hover:shadow-lg hover:shadow-violet-100 hover:-translate-y-0.5 bg-gray-50/50 hover:bg-violet-50/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-200 transition-colors">
                  <svg className="w-7 h-7 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">Company</p>
                <p className="text-gray-400 text-xs mt-1.5">Post jobs & hire talent</p>
              </button>
            </div>

            <p className="text-gray-400 text-sm text-center mt-7">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-600 hover:text-violet-700 font-semibold transition-colors">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-violet-600/20 group-hover:shadow-violet-600/30 transition-shadow duration-300 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent tracking-tight">JobTrackr</span>
          </Link>
          <p className="text-gray-400 mt-3 text-sm font-medium">
            {role === "company" ? "Register your company" : "Create your account"}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-violet-100/80 shadow-[0_4px_24px_rgb(124_58_237/0.06)] p-8">
          <div className="flex items-center gap-3 mb-7">
            <button
              onClick={() => setRole(null)}
              className="text-gray-400 hover:text-violet-600 transition-colors duration-200 flex items-center gap-1.5 text-sm font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
            <div className="w-px h-4 bg-gray-200" />
            <span className="text-sm font-medium text-violet-500 bg-violet-50 px-2.5 py-1 rounded-lg">
              {role === "company" ? "Company" : "Job Seeker"}
            </span>
          </div>

          {error && (
            <div className="bg-red-50/80 border border-red-100 text-red-600 text-sm px-5 py-4 rounded-2xl mb-6 flex items-start gap-3 shadow-sm">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password_confirmation}
                onChange={(e) =>
                  setForm({ ...form, password_confirmation: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                required
              />
            </div>

            {role === "company" && (
              <>
                <div className="pt-5 border-t border-gray-100 mt-2">
                  <p className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    Company Details
                  </p>
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Google"
                    value={companyForm.name}
                    onChange={(e) =>
                      setCompanyForm({ ...companyForm, name: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">Description</label>
                  <textarea
                    placeholder="Tell us about your company..."
                    value={companyForm.description}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px] resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">Address</label>
                  <input
                    type="text"
                    placeholder="e.g. Gaza, Palestine"
                    value={companyForm.address}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        address: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">Website <span className="text-gray-300 font-normal">(optional)</span></label>
                    <input
                      type="url"
                      placeholder="https://"
                      value={companyForm.website}
                      onChange={(e) =>
                        setCompanyForm({
                          ...companyForm,
                          website: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">Phone <span className="text-gray-300 font-normal">(optional)</span></label>
                    <input
                      type="text"
                      placeholder="059xxxxxxx"
                      value={companyForm.phone}
                      onChange={(e) =>
                        setCompanyForm({
                          ...companyForm,
                          phone: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-2 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5 text-[15px]"
            >
              {role === "company" ? "Register Company" : "Create Account"}
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-600 hover:text-violet-700 font-semibold transition-colors">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
