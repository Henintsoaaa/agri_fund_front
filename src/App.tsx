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
import ProtectedRoute from "./components/layout/ProtectedRoute";
import DynamicLayoutWrapper from "./components/layout/DynamicLayoutWrapper";
import MyInvestmentsPage from "./pages/investment/MyInvestmentsPage";
import ProjectInvestmentPage from "./pages/investment/ProjectInvestmentPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import FavoritesPage from "./pages/investor/FavoritesPage";
import HistoryPage from "./pages/investor/HistoryPage";
import StatsPage from "./pages/investor/StatsPage";
import ProofsPage from "./pages/project-owner/ProofsPage";
import MyProjectsPage from "./pages/project-owner/MyProjectsPage";
import AdminStatsPage from "./pages/admin/AdminStatsPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

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

              {/* Shared route with dynamic layout - accessible by all authenticated roles */}
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["ADMIN", "PROJECT_OWNER", "INVESTOR"]}
                  />
                }
              >
                <Route element={<DynamicLayoutWrapper />}>
                  <Route
                    path="/project-stage/:projectId"
                    element={<ProjectStageList />}
                  />
                  <Route
                    path="/notifications"
                    element={<NotificationsPage />}
                  />
                </Route>
              </Route>

              {/* Admin routes - protected */}
              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route
                    path="/admin/projects/:projectId"
                    element={<ProjectStageList />}
                  />
                  <Route path="/admin/stats" element={<AdminStatsPage />} />
                  <Route path="/admin/reports" element={<AdminReportsPage />} />
                  <Route
                    path="/admin/settings"
                    element={<AdminSettingsPage />}
                  />
                </Route>
              </Route>

              {/* Project Owner routes - protected */}
              <Route
                element={<ProtectedRoute allowedRoles={["PROJECT_OWNER"]} />}
              >
                <Route element={<ProjectOwnerLayout />}>
                  <Route
                    path="/project-owner"
                    element={<ProjectOwnerDashboard />}
                  />
                  <Route
                    path="/project-owner/projects"
                    element={<MyProjectsPage />}
                  />
                  <Route
                    path="/project-owner/create-project"
                    element={<CreateProject />}
                  />
                  <Route
                    path="/project-owner/proofs"
                    element={<ProofsPage />}
                  />
                </Route>
              </Route>

              {/* Investor routes - protected */}
              <Route element={<ProtectedRoute allowedRoles={["INVESTOR"]} />}>
                <Route element={<InvestorLayout />}>
                  <Route path="/investor" element={<InvestorDashboard />} />
                  <Route path="/project-show" element={<ProjectShowcase />} />
                  <Route
                    path="/investor/investments"
                    element={<MyInvestmentsPage />}
                  />
                  <Route
                    path="/investor/favorites"
                    element={<FavoritesPage />}
                  />
                  <Route path="/investor/history" element={<HistoryPage />} />
                  <Route path="/investor/stats" element={<StatsPage />} />
                  <Route
                    path="/projects/:projectId/invest"
                    element={<ProjectInvestmentPage />}
                  />
                </Route>
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
