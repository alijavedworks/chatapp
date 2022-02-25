import { Navigate } from "react-router-dom";
import { auth } from "../firebase-config";

export const WithoutAuth = ({ children }) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};
