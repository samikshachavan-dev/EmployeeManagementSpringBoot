import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../api/auth';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await registerApi(formData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        'Registration failed. Please try again.';
      setError(typeof msg === 'string' ? msg : 'Registration failed. Please try again.');
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
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          Join the team portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-slate-200 rounded-2xl sm:px-10">
          {success ? (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl text-center border border-emerald-200 shadow-sm">
              <h3 className="font-extrabold text-lg mb-2">Registration Complete</h3>
              <p className="text-sm font-semibold text-emerald-700">Redirecting to login safely...</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleRegister}>
              {error && (
                <div className="bg-rose-50 text-rose-700 p-3 rounded-lg text-sm border border-rose-200 font-bold">
                  {error}
                </div>
              )}

              {/* Username */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                <input
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)]"
                  placeholder="samikshachavan"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)]"
                  placeholder="samikshachavan@company.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
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
                  {loading ? 'Processing...' : 'Register'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center text-sm border-t border-slate-100 pt-6">
            <span className="text-slate-500 font-medium">Already have an account? </span>
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Log in securely
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
