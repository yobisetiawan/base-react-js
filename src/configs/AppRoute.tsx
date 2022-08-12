import { Pane } from "evergreen-ui";
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import App from "../App";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LoginPage from "../pages/auth/LoginPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ExamplePage from "../pages/example/ExamplePage";
import { useUser } from "../redux/Selector";

import { RouteName } from "./RouteName";

interface Props {
  children: JSX.Element;
}

const GuestOnlyAuth = ({ children }: Props) => {
  const { user } = useUser();

  if (user?.email) {
    return <Navigate to={RouteName.dashboard} />;
  }

  return children;
};

const RequireAuth = ({ children }: Props) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user?.email) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={RouteName.login} state={{ from: location }} replace />;
  }

  return children;
};

const AppRoute = () => {
  return (
    <Routes>
      <Route path={RouteName.init} element={<App />}>
        <Route
          index
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />

        <Route
          path={RouteName.login}
          element={
            <GuestOnlyAuth>
              <LoginPage />
            </GuestOnlyAuth>
          }
        />

        <Route path={RouteName.forgotPassword} element={<App />}>
          <Route
            index
            element={
              <GuestOnlyAuth>
                <ForgotPasswordPage />
              </GuestOnlyAuth>
            }
          />
          <Route
            path=":email"
            element={
              <GuestOnlyAuth>
                <ResetPasswordPage />
              </GuestOnlyAuth>
            }
          />
        </Route>

        <Route
          path={RouteName.dashboard}
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />

        <Route
          path={RouteName.example}
          element={
            <RequireAuth>
              <ExamplePage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Pane>There is nothing here</Pane>} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
