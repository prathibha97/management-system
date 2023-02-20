import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Attendance,
  Board,
  Dashboard,
  Layout,
  Login,
  Profile,
  Settings,
} from './pages';
import Leave from './pages/Leave';

function App() {
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
