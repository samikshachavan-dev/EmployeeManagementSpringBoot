import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AddEmployee from '../pages/AddEmployee';
import ViewEmployees from '../pages/ViewEmployees';
import EditEmployee from '../pages/EditEmployee';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/employees" element={
        <ProtectedRoute>
          <Layout>
            <ViewEmployees />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/add-employee" element={
        <ProtectedRoute>
          <Layout>
            <AddEmployee />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/edit-employee/:id" element={
        <ProtectedRoute>
          <Layout>
            <EditEmployee />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
