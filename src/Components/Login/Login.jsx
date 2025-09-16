import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) {
    return <Navigate to="/conta"></Navigate>;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Login;
