import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Employees Directory', path: '/employees', icon: <Users size={20} /> },
    { name: 'Add Employee', path: '/add-employee', icon: <UserPlus size={20} /> },
  ];

  return (
    <div className="w-64 bg-slate-900 flex flex-col min-h-[calc(100vh-4rem)] text-slate-300 border-r border-slate-800">
      <div className="flex-1 py-8 px-4 flex flex-col gap-2">
        <div className="px-4 mb-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Main Navigation
        </div>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-[0_4px_12px_-2px_rgba(99,102,241,0.4)]'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {link.icon}
                </div>
                <span>{link.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
