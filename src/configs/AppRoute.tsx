import { Routes, Route } from "react-router-dom";
import App from "../App";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LoginPage from "../pages/auth/LoginPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<LoginPage />} />

        <Route path="forgot-password" element={<App />}>
          <Route index element={<ForgotPasswordPage />} />
          <Route path=":email" element={<ResetPasswordPage />} />
        </Route>

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoute;
