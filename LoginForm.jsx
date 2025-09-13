import React from "react";
import { Link, Outlet } from "react-router-dom";

const LoginForm = () => {
  return (
    <div>
      Form
      <Link to="perdeu">Perdeu a Senha?</Link>
      <button>
        <Link to="criar">Cadastro</Link>
      </button>
    </div>
  );
};

export default LoginForm;
