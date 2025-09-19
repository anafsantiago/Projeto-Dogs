import React from "react";
import { UserContext } from "../../UserContext";
import { NavLink } from "react-router-dom";
import styles from "./UserHeaderNav.module.css";
import Feed from "../../Assets/feed.svg?react";
import Estatisticas from "../../Assets/estatisticas.svg?react";
import Adicionar from "../../Assets/adicionar.svg?react";
import Sair from "../../Assets/sair.svg?react";
import MenuMobile from "../MenuMobile";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const [mobile, setMobile] = React.useState(null);
  const [width, setWidth] = React.useState(window.innerWidth);

  function navLinkClass(isActive) {
    return isActive ? `${styles.link} ${styles.active}` : styles.link;
  }

  React.useEffect(() => {
    function resizeWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", resizeWidth);
    if (width <= 800) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    return () => {
      window.removeEventListener("resize", resizeWidth);
    };
  }, [width]);

  return (
    <nav className={styles.nav}>
      {mobile && <MenuMobile />}
      <div className={styles.menu}>
        <NavLink
          className={({ isActive }) => navLinkClass(isActive)}
          to="/conta"
          end
        >
          <Feed className={styles.icon} />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink
          className={({ isActive }) => navLinkClass(isActive)}
          to="/conta/estatisticas"
          end
        >
          <Estatisticas className={styles.icon} />
          {mobile && "Estatísticas"}
        </NavLink>
        <NavLink
          className={({ isActive }) => navLinkClass(isActive)}
          to="/conta/postar"
          end
        >
          <Adicionar className={styles.icon} />
          {mobile && "Adicionar Foto"}
        </NavLink>
        <button className={styles.link}>
          <Sair className={styles.icon} onClick={userLogout} />
          {mobile && "Sair"}
        </button>
      </div>
    </nav>
  );
};

export default UserHeaderNav;
