import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex-1 p-8 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Dashboard Overview</h1>
        
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">
              Employee Management System
            </h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed font-medium">
              Welcome to the administrative portal. Manage your company directory, keep employee records up to date, and navigate through team designations efficiently.
            </p>
            <div className="flex gap-4">
              <Link
                to="/employees"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-[0_4px_14px_-2px_rgba(99,102,241,0.5)] hover:shadow-[0_6px_20px_-2px_rgba(99,102,241,0.5)] transition-all active:scale-95"
              >
                <Users size={20} />
                View Employees
              </Link>
            </div>
          </div>
          
          <div className="w-48 h-48 bg-indigo-50/80 rounded-full flex items-center justify-center flex-shrink-0 border-8 border-white shadow-[0_0_30px_rgba(99,102,241,0.1)]">
             <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
                <Users size={56} className="text-indigo-600" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
