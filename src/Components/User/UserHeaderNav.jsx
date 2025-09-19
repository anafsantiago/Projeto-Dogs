import React from "react";
import { UserContext } from "../../UserContext";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate("/login");
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
        <NavLink to="/conta" end>
          <Feed />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Estatisticas />
          {mobile && "Estatísticas"}
        </NavLink>
        <NavLink to="/conta/postar">
          <Adicionar />
          {mobile && "Adicionar Foto"}
        </NavLink>
        <button className={styles.button}>
          <Sair onClick={handleLogout} />
          {mobile && "Sair"}
        </button>
      </div>
    </nav>
  );
};

export default UserHeaderNav;
