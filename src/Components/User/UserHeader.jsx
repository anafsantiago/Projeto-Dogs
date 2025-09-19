import React from "react";
import { useLocation } from "react-router-dom";

import styles from "./UserHeader.module.css";
import UserHeaderNav from "./UserHeaderNav";

const UserHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      {pathname === "/conta" && <h1 className="title">Minha Conta</h1>}
      {pathname === "/conta/estatisticas" && (
        <h1 className="title">Estatísticas</h1>
      )}
      {pathname === "/conta/postar" && (
        <h1 className="title">Poste Sua Foto</h1>
      )}
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
