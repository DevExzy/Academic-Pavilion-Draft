import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Results from "./pages/Results";
import Admissions from "./pages/Admissions";
import NYSC from "./pages/NYSC";
import Upload from "./pages/Upload";
import ActivityLog from "./pages/ActivityLog";
import AccountSettings from "./pages/AccountSettings";
import ManageRoles from "./pages/ManageRoles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/students"
            element={
              <DashboardLayout>
                <Students />
              </DashboardLayout>
            }
          />
          <Route
            path="/results"
            element={
              <DashboardLayout>
                <Results />
              </DashboardLayout>
            }
          />
          <Route
            path="/admissions"
            element={
              <DashboardLayout>
                <Admissions />
              </DashboardLayout>
            }
          />
          <Route
            path="/nysc"
            element={
              <DashboardLayout>
                <NYSC />
              </DashboardLayout>
            }
          />
          <Route
            path="/upload"
            element={
              <DashboardLayout>
                <Upload />
              </DashboardLayout>
            }
          />
          <Route
            path="/activity-log"
            element={
              <DashboardLayout>
                <ActivityLog />
              </DashboardLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DashboardLayout>
                <AccountSettings />
              </DashboardLayout>
            }
          />
          <Route
            path="/roles"
            element={
              <DashboardLayout>
                <ManageRoles />
              </DashboardLayout>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
