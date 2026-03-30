import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-30 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 text-white w-9 h-9 rounded-xl flex items-center justify-center font-bold shadow-[0_4px_10px_-2px_rgba(99,102,241,0.5)]">
          EMS
        </div>
        <span className="text-slate-900 text-xl font-extrabold tracking-tight">Portal</span>
      </div>

      <div className="flex items-center gap-6">
        {token ? (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hidden sm:flex">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                <UserIcon size={16} className="text-slate-500" />
              </div>
              <span className="text-sm font-semibold text-slate-700">Administrator</span>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors py-1.5 px-3 rounded-lg hover:bg-red-50"
              title="Log out"
            >
              <span className="text-sm font-semibold">Log out</span>
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 py-2 px-3 transition-colors">
              Sign in
            </Link>
            <Link to="/register" className="text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition py-2 px-5 rounded-lg shadow-[0_4px_10px_-2px_rgba(99,102,241,0.4)] hover:shadow-md">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
