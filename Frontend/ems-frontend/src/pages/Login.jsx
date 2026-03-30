import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await login(credentials);
      // Handle all common Spring Boot JWT response shapes:
      // plain string | { token } | { jwt } | { accessToken }
      const data = response.data;
      const token =
        typeof data === 'string'
          ? data
          : data?.token || data?.jwt || data?.accessToken;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        setError('Login failed: no token received from server.');
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data || 'Invalid credentials. Please check and try again.';
      setError(typeof msg === 'string' ? msg : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-extrabold text-2xl mb-4 shadow-[0_4px_10px_-2px_rgba(99,102,241,0.5)]">
          A
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          Sign in to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-slate-200 rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-rose-50 text-rose-700 p-3 rounded-lg text-sm border border-rose-200 font-bold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
              <input
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)]"
                placeholder="samiksha@hr"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)]"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_-2px_rgba(99,102,241,0.5)] text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-all active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Authenticating...' : 'Sign in safely'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm border-t border-slate-100 pt-6">
            <span className="text-slate-500 font-medium">Don't have an account? </span>
            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
