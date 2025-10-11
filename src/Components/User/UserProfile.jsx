import React from "react";
import { useParams } from "react-router-dom";
import Feed from "../Feed/Feed";
import Head from "../Helper/Head";

//Componente que mostra o perfil de um usuário quando o nome dele é clicado em uma foto na Home.
const UserProfile = () => {
  const { user } = useParams();
  return (
    <section className="container ">
      <Head title={user} description={`Perfil do usuário ${user}`} />
      <h1 className="title">{user}</h1>
      <Feed userProfile={user} />
    </section>
  );
};

export default UserProfile;
