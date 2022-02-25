import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate, Route, Navigate } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        user ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
