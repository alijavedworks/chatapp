import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate, Route } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <Route
        {...rest}
        exact
        render={(props) =>
          user ? <Component {...props} /> : navigate("./login")
        }
      ></Route>
    </div>
  );
};

export default PrivateRoute;
