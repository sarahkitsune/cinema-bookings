import { Navigate } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { getAuthToken, getCurrentUser } from "../services/authSession";

export default function ProtectedRoute({ children }: PropsWithChildren<object>) {
  const token = getAuthToken();
  const user = getCurrentUser();
  const isAdmin = user?.role === "ADMIN";

  if (!isAdmin || !token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}