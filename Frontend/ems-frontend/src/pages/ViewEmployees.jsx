import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { getEmployees, deleteEmployee as delEmployee } from '../api/employee';

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getEmployees();
      setEmployees(response.data || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load employee list.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await delEmployee(id);
      setEmployees(employees.filter(emp => emp.id !== id));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete employee.');
      setDeleteId(null);
    }
  };

  return (
    <div className="flex-1 p-8 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Team Directory</h1>
            <p className="text-slate-500 mt-1 font-medium">Manage everything related to your team.</p>
          </div>
          <Link
            to="/add-employee"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-[0_4px_14px_-2px_rgba(99,102,241,0.4)] transition-all hover:shadow-[0_6px_20px_-2px_rgba(99,102,241,0.5)] active:scale-95"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Employee
          </Link>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-700 font-semibold p-4 rounded-xl mb-6 border border-rose-200 shadow-sm">
            {error}
          </div>
        )}

        {/* Table Card Section */}
        <div className="bg-white rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400 font-medium">Loading records...</div>
          ) : employees.length === 0 ? (
            <div className="p-16 text-center text-slate-500 font-medium bg-slate-50/50">
              No employees found in the directory.
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Name</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Designation</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Salary</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map(employee => (
                    <tr key={employee.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-4 px-6">
                        <span className="text-slate-900 font-bold">{employee.name}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/50">
                          {employee.designation}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-bold font-mono">
                        Rs. {Number(employee.salary).toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            to={`/edit-employee/${employee.id}`}
                            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition-colors py-1.5 px-3 rounded-lg text-sm font-semibold shadow-sm"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteId(employee.id)}
                            className="inline-flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white transition-colors py-1.5 px-3 rounded-lg text-sm font-semibold border border-transparent shadow-[0_2px_8px_-2px_rgba(244,63,94,0.4)]"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-sm text-slate-500 font-medium flex justify-between">
                <span>Directory</span>
                <span><strong className="text-slate-700">{employees.length}</strong> total records</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full border border-slate-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <Trash2 size={24} className="text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Record</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                Are you sure you want to delete this employee? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3 w-full">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-lg transition-colors font-bold shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors font-bold shadow-[0_4px_10px_-2px_rgba(244,63,94,0.4)]"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEmployees;
