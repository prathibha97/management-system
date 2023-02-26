import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Loader } from './components';
import {
  Attendance,
  Board,
  Dashboard,
  Layout,
  Login,
  Payroll,
  People,
  Profile,
  Projects,
  Settings,
} from './pages';
import Leave from './pages/Leave';

function App() {
  const { userInfo, loading } = useSelector((state) => state.userLogin);
  if (loading) return <Loader />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
              <Route path="/projects" element={<Projects />} />
              <Route path="/payroll" element={<Payroll />} />
            </>
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
