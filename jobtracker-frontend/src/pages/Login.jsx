import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // لإلتقاط المتغيرات من الرابط

  useEffect(() => {
    // 1. التقاط التوكن والـ role القادمين من جوجل عبر الباك إند
    const googleToken = searchParams.get("token");
    const userRole = searchParams.get("role");
    const userName = searchParams.get("name"); // السطر الجديد
    const userEmail = searchParams.get("email"); // السطر الجديد
    if (googleToken) {
      // 1. حفظ التوكن
      localStorage.setItem("token", googleToken);

      // 2. حفظ كائن المستخدم كاملاً (الاسم، الإيميل، والـ role) ليقرأ منه الناف بار
      localStorage.setItem(
        "user",
        JSON.stringify({
          role: userRole,
          name: decodeURIComponent(userName), // فك تشفير الاسم المقروء من الرابط
          email: userEmail,
        })
      );

      // 3. التوجيه
      if (userRole === "company") {
        navigate("/company");
      } else {
        navigate("/dashboard");
      }
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role === "company") {
        navigate("/company");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Incorrect email or password");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-violet-600/20 group-hover:shadow-violet-600/30 transition-shadow duration-300 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent tracking-tight">
              JobTrackr
            </span>
          </Link>
          <p className="text-gray-400 mt-3 text-sm font-medium">
            Track your career journey
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-violet-100/80 shadow-[0_4px_24px_rgb(124_58_237/0.06)] p-8 lg:p-10">
          <h2 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">
            Welcome back
          </h2>
          <p className="text-gray-400 text-sm mb-7">
            Enter your credentials to access your account
          </p>

          {error && (
            <div className="bg-red-50/80 border border-red-100 text-red-600 text-sm px-5 py-4 rounded-2xl mb-6 flex items-start gap-3 shadow-sm">
              <svg
                className="w-5 h-5 text-red-400 mt-0.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">
                Email
              </label>
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
              <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-200 text-[15px]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5 text-[15px]"
            >
              Log In
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = "http://127.0.0.1:8000/api/auth/google";
              }}
              className="w-full border border-gray-200 hover:border-gray-300 bg-white text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 mt-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.2 36 26.8 37 24 37c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.5 16.2 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.4 5.4-6.2 6.9l6.2 5.2C39.7 36.2 44 30.7 44 24c0-1.3-.1-2.7-.4-3.5z"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-violet-600 hover:text-violet-700 font-semibold transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
