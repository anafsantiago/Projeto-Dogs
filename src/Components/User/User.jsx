import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import { UserContext } from "../../UserContext";

const User = () => {
  const { data } = React.useContext(UserContext);
  const user = data.id; //Id do usuário que será utilizado para puxar apenas as fotos do usuário logado na página de perfil dele.

  return (
    <section className="container">
      <UserHeader />
      <Outlet context={user} />{" "}
      {/*Passa o user como contexto do outlet para os componentes filhos*/}
    </section>
  );
};

export default User;
