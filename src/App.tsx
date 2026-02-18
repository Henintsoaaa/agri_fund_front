import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import RequestResetPasswordPage from "./pages/auth/RequestResetPasswordPage";
import { AuthProvider } from "./features/auth/context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProjectOwnerDashboard from "./pages/project/ProjectOwnerDashboard";
import ProjectStageList from "./pages/project/ProjectStageList";
import CreateProject from "./pages/project/CreateProject";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import InvestorDashboard from "./pages/project/InvestorDashboard";
import ProjectShowcase from "./pages/project/ProjectShowcase";
import AdminLayout from "./components/layout/AdminLayout";
import InvestorLayout from "./components/layout/InvestorLayout";
import ProjectOwnerLayout from "./components/layout/ProjectOwnerLayout";
import { TooltipProvider } from "./components/ui/tooltip";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/forgot-password"
                element={<RequestResetPasswordPage />}
              />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              <Route element={<AdminLayout />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Route>

              <Route element={<ProjectOwnerLayout />}>
                <Route
                  path="/project-owner"
                  element={<ProjectOwnerDashboard />}
                />
                <Route
                  path="/project-stage/:projectId"
                  element={<ProjectStageList />}
                />
                <Route path="/create-project" element={<CreateProject />} />
              </Route>

              <Route element={<InvestorLayout />}>
                <Route path="/investor" element={<InvestorDashboard />} />
                <Route path="/project-show" element={<ProjectShowcase />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
