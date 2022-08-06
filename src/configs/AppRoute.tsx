import { Pane } from "evergreen-ui";
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import App from "../App";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LoginPage from "../pages/auth/LoginPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import { useAuth } from "../utils/AuthHelper";

interface Props {
  children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
  let { user } = useAuth();
  let location = useLocation();

  if (!user?.email) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<LoginPage />} />
        <Route path="auth/login" element={<LoginPage />} />

        <Route path="auth/forgot-password" element={<App />}>
          <Route index element={<ForgotPasswordPage />} />
          <Route path=":email" element={<ResetPasswordPage />} />
        </Route>

        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Pane>There is nothing here</Pane>} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
