import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getEmployeeById, updateEmployee } from '../api/employee';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    designation: '',
    salary: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(id);
        const { name, designation, salary } = response.data;
        setEmployee({ name: name || '', designation: designation || '', salary: salary ?? '' });
      } catch (err) {
        console.error(err);
        setError('Failed to fetch employee record.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = { ...employee, salary: parseFloat(employee.salary) };

    try {
      await updateEmployee(id, payload);
      navigate('/employees');
    } catch (err) {
      console.error(err);
      setError('Failed to update employee details.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 min-h-[calc(100vh-4rem)] flex justify-center items-center bg-slate-50">
        <p className="text-slate-500 font-bold hover:animate-pulse">Loading form context...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-slate-50 min-h-[calc(100vh-4rem)] flex justify-center items-start">
      <div className="max-w-2xl w-full">

        {/* Header Section */}
        <div className="flex flex-col gap-2 mb-8">
          <Link
            to="/employees"
            className="text-slate-400 hover:text-indigo-600 font-bold text-sm flex items-center gap-1.5 transition-colors w-fit"
          >
            <ArrowLeft size={16} /> Cancel Modification
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Update Employee</h1>
              <p className="text-slate-500 font-medium mt-1">Modify existing directory record.</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-700 font-bold p-4 rounded-xl mb-6 border border-rose-200 shadow-sm">
            {error}
          </div>
        )}

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-slate-200 p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={employee.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-semibold text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Designation</label>
                <input
                  type="text"
                  name="designation"
                  required
                  value={employee.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-semibold text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Base Salary (Rs.)</label>
                <input
                  type="number"
                  name="salary"
                  min="0"
                  step="0.01"
                  required
                  value={employee.salary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-semibold text-slate-900 font-mono shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)]"
                />
              </div>
            </div>

            <div className="pt-8 flex justify-end gap-3 w-full">
              <Link
                to="/employees"
                className="py-3 px-6 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-800 rounded-lg font-bold transition-colors shadow-sm"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className={`py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-[0_4px_14px_-2px_rgba(99,102,241,0.5)] active:scale-95 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {saving ? 'Updating...' : 'Commit Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
