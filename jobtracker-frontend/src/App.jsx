import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobseekerDashboard from "./pages/JobseekerDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import JobListings from "./pages/JobListings";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import ApplyJob from "./pages/ApplyJob";
import Notifications from "./pages/Notifications";
import JobApplications from "./pages/JobApplications";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/jobs/create"
          element={
            <PrivateRoute>
              <CreateJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <JobseekerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/company"
          element={
            <PrivateRoute>
              <CompanyDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <JobListings />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs/:id/edit"
          element={
            <PrivateRoute>
              <EditJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs/:id/apply"
          element={
            <PrivateRoute>
              <ApplyJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs/:id/applications"
          element={
            <PrivateRoute>
              <JobApplications />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
