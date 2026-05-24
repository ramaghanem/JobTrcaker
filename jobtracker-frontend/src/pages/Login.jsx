import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const res = await api.post('/login', form)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            if (res.data.user.role === 'company') {
                navigate('/company')
            } else {
                navigate('/dashboard')
            }
        } catch (err) {
            setError('Incorrect email or password')
        }
    }

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
                    <p className="text-gray-400 mt-3 text-sm font-medium">Track your career journey</p>
                </div>

                <div className="bg-white rounded-2xl border border-violet-100/80 shadow-[0_4px_24px_rgb(124_58_237/0.06)] p-8 lg:p-10">
                    <h2 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">Welcome back</h2>
                    <p className="text-gray-400 text-sm mb-7">Enter your credentials to access your account</p>

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
                            <label className="text-gray-700 text-sm font-semibold mb-2 block tracking-tight">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
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
                                onChange={e => setForm({ ...form, password: e.target.value })}
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
                    </form>

                    <p className="text-gray-400 text-sm text-center mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-violet-600 hover:text-violet-700 font-semibold transition-colors">Register</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}
