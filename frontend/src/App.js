import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CreatePoll from "./components/AdminDashboard/CreatePoll";
import ManagePolls from "./components/AdminDashboard/ManagePoll";
import ActivePolls from "./components/UserDashboard/ActivePolls"; // Import ActivePolls component
import Vote from "./components/UserDashboard/Vote";

// Poll Management Components
import PollList from "./components/Polls/PollList";
import PollItem from "./components/Polls/PollItem";
import PollResults from "./components/Polls/PollResult";

// Context
import { AuthProvider } from "./context/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Assume user is stored in localStorage

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route
            path="/admin/create-poll"
            element={
              <ProtectedRoute role="Admin">
                <CreatePoll />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-polls"
            element={
              <ProtectedRoute role="Admin">
                <ManagePolls />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/user/active-polls"
            element={
              <ProtectedRoute>
                <ActivePolls />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/vote/:pollId"
            element={
              <ProtectedRoute role="User">
                <Vote />
              </ProtectedRoute>
            }
          />

          {/* Poll Management Routes */}
          <Route
            path="/polls"
            element={
              <ProtectedRoute role="User">
                <PollList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/poll/:id"
            element={
              <ProtectedRoute role="User">
                <PollItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results/:id"
            element={
              <ProtectedRoute role="User">
                <PollResults />
              </ProtectedRoute>
            }
          />

          {/* Default Route (Redirect to login if no route matches) */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
