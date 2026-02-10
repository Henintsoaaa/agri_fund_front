import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import RequestResetPasswordPage from "./pages/auth/RequestResetPasswordPage";
import {
  AuthProvider,
  useAuthContext,
} from "./features/auth/context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProjectOwnerDashboard from "./pages/project/ProjectOwnerDashboarad";
import ProjectStageList from "./pages/project/ProjectStageList";
import CreateProject from "./pages/project/CreateProject";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function AppContent() {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto mb-4"></div>
          <p className="text-sage">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<RequestResetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route
          path="/project-owner-dashboard"
          element={<ProjectOwnerDashboard />}
        />
        <Route path="/project-owner" element={<ProjectOwnerDashboard />} />
        <Route
          path="/project-stage/:projectId"
          element={<ProjectStageList />}
        />
        <Route path="/create-project" element={<CreateProject />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
