import { Navigate } from "react-router-dom";
import { auth } from "../firebase-config";

export const RequireAuth = ({ children }) => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};
