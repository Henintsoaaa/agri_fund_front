import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import RequestResetPasswordPage from "./pages/auth/RequestResetPasswordPage";
import { AuthProvider } from "./features/auth/context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProjectOwnerPage from "./pages/project/ProjectOwnerPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/forgot-password"
            element={<RequestResetPasswordPage />}
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          <Route path="/project-owner" element={<ProjectOwnerPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
