import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { selectCurrentUser } from './app/features/auth/authSelectors';
import { CreateProject, RequireAuth } from './components';
import {
  AdminTimeSheet,
  Attendance,
  Auth,
  Board,
  Client,
  ClientEdit,
  ClientRegister,
  Clients,
  Dashboard,
  EditEmployee,
  EmpProfile,
  Layout,
  Leaves,
  Meetings,
  PasswordReset,
  Payroll,
  People,
  Profile,
  Project,
  Projects,
  Register,
  Settings,
  TimeSheet,
} from './pages';
import Leave from './pages/Leave';

function App() {
  const userInfo = useSelector(selectCurrentUser);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timesheet" element={<TimeSheet />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/board" element={<Board />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            {userInfo?.role === 'Admin' && (
              <>
                <Route path="/people" element={<People />} />
                <Route path="/people/:empNo" element={<EmpProfile />} />
                <Route path="/people/:empNo/edit" element={<EditEmployee />} />
                <Route path="/people/register" element={<Register />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/create" element={<CreateProject />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/leaves" element={<Leaves />} />
                <Route path="/admin/timesheet" element={<AdminTimeSheet />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/:id" element={<Client />} />
                <Route path="/clients/:id/edit" element={<ClientEdit />} />
                <Route path="/clients/register" element={<ClientRegister />} />
              </>
            )}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
