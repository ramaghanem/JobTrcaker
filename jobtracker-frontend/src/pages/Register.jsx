import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [role, setRole] = useState(null);
  const [searchParams] = useSearchParams();
  const [isGoogleStep, setIsGoogleStep] = useState(false);

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

  // رابط الباك إند للتوجه إلى جوجل
  const handleGoogleRegister = (selectedRole) => {
    // نرسل الـ role المختار إلى لارافل لحفظه مؤقتاً أو لتمريره في الـ callback
    window.location.href = `http://127.0.0.1:8000/api/auth/google?register_role=${selectedRole}`;
  };

  useEffect(() => {
    const token = searchParams.get("token");
    const isNew = searchParams.get("is_new");
    const googleRole = searchParams.get("role");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          role: googleRole,
          name: decodeURIComponent(name),
          email: email,
        })
      );

      if (isNew === "true" && googleRole === "company") {
        setRole("company");
        setIsGoogleStep(true);
        setCompanyForm((prev) => ({ ...prev, name: decodeURIComponent(name) }));
      } else {
        if (googleRole === "company") {
          navigate("/company");
        } else {
          navigate("/dashboard");
        }
      }
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isGoogleStep) {
        await api.post("/become-company", companyForm);
        const me = await api.get("/me");
        const updatedUser = { ...me.data, role: "company" };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/company");
      } else {
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
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  // 1. الشاشة الأولى: اختيار نوع الحساب + إمكانية التسجيل الفوري بجوجل
  if (!role) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {" "}
          {/* قمت بتوسيع العرض قليلاً ليتناسب مع التصميم الجديد */}
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
              Join us today
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-violet-100/80 shadow-[0_4px_24px_rgb(124_58_237/0.06)] p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1 tracking-tight text-center">
              Create Your Account
            </h2>
            <p className="text-gray-400 text-sm mb-7 text-center">
              Select how you want to register on JobTrackr
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* خيار باحث عن عمل */}
              <div className="border-2 border-gray-100 rounded-2xl p-6 text-center bg-gray-50/50 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-7 h-7 text-violet-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-900 text-lg">
                    Job Seeker
                  </p>
                  <p className="text-gray-400 text-xs mt-1.5 mb-6">
                    Find your dream job and apply to top companies
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setRole("jobseeker")}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2.5 rounded-xl transition-all"
                  >
                    Register with Email
                  </button>

                  {/* زر جوجل الخاص بالباحث عن عمل */}
                  <button
                    onClick={() => handleGoogleRegister("jobseeker")}
                    className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.75 2.91C6.01 7.37 8.76 5.04 12 5.04z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.57l3.73 2.89c2.18-2 3.7-5 3.7-8.61z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.14 14.83c-.25-.76-.39-1.57-.39-2.41s.14-1.65.39-2.41L1.39 7.11C.5 8.93 0 10.96 0 13s.5 4.07 1.39 5.89l3.75-2.91z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.1.74-2.51 1.18-4.23 1.18-3.24 0-5.99-2.33-6.86-5.43l-3.75 2.91C3.37 20.33 7.35 23 12 23z"
                      />
                    </svg>
                    Google
                  </button>
                </div>
              </div>

              {/* خيار الشركة */}
              <div className="border-2 border-gray-100 rounded-2xl p-6 text-center bg-gray-50/50 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-7 h-7 text-violet-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-900 text-lg">Company</p>
                  <p className="text-gray-400 text-xs mt-1.5 mb-6">
                    Post open positions and hire the best talent
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setRole("company")}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2.5 rounded-xl transition-all"
                  >
                    Register with Email
                  </button>

                  {/* زر جوجل الخاص بالشركة */}
                  <button
                    onClick={() => handleGoogleRegister("company")}
                    className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.75 2.91C6.01 7.37 8.76 5.04 12 5.04z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.57l3.73 2.89c2.18-2 3.7-5 3.7-8.61z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.14 14.83c-.25-.76-.39-1.57-.39-2.41s.14-1.65.39-2.41L1.39 7.11C.5 8.93 0 10.96 0 13s.5 4.07 1.39 5.89l3.75-2.91z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.1.74-2.51 1.18-4.23 1.18-3.24 0-5.99-2.33-6.86-5.43l-3.75 2.91C3.37 20.33 7.35 23 12 23z"
                      />
                    </svg>
                    Google
                  </button>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm text-center mt-9">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-violet-600 hover:text-violet-700 font-semibold transition-colors"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. الشاشة الثانية: ملء نموذج الإيميل التقليدي أو حقول الشركة بعد جوجل (تبقى كما هي)
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* ... بقية كود النموذج بدون أي تغيير ... */}
        <div className="text-center mb-8">
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
            {isGoogleStep
              ? "Complete your company profile"
              : role === "company"
              ? "Register your company"
              : "Create your account"}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-violet-100/80 shadow-[0_4px_24px_rgb(124_58_237/0.06)] p-8">
          {!isGoogleStep && (
            <div className="flex items-center gap-3 mb-7">
              <button
                onClick={() => setRole(null)}
                className="text-gray-400 hover:text-violet-600 flex items-center gap-1.5 text-sm font-medium"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </button>
              <div className="w-px h-4 bg-gray-200" />
              <span className="text-sm font-medium text-violet-500 bg-violet-50 px-2.5 py-1 rounded-lg">
                {role === "company" ? "Company" : "Job Seeker"}
              </span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-5 py-4 rounded-2xl mb-6 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isGoogleStep && (
              <>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block">
                    Password
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={form.password_confirmation}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password_confirmation: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50"
                    required
                  />
                </div>
              </>
            )}

            {role === "company" && (
              <>
                <div className="pt-5 border-t border-gray-100 mt-2">
                  <p className="text-sm font-bold text-gray-800 mb-5">
                    Company Details
                  </p>
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyForm.name}
                    onChange={(e) =>
                      setCompanyForm({ ...companyForm, name: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block">
                    Description
                  </label>
                  <textarea
                    value={companyForm.description}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block">
                    Address
                  </label>
                  <input
                    type="text"
                    value={companyForm.address}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        address: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 text-sm font-semibold mb-2 block">
                      Website
                    </label>
                    <input
                      type="url"
                      value={companyForm.website}
                      onChange={(e) =>
                        setCompanyForm({
                          ...companyForm,
                          website: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-semibold mb-2 block">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={companyForm.phone}
                      onChange={(e) =>
                        setCompanyForm({
                          ...companyForm,
                          phone: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-all"
            >
              {isGoogleStep
                ? "Save & Continue"
                : role === "company"
                ? "Register Company"
                : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
