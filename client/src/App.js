import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Attendance,
  Auth,
  Board,
  Dashboard,
  EmpProfile,
  Layout,
  Leaves,
  Payroll,
  People,
  Profile,
  Projects,
  Register,
  Settings,
} from './pages';
import Leave from './pages/Leave';

function App() {
  const { userInfo } = useSelector((state) => state.userLogin);
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
          {userInfo?.employee.isAdmin && (
            <>
              <Route path="/people" element={<People />} />
              <Route path="/people/:empNo" element={<EmpProfile />} />
              <Route path="/projects" element={<Projects />} />
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
