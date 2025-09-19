import React from "react";
import styles from "./MenuMobile.module.css";

const MenuMobile = () => {
  const [activeMenu, setActiveMenu] = React.useState(false);

  return (
    <button
      onClick={() => setActiveMenu(!activeMenu)}
      className={
        activeMenu
          ? `${styles.menuMobile} ${styles.menuMobileActive}`
          : styles.menuMobile
      }
    ></button>
  );
};

export default MenuMobile;
