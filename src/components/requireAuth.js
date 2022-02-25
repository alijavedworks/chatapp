import { Navigate } from "react-router-dom";
import { auth } from "../firebase-config";

export const requireAuth = ({ children }) => {
  const auth = auth;

  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  return children;
};
