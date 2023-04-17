import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
  Attendance,
  Auth,
  Board,
  Dashboard,
  EmpProfile,
  Layout,
  Leaves,
  PasswordReset,
  Payroll,
  People,
  Profile,
  Project,
  Projects,
  Register,
  Settings,
} from './pages';
import Leave from './pages/Leave';
import { CreateProject } from './components';

function App() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  // if (loading) return <Loader />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/board" element={<Board />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          {user?.isAdmin && (
            <>
              <Route path="/people" element={<People />} />
              <Route path="/people/:empNo" element={<EmpProfile />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/create" element={<CreateProject />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/register" element={<Register />} />
            </>
         )}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
